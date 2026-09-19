import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PalmAnalysisService } from './services/ai/PalmAnalysisService.js';
import { ReadingGenerationService } from './services/ai/ReadingGenerationService.js';
import { MultilingualReadingService } from './services/ai/MultilingualReadingService.js';
import { PaymentService } from './services/payment/PaymentService.js';
import { HandType, StructuredPalmAnalysis, FullPalmReading } from './types/contracts.js';
import { getAllLanguages } from './types/LanguageRegistry.js';
import knowledgeRoutes from './routes/knowledgeRoutes.js';

const app = express();
const PORT = process.env.PORT || 4100;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Knowledge Engine Subsystem
app.use('/api/v1/knowledge', knowledgeRoutes);

// In-memory data store for fast decoupled access (maps cleanly to DB models)
const scansStore = new Map<string, {
  scanId: string;
  sessionId: string;
  hand: HandType;
  qualityScore: number;
  imageBuffer?: Buffer;
  analysis?: StructuredPalmAnalysis;
  paymentStatus: 'pending' | 'paid';
  reading?: FullPalmReading;
  readingsByLanguage: Map<string, FullPalmReading>;
  createdAt: Date;
}>();

const analyticsStore: Array<{ sessionId: string; eventName: string; metadata?: any; timestamp: Date }> = [];

// Multer configuration: max 5MB, images only
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are permitted'));
    }
  },
});

// 1. Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'kai-regai-api', time: new Date().toISOString() });
});

// 2. Session creation / resume
app.post('/api/v1/sessions', (req: Request, res: Response) => {
  const sessionId = req.body.sessionId || `sess_${uuidv4()}`;
  res.json({ sessionId, status: 'active' });
});

// 3. Scan Upload & CV Analysis
app.post('/api/v1/scans/upload', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hand = (req.body.hand as HandType) || 'right';
    const detectedHand = (req.body.detectedHand as HandType) || hand;
    const handMismatch = detectedHand !== hand;
    const sessionId = req.body.sessionId || `sess_${uuidv4()}`;
    const qualityScore = parseFloat(req.body.qualityScore || '0.85');
    const scanId = `scan_${uuidv4().substring(0, 8)}`;

    const analysis = await PalmAnalysisService.analyzePalmImage(
      scanId,
      detectedHand || hand,
      qualityScore,
      req.file?.buffer
    );
    analysis.hand = hand;
    analysis.detectedHand = detectedHand;
    analysis.handMismatch = handMismatch;
    if (handMismatch) {
      analysis.handMismatchNotice = `Notice: You selected ${hand === 'right' ? 'Right' : 'Left'} Palm, but our vision sensor detected your ${detectedHand === 'right' ? 'Right' : 'Left'} Palm. Lines and mounts have been calibrated to your scanned hand for accuracy.`;
    }

    scansStore.set(scanId, {
      scanId,
      sessionId,
      hand,
      qualityScore,
      imageBuffer: req.file?.buffer,
      analysis,
      paymentStatus: 'pending',
      readingsByLanguage: new Map<string, FullPalmReading>(),
      createdAt: new Date(),
    });

    res.status(201).json({ scanId, analysis });
  } catch (err) {
    next(err);
  }
});

// 4. Retrieve Scan Analysis
app.get('/api/v1/scans/:id/analysis', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const record = scansStore.get(id);
  if (!record || !record.analysis) {
    res.status(404).json({ error: 'Scan not found or analysis pending' });
    return;
  }
  res.json(record.analysis);
});

// 5. Create Payment Order
app.post('/api/v1/payments/create-order', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { scanId, sessionId, amount } = req.body;
    const order = await PaymentService.createOrder(scanId, sessionId, amount || 1000);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// 6. Verify Payment Server-Side
app.post('/api/v1/payments/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { scanId, orderId, paymentId, signature } = req.body;
    const verification = PaymentService.verifySignature({ scanId, orderId, paymentId, signature });

    if (verification.success) {
      const record = scansStore.get(scanId);
      if (record) {
        record.paymentStatus = 'paid';
        if (record.analysis && !record.readingsByLanguage.has('en')) {
          const defaultReading = await MultilingualReadingService.generateReading(scanId, record.analysis, 'en');
          record.reading = defaultReading;
          record.readingsByLanguage.set('en', defaultReading);
        }
      }
    }

    res.json(verification);
  } catch (err) {
    next(err);
  }
});

// 7. Retrieve Full Reading (Guarded: Payment Required, Supports ?language=...)
app.get('/api/v1/readings/:scanId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scanId = Array.isArray(req.params.scanId) ? req.params.scanId[0] : req.params.scanId;
    const record = scansStore.get(scanId);
    if (!record) {
      res.status(404).json({ error: 'Scan record not found' });
      return;
    }

    if (record.paymentStatus !== 'paid') {
      res.status(402).json({ error: 'Payment required to view complete reading', scanId });
      return;
    }

    const requestedLang = (req.query.language as string) || 'en';

    // Return cached reading for this language if already generated (zero re-computation!)
    let reading = record.readingsByLanguage.get(requestedLang);
    if (!reading && record.analysis) {
      reading = await MultilingualReadingService.generateReading(record.scanId, record.analysis, requestedLang);
      record.readingsByLanguage.set(requestedLang, reading);
    }

    res.json(reading || record.reading);
  } catch (err) {
    next(err);
  }
});

// 8. Supported Languages Registry
app.get('/api/v1/languages', (_req: Request, res: Response) => {
  res.json({ languages: getAllLanguages() });
});

// 9. User requests immediate deletion of palm image
app.delete('/api/v1/scans/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const record = scansStore.get(id);
  if (record) {
    record.imageBuffer = undefined; // purge biometric buffer immediately
  }
  res.json({ success: true, message: 'Palm image successfully purged' });
});

// 10. Analytics Funnel Events
app.post('/api/v1/analytics/event', (req: Request, res: Response) => {
  const { sessionId, eventName, metadata } = req.body;
  analyticsStore.push({
    sessionId: sessionId || 'unknown',
    eventName,
    metadata,
    timestamp: new Date(),
  });
  res.status(204).send();
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`✨ Kai RegAI REST API active on http://localhost:${PORT}`);
});

export default app;
