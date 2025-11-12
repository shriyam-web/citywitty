const mongoose = require('mongoose');
const Partner = require('./models/partner/partner/');

async function checkBadges() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/citywitty');
        const merchants = await Partner.find({})
            .select('displayName isPremiumSeller isCWassured citywittyAssured premiumSeller')
            .limit(5);
        console.log('Merchant badge status:');
        merchants.forEach(merchant => {
            console.log(`${merchant.displayName}:`);
            console.log(`  isPremiumSeller: ${merchant.isPremiumSeller}`);
            console.log(`  isCWassured: ${merchant.isCWassured}`);
            console.log(`  citywittyAssured: ${merchant.citywittyAssured}`);
            console.log(`  premiumSeller: ${merchant.premiumSeller}`);
            console.log('---');
        });
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkBadges();