import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all merchants with relevant fields
    const merchants = await Partner.find({})
      .select('merchantId displayName merchantSlug email status city category createdAt')
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    // Transform the data for the frontend
    const transformedMerchants = merchants.map(merchant => ({
      _id: merchant._id.toString(),
      merchantId: merchant.merchantId,
      displayName: merchant.displayName,
      merchantSlug: merchant.merchantSlug,
      email: merchant.email,
      status: merchant.status,
      city: merchant.city,
      category: merchant.category,
      createdAt: merchant.createdAt?.toISOString() || new Date().toISOString()
    }));

    return NextResponse.json(transformedMerchants);

  } catch (error: any) {
    console.error('Error fetching merchants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch merchants', details: error.message },
      { status: 500 }
    );
  }
}