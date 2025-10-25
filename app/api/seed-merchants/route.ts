import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
import { NextResponse } from "next/server";

const demoMerchants = [
  {
    merchantId: "demo001",
    legalName: "Demo Restaurant Pvt Ltd",
    displayName: "Tasty Bites",
    merchantSlug: "tasty-bites",
    email: "contact@tastybites.com",
    emailVerified: true,
    phone: "+91-9876543210",
    phoneVerified: true,
    password: "hashedpassword", // dummy hash
    category: "Restaurant",
    city: "Mumbai",
    streetAddress: "123 Food Street",
    pincode: "400001",
    locality: "Andheri",
    state: "Maharashtra",
    country: "India",
    whatsapp: "+91-9876543210",
    isWhatsappSame: true,
    gstNumber: "22AAAAA0000A1Z5",
    panNumber: "AAAAA0000A",
    businessType: "Private Limited",
    yearsInBusiness: "5",
    averageMonthlyRevenue: "500000",
    discountOffered: "10-20%",
    description: "Authentic Indian cuisine with modern twists. Serving delicious meals since 2019.",
    website: "https://tastybites.com",
    socialLinks: {
      facebook: "https://facebook.com/tastybites",
      instagram: "https://instagram.com/tastybites",
    },
    agreeToTerms: true,
    logo: "https://via.placeholder.com/200x200?text=Tasty+Bites+Logo",
    storeImages: [
      "https://via.placeholder.com/800x400?text=Store+Image+1",
      "https://via.placeholder.com/800x400?text=Store+Image+2",
    ],
    customOffer: "20% off on first order",
    ribbonTag: "Top Rated",
    mapLocation: "19.0760,72.8777",
    visibility: true,
    joinedSince: new Date("2019-01-01"),
    citywittyAssured: true,
    averageRating: 4.5,
    tags: ["Indian", "Vegetarian", "Family Friendly"],
    status: "active",
    paymentMethodAccepted: ["Cash", "Card", "UPI"],
    qrcodeLink: "https://example.com/qr",
    businessHours: {
      open: "10:00 AM",
      close: "10:00 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    bankDetails: {
      bankName: "HDFC Bank",
      accountHolderName: "Demo Restaurant Pvt Ltd",
      accountNumber: "1234567890",
      ifscCode: "HDFC0001234",
      upiId: "demo@upi",
    },
    ListingLimit: 100,
    Addedlistings: 50,
    totalGraphics: 10,
    totalReels: 5,
    isWebsite: true,
    totalEarnings: 250000,
    minimumOrderValue: 200,
    offlineDiscount: [
      {
        category: "Food",
        offerTitle: "Lunch Special",
        offerDescription: "20% off on lunch items",
        discountValue: 40,
        discountPercent: 20,
        status: "Active",
        validUpto: new Date("2024-12-31"),
      },
    ],
    branchLocations: [
      {
        branchName: "Main Branch",
        city: "Mumbai",
        streetAddress: "123 Food Street",
        pincode: "400001",
        locality: "Andheri",
        state: "Maharashtra",
        country: "India",
        mapLocation: "19.0760,72.8777",
        latitude: 19.0760,
        longitude: 72.8777,
      },
    ],
  },
  // Add other merchants similarly...
];

export async function POST() {
  try {
    await dbConnect();

    // Clear existing demo merchants
    await Partner.deleteMany({ merchantId: { $regex: /^demo/ } });

    // Insert demo merchants
    const inserted = await Partner.insertMany(demoMerchants);

    return NextResponse.json({ message: `Inserted ${inserted.length} demo merchants` });
  } catch (error: unknown) {
    console.error("Error seeding merchants:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
