import { NextResponse } from 'next/server';
import { notifyMerchantIndexed, submitToGoogleIndexing } from '@/lib/google-indexing';

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

    // Test 1: Basic URL submission
    console.log('🧪 Testing Google Indexing API...');

    const testUrl = `${baseUrl}/merchants/test-merchant-slug`;
    console.log('Testing URL:', testUrl);
    // Temporarily disabled for testing
    // const success = await submitToGoogleIndexing(testUrl, 'URL_UPDATED');
    const success = false;
    console.log('Basic URL submission result:', success);

    // Test 2: Merchant-specific function
    console.log('Testing merchant notification...');
    // const merchantSuccess = await notifyMerchantIndexed('test-merchant-slug');
    const merchantSuccess = false;
    console.log('Merchant notification result:', merchantSuccess);

    // Test 3: Check environment variables
    const hasCredentials = !!(process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY &&
                             process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL);

    const results = {
      timestamp: new Date().toISOString(),
      environment: {
        hasServiceAccountKey: !!process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY,
        hasServiceAccountEmail: !!process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL,
        hasCredentials,
        baseUrl
      },
      tests: {
        basicUrlSubmission: {
          url: testUrl,
          success,
          status: success ? '✅ PASSED' : '❌ FAILED'
        },
        merchantNotification: {
          merchantSlug: 'test-merchant-slug',
          success: merchantSuccess,
          status: merchantSuccess ? '✅ PASSED' : '❌ FAILED'
        }
      },
      overallStatus: (success && merchantSuccess && hasCredentials) ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'
    };

    console.log('📊 Test Results:', JSON.stringify(results, null, 2));

    return NextResponse.json(results, {
      status: results.overallStatus.includes('PASSED') ? 200 : 500
    });

  } catch (error: any) {
    console.error('❌ Test failed with error:', error);
    console.error('Error stack:', error.stack);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      overallStatus: '❌ TEST FAILED WITH ERROR'
    }, { status: 500 });
  }
}