import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  HandType,
  ImageQualityResult,
  StructuredPalmAnalysis,
  FullPalmReading,
} from './types/contracts';
import { useLanguage } from './context/LanguageContext';

// UI & Layout
import { Header } from './components/ui/Header';
import { LoadingScan } from './components/ui/LoadingScan';
import { BottomNav, type NavTab } from './components/ui/BottomNav';
import { DisclaimerModal } from './components/modals/DisclaimerModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { ShareCardModal } from './components/reading/ShareCardModal';
import { LanguageSelectModal } from './components/modals/LanguageSelectModal';
import { FirstAccessModal } from './components/modals/FirstAccessModal';
import { LanguageSuggestionBanner } from './components/ui/LanguageSuggestionBanner';

// Flow Screens
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { HandSelection } from './components/camera/HandSelection';
import { PalmCamera } from './components/camera/PalmCamera';
import { ImagePreview } from './components/camera/ImagePreview';
import { FreePreviewScreen } from './components/analysis/FreePreviewScreen';
import { PaymentStep } from './components/payment/PaymentStep';
import { ReadingResultView } from './components/reading/ReadingResultView';
import { AskKaiDrawer } from './components/reading/AskKaiDrawer';
import { ProfileView } from './components/profile/ProfileView';
import { AdminKnowledgeDashboard } from './components/admin/AdminKnowledgeDashboard';

// API & Services
import {
  uploadPalmScan,
  createPaymentOrder,
  verifyPayment,
  fetchFullReading,
  logAnalyticsEvent,
} from './services/api';

type AppStep =
  | 'landing'
  | 'onboarding'
  | 'hand_select'
  | 'camera'
  | 'preview'
  | 'analyzing'
  | 'free_preview'
  | 'payment'
  | 'generating'
  | 'results';

