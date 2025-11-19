import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

export const revalidate = 0;

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function UsernamePage({
    params,
}: {
    params: { username: string };
}) {
    if (!params?.username) {
        notFound();
    }

    try {
        await dbConnect();
        const merchant = await Partner.findOne({
            username: params.username,
            status: 'active'
        }).lean() as unknown as IPartner | null;

        if (!merchant || !merchant.merchantSlug) {
            notFound();
        }

        redirect(`/merchants/${merchant.merchantSlug}`);
    } catch (error) {
        console.error('Error fetching merchant:', error);
        notFound();
    }
}
