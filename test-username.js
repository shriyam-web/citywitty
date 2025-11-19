const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://citywittys:citywittys%40123@cluster0.dbrxdqr.mongodb.net/citywitty?retryWrites=true&w=majority';

mongoose.connect(mongoUri).then(async () => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('partners');
    
    console.log('\n=== Testing username lookup ===');
    
    const merchant = await collection.findOne({ username: 'shriyam_05', status: 'active' });
    console.log('shriyam_05 result:', merchant ? merchant.displayName : 'NOT FOUND');
    
    const allWithUsername = await collection.find({ username: { $exists: true, $ne: null } }).limit(5).toArray();
    console.log('\nMerchants with username field:');
    allWithUsername.forEach(m => {
      console.log(`  - ${m.username}: ${m.displayName} (slug: ${m.merchantSlug})`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}).catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});
