import { redirect, notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: { username?: string };
}) {
    return {
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function UsernamePage({
    params,
}: {
    params: { username?: string };
}) {
    if (!params?.username) {
        notFound();
    }

    try {
        await dbConnect();

        const merchant = await Partner.findOne({
            username: params.username,
            status: 'active',
        }).lean() as unknown as IPartner | null;

        if (!merchant || !merchant.merchantSlug) {
            notFound();
        }

        redirect(`/merchants/${merchant.merchantSlug}`);
    } catch (error) {
        console.error(`Error looking up username ${params.username}:`, error);
        notFound();
    }
}
