/**
 * Test Script for Google Indexing API Integration
 * Run with: node test-indexing.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;

    const req = protocol.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (options.method === 'POST' && options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting Google Indexing API Tests...\n');

  try {
    // Test 1: Basic Indexing API Test
    console.log('📡 Test 1: Basic Google Indexing API functionality');
    const indexingTestUrl = `${BASE_URL}/api/test-indexing`;
    const indexingResult = await makeRequest(indexingTestUrl);

    console.log(`Status: ${indexingResult.status}`);
    console.log('Results:', JSON.stringify(indexingResult.data, null, 2));
    console.log('');

    // Test 2: Full Activation Test
    console.log('🔄 Test 2: Full merchant activation with indexing');
    const activationTestUrl = `${BASE_URL}/api/test-activation`;
    const activationResult = await makeRequest(activationTestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${activationResult.status}`);
    console.log('Results:', JSON.stringify(activationResult.data, null, 2));
    console.log('');

    // Test 3: Check sitemap includes test data
    console.log('🗺️  Test 3: Sitemap generation');
    const sitemapUrl = `${BASE_URL}/sitemap.xml`;
    const sitemapResult = await makeRequest(sitemapUrl);

    console.log(`Status: ${sitemapResult.status}`);
    if (sitemapResult.status === 200) {
      const hasMerchants = sitemapResult.data.includes('<loc>') && sitemapResult.data.includes('/merchants/');
      console.log(`Contains merchant URLs: ${hasMerchants ? '✅ YES' : '❌ NO'}`);
    }
    console.log('');

    // Summary
    console.log('📊 Test Summary:');
    console.log(`Indexing API: ${indexingResult.data?.overallStatus || '❌ FAILED'}`);
    console.log(`Activation Flow: ${activationResult.data?.overallStatus || '❌ FAILED'}`);
    console.log(`Sitemap: ${sitemapResult.status === 200 ? '✅ OK' : '❌ FAILED'}`);

    const allPassed = (
      indexingResult.data?.overallStatus?.includes('PASSED') &&
      activationResult.data?.overallStatus?.includes('PASSED') &&
      sitemapResult.status === 200
    );

    console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED'}`);

    if (!allPassed) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check that GOOGLE_INDEXING_SERVICE_ACCOUNT_EMAIL and GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY are set');
      console.log('2. Verify the service account has Indexing API permissions');
      console.log('3. Ensure domain is verified in Google Search Console');
      console.log('4. Check application logs for detailed error messages');
    }

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };