import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MerchantUsernameRedirect({
  params,
}: {
  params: { username: string };
}) {
  if (!params?.username) {
    notFound();
  }

  const username = params.username.toLowerCase();

  if (!/^[a-z0-9._-]+$/i.test(username)) {
    notFound();
  }

  try {
    await dbConnect();
    const merchant = await Partner.findOne({
      username: username,
      status: 'active',
    }).lean() as unknown as IPartner | null;

    if (merchant && merchant.merchantSlug) {
      redirect(`/merchants/${merchant.merchantSlug}`);
    }

    notFound();
  } catch (error) {
    console.error('[m-username] Error looking up username:', error);
    notFound();
  }
}
