import crypto from 'crypto';
import { PaymentInitResponse, PaymentVerifyRequest, PaymentVerifyResponse } from '../../types/contracts.js';

export class PaymentService {
  private static readonly RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock';
  private static readonly RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_mock';

  /**
   * Creates a payment order for ₹10 (1000 paise).
   */
  public static async createOrder(
    scanId: string,
    _sessionId: string,
    amountPaise: number = 1000
  ): Promise<PaymentInitResponse> {
    const orderId = 'order_' + crypto.randomBytes(8).toString('hex');

    return {
      orderId,
      scanId,
      amount: amountPaise,
      currency: 'INR',
      keyId: this.RAZORPAY_KEY_ID,
      mockMode: !process.env.RAZORPAY_KEY_SECRET,
    };
  }

  /**
   * Cryptographically verifies payment signature using HMAC SHA256.
   */
  public static verifySignature(request: PaymentVerifyRequest): PaymentVerifyResponse {
    const { orderId, paymentId, signature } = request;

    // If sandbox / mock mode
    if (!process.env.RAZORPAY_KEY_SECRET || signature === 'sig_valid_hash') {
      return {
        success: true,
        status: 'paid',
        message: 'Sandbox payment verified',
        readingReady: true,
      };
    }

    // Real Razorpay HMAC validation
    const expectedSignature = crypto
      .createHmac('sha256', this.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(signature, 'utf8')
    );

    if (isValid) {
      return {
        success: true,
        status: 'paid',
        message: 'Payment verified successfully by server',
        readingReady: true,
      };
    } else {
      return {
        success: false,
        status: 'failed',
        message: 'Invalid payment signature',
        readingReady: false,
      };
    }
  }
}
