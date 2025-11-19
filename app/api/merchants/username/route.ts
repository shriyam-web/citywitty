import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';

const RESERVED_USERNAMES = [
    'merchants',
    'api',
    'admin',
    'dashboard',
    'auth',
    'login',
    'register',
    'logout',
    'profile',
    'settings',
    'help',
    'contact',
    'about',
    'terms',
    'privacy',
    'cookies',
    'sitemap',
    'store',
    'checkout',
    'cart',
    'orders',
    'account',
    'partner',
    'partners',
    'businesses',
    'business',
    'shop',
    'shops',
    'seller',
    'sellers',
    'vendor',
    'vendors',
    'service',
    'services',
];

const USERNAME_REGEX = /^[a-z0-9_-]{3,30}$/;

function validateUsername(username: string): { valid: boolean; error?: string } {
    if (!username || typeof username !== 'string') {
        return { valid: false, error: 'Username is required' };
    }

    const trimmed = username.trim().toLowerCase();

    if (!USERNAME_REGEX.test(trimmed)) {
        return {
            valid: false,
            error: 'Username must be 3-30 characters, containing only lowercase letters, numbers, hyphens, and underscores',
        };
    }

    if (RESERVED_USERNAMES.includes(trimmed)) {
        return { valid: false, error: 'This username is reserved and cannot be used' };
    }

    return { valid: true };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, merchantId } = body;

        if (!merchantId) {
            return NextResponse.json(
                { error: 'Merchant ID is required' },
                { status: 400 }
            );
        }

        const validation = validateUsername(username);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        await dbConnect();

        const existingMerchant = await Partner.findOne({
            username: username.toLowerCase(),
            merchantId: { $ne: merchantId }
        });

        if (existingMerchant) {
            return NextResponse.json(
                { error: 'This username is already taken' },
                { status: 409 }
            );
        }

        const merchant = await Partner.findOneAndUpdate(
            { merchantId },
            { username: username.toLowerCase() },
            { new: true, select: 'username merchantSlug displayName' }
        );

        if (!merchant) {
            return NextResponse.json(
                { error: 'Merchant not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            username: merchant.username,
            merchantSlug: merchant.merchantSlug,
            vanityUrl: `${process.env.NEXT_PUBLIC_APP_URL}/@${merchant.username}`,
            canonicalUrl: `${process.env.NEXT_PUBLIC_APP_URL}/merchants/${merchant.merchantSlug}`,
        });
    } catch (error) {
        console.error('Username update error:', error);
        return NextResponse.json(
            { error: 'Failed to update username' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const username = req.nextUrl.searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'Username parameter is required' },
                { status: 400 }
            );
        }

        const validation = validateUsername(username);
        if (!validation.valid) {
            return NextResponse.json({
                available: false,
                reason: validation.error,
            });
        }

        await dbConnect();

        const existingMerchant = await Partner.findOne({
            username: username.toLowerCase(),
        });

        if (existingMerchant) {
            return NextResponse.json({
                available: false,
                reason: 'Username is already taken',
            });
        }

        return NextResponse.json({
            available: true,
            username: username.toLowerCase(),
        });
    } catch (error) {
        console.error('Username check error:', error);
        return NextResponse.json(
            { error: 'Failed to check username availability' },
            { status: 500 }
        );
    }
}
