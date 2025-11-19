import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'shriyam_05';

    try {
        await dbConnect();
        
        const merchant = await Partner.findOne({
            username: username,
            status: 'active',
        }).lean() as any;

        if (!merchant) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: `Username "${username}" not found`, 
                    searched: username 
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            username,
            displayName: merchant.displayName,
            merchantSlug: merchant.merchantSlug,
            status: merchant.status,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: String(error),
                username 
            },
            { status: 500 }
        );
    }
}
