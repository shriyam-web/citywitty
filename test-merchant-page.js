const http = require('http');

const req = http.get('http://localhost:3000/merchants/pahnawa-by-preets-lucknow', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Merchant page returns 200');
    } else {
      console.log('❌ Merchant page returned:', res.statusCode);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.setTimeout(10000);
