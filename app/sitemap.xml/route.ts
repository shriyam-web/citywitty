/**
 * Dynamic Sitemap Generation for Merchants
 * Helps Google discover and crawl all merchant pages
 * Generates XML sitemap with proper lastmod and priority tags
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';

export async function GET() {
    try {
        await dbConnect();

        // Fetch all active merchants with required fields
        const merchants = await Partner.find({ status: 'active' })
            .select('merchantSlug updatedAt premiumSeller topRated verified')
            .lean()
            .exec();

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

        // Generate sitemap XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
        xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
        xml += ' xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

        // Add merchant URLs
        merchants.forEach((merchant: any) => {
            // Priority based on merchant quality
            const isPremium = merchant.premiumSeller || merchant.topRated || merchant.verified;
            const priority = isPremium ? '0.9' : '0.7';
            const changeFreq = isPremium ? 'weekly' : 'monthly';

            const lastMod = merchant.updatedAt
                ? new Date(merchant.updatedAt).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0];

            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/merchants/${merchant.merchantSlug}</loc>\n`;
            xml += `    <lastmod>${lastMod}</lastmod>\n`;
            xml += `    <changefreq>${changeFreq}</changefreq>\n`;
            xml += `    <priority>${priority}</priority>\n`;
            xml += '  </url>\n';
        });

        // Add main merchants page
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/merchants</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';

        xml += '</urlset>';

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);

        // Return a basic sitemap on error
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/merchants</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
            },
        });
    }
}