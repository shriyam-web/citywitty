import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🧪 Testing basic environment variables...');

    const serviceAccountKey = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY;
    const serviceAccountEmail = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL;

    console.log('Has service account key:', !!serviceAccountKey);
    console.log('Has service account email:', !!serviceAccountEmail);

    if (serviceAccountKey) {
      console.log('Key length:', serviceAccountKey.length);
      console.log('Key starts with:', serviceAccountKey.substring(0, 50) + '...');
    }

    if (serviceAccountEmail) {
      console.log('Email:', serviceAccountEmail);
    }

    return NextResponse.json({
      success: true,
      hasCredentials: !!(serviceAccountKey && serviceAccountEmail),
      keyLength: serviceAccountKey?.length,
      email: serviceAccountEmail
    });

  } catch (error: any) {
    console.error('❌ Basic test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}