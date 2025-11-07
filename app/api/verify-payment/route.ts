import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, customerData, orderData } = await request.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json(
        { error: 'Payment gateway not configured', success: false },
        { status: 500 }
      );
    }

    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generated_signature !== signature) {
      console.error('Signature mismatch');
      return NextResponse.json(
        { error: 'Payment verification failed', success: false },
        { status: 400 }
      );
    }

    const orderRecord = {
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      customerData: {
        fullName: customerData.fullName,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city,
        state: customerData.state,
        pinCode: customerData.pinCode
      },
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      couponCode: orderData.couponCode,
      totalAmount: orderData.totalAmount,
      status: 'confirmed',
      createdAt: new Date(),
      paymentMethod: 'razorpay'
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
        },
        body: JSON.stringify(orderRecord)
      }).catch(() => null);

      if (!response || !response.ok) {
        console.warn('Order save failed, but payment verified');
      }
    } catch (error) {
      console.warn('Order save error:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: orderId,
      paymentId: paymentId
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', success: false },
      { status: 500 }
    );
  }
}
