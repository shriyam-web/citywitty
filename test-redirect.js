const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/shriyam_05',
  method: 'GET',
  redirect: 'manual'
};

const req = http.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  console.log('Location header:', res.headers.location);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse length:', data.length);
    if (data.length < 500) {
      console.log('Response body:', data);
    } else {
      console.log('Response body (first 500 chars):', data.substring(0, 500));
    }
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});

req.end();
