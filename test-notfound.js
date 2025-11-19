const http = require('http');

const req = http.get('http://localhost:3000/test-notfound', (res) => {
  console.log('Status:', res.statusCode);
  if (res.statusCode === 404) {
    console.log('✅ notFound() is working!');
  } else {
    console.log('❌ notFound() did NOT return 404, returned:', res.statusCode);
  }
});

req.on('error', (e) => console.error('Error:', e.message));
req.setTimeout(5000);
