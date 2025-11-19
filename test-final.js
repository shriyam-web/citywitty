const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          location: res.headers.location,
          path: path,
          contentLength: data.length
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(30000);
    req.end();
  });
}

async function test() {
  try {
    console.log('\n=== Testing /api/test-username ===');
    const apiResult = await makeRequest('/api/test-username?username=shriyam_05');
    console.log('Status:', apiResult.status);
    
    console.log('\n=== Testing /shriyam_05 ===');
    const redirectResult = await makeRequest('/shriyam_05');
    console.log('Status:', redirectResult.status);
    console.log('Location header:', redirectResult.location);
    console.log('Content length:', redirectResult.contentLength);
    
    if (redirectResult.status === 307 || redirectResult.status === 308) {
      console.log('\n✅ REDIRECT WORKING!');
    } else {
      console.log('\n❌ NOT REDIRECTING - Got status', redirectResult.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