export function App() {
  const { currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [selectedHand, setSelectedHand] = useState<HandType>('right');
  const [capturedImageDataUrl, setCapturedImageDataUrl] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<StructuredPalmAnalysis | null>(null);
  const [reading, setReading] = useState<FullPalmReading | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // User Profile Name State
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('kai_user_name') || '');
  const [isFirstAccessOpen, setIsFirstAccessOpen] = useState<boolean>(false);
  const [shareTargetReading, setShareTargetReading] = useState<FullPalmReading | null>(null);
  const [shareTargetName, setShareTargetName] = useState<string>('');
  const [shareTargetThumbnailUrl, setShareTargetThumbnailUrl] = useState<string>('');

  // Modals & Drawers
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAskKaiOpen, setIsAskKaiOpen] = useState(false);
  const [askKaiInitialQuestion, setAskKaiInitialQuestion] = useState<string | undefined>(undefined);
  const [activeReadingInspectCrease, setActiveReadingInspectCrease] = useState<'heart' | 'head' | 'life' | 'fate' | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(() => window.location.search.includes('admin=true'));

  // Reactive Language Reload: when language changes, re-fetch reading in that language
  useEffect(() => {
    if (scanId && reading) {
      fetchFullReading(scanId, selectedHand, currentLanguage.id)
        .then((localizedReading) => {
          setReading(localizedReading);
        })
        .catch((err) => {
          console.warn('Failed to refresh reading in new language:', err);
        });
    }
  }, [currentLanguage.id, scanId]);

  // Navigation handlers
  const handleStartScan = (hand?: HandType, name?: string) => {
    logAnalyticsEvent('scan_started');
    if (hand) setSelectedHand(hand);
    if (name) setUserName(name);
    setCurrentStep('camera');
    setActiveNavTab('home');
  };

  const handleOnboardingComplete = (_selectedInterests: string[]) => {
    setCurrentStep('hand_select');
  };

  const handleConfirmHand = () => {
    setCurrentStep('camera');
  };

  const handleCapturePhoto = (dataUrl: string) => {
    logAnalyticsEvent('photo_captured', { hand: selectedHand });
    setCapturedImageDataUrl(dataUrl);
    setCurrentStep('preview');
  };

  const handleProceedWithValidImage = async (
    blob: Blob,
    dataUrl: string,
    quality: ImageQualityResult
  ) => {
    logAnalyticsEvent('photo_validated', { qualityScore: quality.sharpnessScore });
    setCapturedImageDataUrl(dataUrl);
    setCurrentStep('analyzing');

    try {
      const result = await uploadPalmScan(blob, selectedHand, quality);
      setScanId(result.scanId);
      setAnalysis(result.analysis);
      logAnalyticsEvent('analysis_completed', { scanId: result.scanId });
    } catch (err) {
      console.error('Analysis error:', err);
    }
  };

  const handleScanAnimationComplete = () => {
    setCurrentStep('free_preview');
  };

  const handleUnlockPayment = async (method: string) => {
    logAnalyticsEvent('payment_initiated', { method, scanId });
    setIsPaymentProcessing(true);

    try {
      const order = await createPaymentOrder(scanId || 'scan_test');

      setTimeout(async () => {
        await verifyPayment(
          order.scanId,
          order.orderId,
          'pay_simulated_' + Date.now(),
          'sig_valid_hash'
        );
        logAnalyticsEvent('payment_success', { orderId: order.orderId });
        setIsPaymentProcessing(false);
        setCurrentStep('generating');

        // Fetch full AI reading in preferred language
        const fullReading = await fetchFullReading(order.scanId, selectedHand, currentLanguage.id);
        setReading(fullReading);
        logAnalyticsEvent('reading_generated', { readingId: fullReading.readingId });

        // Confetti celebration
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#DDD6FE', '#38BDF8', '#10B981'],
        });

        setCurrentStep('results');
        setActiveNavTab('reading');
      }, 1600);
    } catch (err) {
      console.error('Payment error:', err);
      setIsPaymentProcessing(false);
    }
  };

  const handleResetFlow = () => {
    setCurrentStep('landing');
    setActiveNavTab('home');
    setCapturedImageDataUrl(null);
    setScanId(null);
    setAnalysis(null);
    setReading(null);
  };

  const handlePurgePhoto = () => {
    setCapturedImageDataUrl(null);
  };

  // Bottom Nav Selection Controller
  const handleSelectNavTab = (tab: NavTab) => {
    setActiveNavTab(tab);
    if (tab === 'home') {
      if (currentStep === 'results') {
        // keep results accessible under reading tab
        setCurrentStep('landing');
      } else {
        setCurrentStep('landing');
      }
    } else if (tab === 'reading') {
      if (reading) {
        setCurrentStep('results');
      } else {
        // No reading yet, prompt scan
        setCurrentStep('landing');
      }
    } else if (tab === 'ask') {
      if (reading && analysis) {
        setIsAskKaiOpen(true);
      } else {
        alert('Please scan your palm first so Kai can answer based on your unique palm features!');
        setCurrentStep('landing');
      }
    }
  };

  const handleFirstAccessComplete = (enteredName: string, _selectedLang: string) => {
    const finalName = enteredName.trim() || 'Palm 1';
    setUserName(finalName);
    localStorage.setItem('kai_user_name', finalName);
    localStorage.setItem('kai_user_profile_initialized', 'true');
    setIsFirstAccessOpen(false);
  };

  return (
    <div className="app-container">
      {/* Top Header (Hidden during full-screen camera or admin portal) */}
      {currentStep !== 'camera' && !isAdminView && (
        <>
          <Header
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenAdmin={() => setIsAdminView(true)}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onReset={handleResetFlow}
          />
          <LanguageSuggestionBanner />
        </>
      )}

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {isAdminView ? (
          <AdminKnowledgeDashboard onBack={() => setIsAdminView(false)} />
        ) : activeNavTab === 'profile' ? (
          <ProfileView
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            onStartNewScan={handleStartScan}
            onOpenShareCard={(savedReading, readingName, thumbUrl) => {
              setShareTargetReading(savedReading);
              setShareTargetName(readingName);
              setShareTargetThumbnailUrl(thumbUrl || '');
              setIsShareModalOpen(true);
            }}
            onSelectSavedReading={(savedReading, thumbUrl) => {
              setReading(savedReading);
              if (thumbUrl) setCapturedImageDataUrl(thumbUrl);
              setCurrentStep('results');
              setActiveNavTab('reading');
            }}
          />
        ) : (
          <>
            {/* Step 1: KAI REGAI Landing Page */}
            {currentStep === 'landing' && (
              <LandingPage
                onStartScan={() => setCurrentStep('hand_select')}
                onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
                onOpenPrivacy={() => setIsPrivacyOpen(true)}
              />
            )}

            {/* Step 2: 3-Screen Micro Onboarding with Back navigation */}
            {currentStep === 'onboarding' && (
              <OnboardingFlow
                onComplete={handleOnboardingComplete}
                onSkip={() => setCurrentStep('hand_select')}
                onBack={() => setCurrentStep('landing')}
              />
            )}

            {/* Step 3: Hand Selection with Back navigation */}
            {currentStep === 'hand_select' && (
              <HandSelection
                selectedHand={selectedHand}
                onSelectHand={setSelectedHand}
                onConfirm={handleConfirmHand}
                onBack={() => setCurrentStep('landing')}
              />
            )}

            {/* Step 4: Palm Camera Scanner */}
            {currentStep === 'camera' && (
              <PalmCamera
                hand={selectedHand}
                onCapture={handleCapturePhoto}
                onBack={() => setCurrentStep('hand_select')}
              />
            )}

            {/* Step 5: Image Quality Review */}
            {currentStep === 'preview' && capturedImageDataUrl && (
              <ImagePreview
                imageDataUrl={capturedImageDataUrl}
                hand={selectedHand}
                onRetake={() => setCurrentStep('camera')}
                onProceed={handleProceedWithValidImage}
              />
            )}

            {/* Step 6: Calm Perception Engine Animation */}
            {currentStep === 'analyzing' && (
              <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingScan
                  status="Deliberate Shastra Palm Analysis…"
                  palmThumbnailUrl={capturedImageDataUrl || undefined}
                  onComplete={handleScanAnimationComplete}
                />
              </div>
            )}

            {/* Step 7: Free Preview Conversion Screen */}
            {currentStep === 'free_preview' && capturedImageDataUrl && analysis && (
              <FreePreviewScreen
                analysis={analysis}
                imageDataUrl={capturedImageDataUrl}
                onUnlock={handleUnlockPayment}
                isLoading={isPaymentProcessing}
              />
            )}

            {/* Step 8: Standalone Payment (if redirected) */}
            {currentStep === 'payment' && (
              <PaymentStep
                amountPaisa={1000}
                onInitiatePayment={handleUnlockPayment}
                isLoading={isPaymentProcessing}
              />
            )}

            {/* Step 9: Synthesis Animation */}
            {currentStep === 'generating' && (
              <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingScan
                  status="Synthesizing Your Reading"
                  palmThumbnailUrl={capturedImageDataUrl || undefined}
                />
              </div>
            )}

            {/* Step 10: Centerpiece Reading Result View with Rename and Share */}
            {currentStep === 'results' && reading && analysis && (
              <ReadingResultView
                reading={reading}
                analysis={analysis}
                imageDataUrl={capturedImageDataUrl || ''}
                userName={userName || 'Palm 1'}
                onRename={(newName) => {
                  setUserName(newName);
                  localStorage.setItem('kai_user_name', newName);
                }}
                onShare={() => {
                  logAnalyticsEvent('reading_shared');
                  setShareTargetReading(reading);
                  setShareTargetName(userName || 'Palm 1');
                  setShareTargetThumbnailUrl(capturedImageDataUrl || '');
                  setIsShareModalOpen(true);
                }}
                onReset={handleResetFlow}
                onPurgePhoto={handlePurgePhoto}
                onOpenAskKai={(initialQuestion) => {
                  setAskKaiInitialQuestion(initialQuestion);
                  setIsAskKaiOpen(true);
                }}
                externalInspectCrease={activeReadingInspectCrease}
              />
            )}
          </>
        )}
      </main>

      {/* Global Mobile Bottom Navigation */}
      {currentStep !== 'camera' && !isAdminView && (
        <BottomNav
          activeTab={activeNavTab}
          hasReading={!!reading}
          onSelectTab={handleSelectNavTab}
        />
      )}

      {/* Ask Kai Conversational Drawer */}
      {reading && analysis && (
        <AskKaiDrawer
          isOpen={isAskKaiOpen}
          onClose={() => {
            setIsAskKaiOpen(false);
            setAskKaiInitialQuestion(undefined);
          }}
          reading={reading}
          analysis={analysis}
          initialQuestion={askKaiInitialQuestion}
          onInspectCrease={(crease) => {
            setIsAskKaiOpen(false);
            setAskKaiInitialQuestion(undefined);
            setActiveNavTab('reading');
            setCurrentStep('results');
            setActiveReadingInspectCrease(crease);
          }}
        />
      )}

      {/* Global Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {(shareTargetReading || reading) && (
        <ShareCardModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setShareTargetReading(null);
            setShareTargetThumbnailUrl('');
          }}
          reading={shareTargetReading || reading!}
          name={shareTargetName || userName || 'Palm 1'}
          imageDataUrl={shareTargetThumbnailUrl || capturedImageDataUrl || ''}
        />
      )}

      <LanguageSelectModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      {/* First Access Language & Optional Name Setup Modal */}
      <FirstAccessModal
        isOpen={isFirstAccessOpen}
        onComplete={handleFirstAccessComplete}
      />
    </div>
  );
}

export default App;
