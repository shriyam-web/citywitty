import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
// import { notifyMerchantIndexed } from '@/lib/google-indexing'; // Temporarily disabled
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { merchantId, action } = await request.json();

    if (!merchantId || !action) {
      return NextResponse.json(
        { error: 'Merchant ID and action are required' },
        { status: 400 }
      );
    }

    // Find the merchant
    const merchant = await Partner.findOne({ merchantId });

    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      );
    }

    let newStatus: string;
    let successMessage: string;

    if (action === 'activate') {
      newStatus = 'active';
      successMessage = 'Merchant activated successfully';
    } else if (action === 'suspend') {
      newStatus = 'suspended';
      successMessage = 'Merchant suspended successfully';
    } else if (action === 'deactivate') {
      newStatus = 'inactive';
      successMessage = 'Merchant deactivated successfully';
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use: activate, suspend, or deactivate' },
        { status: 400 }
      );
    }

    // Update merchant status
    await Partner.findOneAndUpdate(
      { merchantId },
      {
        status: newStatus,
        updatedAt: new Date()
      }
    );

    // If activating a merchant, notify Google for indexing
    if (action === 'activate' && merchant.merchantSlug) {
      try {
        // Notify Google about the new merchant page
        // const indexingSuccess = await notifyMerchantIndexed(merchant.merchantSlug); // Temporarily disabled
        const indexingSuccess = false;

        if (indexingSuccess) {
          console.log(`Successfully notified Google about new merchant: ${merchant.merchantSlug}`);
        } else {
          console.warn(`Failed to notify Google about merchant: ${merchant.merchantSlug}`);
        }

        // Trigger ISR revalidation for the merchant page
        revalidatePath(`/merchants/${merchant.merchantSlug}`);

        // Also revalidate the merchants listing page
        revalidatePath('/merchants');

        // Revalidate the sitemap to include the new merchant faster
        revalidatePath('/sitemap.xml');

      } catch (indexingError) {
        console.error('Error during indexing notification:', indexingError);
        // Don't fail the activation if indexing fails
      }
    }

    return NextResponse.json({
      message: successMessage,
      merchantId,
      status: newStatus
    });

  } catch (error: any) {
    console.error('Error updating merchant status:', error);
    return NextResponse.json(
      { error: 'Failed to update merchant status', details: error.message },
      { status: 500 }
    );
  }
}