const http = require('http');

const req = http.get('http://localhost:3000/shriyam_05', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('\n--- Response Content (first 1000 chars) ---');
    console.log(data.substring(0, 1000));
    
    // Check if it's showing the home page
    if (data.includes('CityWitty')) {
      console.log('\n⚠️  Showing CityWitty home page content');
    }
    
    // Check if it's showing a loading spinner
    if (data.includes('animate-spin')) {
      console.log('\n⚠️  Showing loading spinner');
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.setTimeout(10000);
