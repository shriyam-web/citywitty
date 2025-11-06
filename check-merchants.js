const mongoose = require('mongoose');
require('dotenv').config();

async function checkMerchants() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/citywitty');
    const Partner = require('./models/partner/partner/index.ts');

    const merchants = await Partner.find({ status: 'active' })
      .select('merchantSlug offlineProducts products')
      .limit(5);

    console.log('Found merchants:');
    merchants.forEach(merchant => {
      console.log(`Merchant: ${merchant.merchantSlug}`);
      console.log(`  Online products: ${merchant.products?.length || 0}`);
      console.log(`  Offline products: ${merchant.offlineProducts?.length || 0}`);
      if (merchant.offlineProducts && merchant.offlineProducts.length > 0) {
        console.log(`  Sample offline product: ${merchant.offlineProducts[0].productName}`);
      }
      console.log('');
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkMerchants();