const http = require('http');

const req = http.get('http://localhost:3000/merchants/invalid-merchant-slug-12345', (res) => {
  console.log('Status:', res.statusCode);
  if (res.statusCode === 404) {
    console.log('✅ notFound() works - returned 404');
  } else {
    console.log('❌ notFound() did NOT work - returned:', res.statusCode);
  }
});

req.on('error', (e) => console.error('Error:', e.message));
req.setTimeout(10000);
