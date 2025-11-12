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
        const currentDate = new Date().toISOString().split('T')[0];
        const staticPages = [
            { path: '', changefreq: 'daily', priority: '1.0' },
            { path: 'about', changefreq: 'monthly', priority: '0.7' },
            { path: 'activate-track', changefreq: 'monthly', priority: '0.6' },
            { path: 'admin-signup', changefreq: 'monthly', priority: '0.6' },
            { path: 'careers', changefreq: 'weekly', priority: '0.7' },
            { path: 'contact', changefreq: 'monthly', priority: '0.7' },
            { path: 'cookies', changefreq: 'yearly', priority: '0.4' },
            { path: 'get-card', changefreq: 'monthly', priority: '0.7' },
            { path: 'login', changefreq: 'monthly', priority: '0.5' },
            { path: 'merchants', changefreq: 'daily', priority: '0.8' },
            { path: 'privacy', changefreq: 'yearly', priority: '0.5' },
            { path: 'register', changefreq: 'monthly', priority: '0.7' },
            { path: 'store', changefreq: 'weekly', priority: '0.7' },
            { path: 'terms', changefreq: 'yearly', priority: '0.5' },
        ];

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
        xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
        xml += ' xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

        staticPages.forEach(({ path, changefreq, priority }) => {
            const url = path ? `${baseUrl}/${path}` : baseUrl;
            xml += '  <url>\n';
            xml += `    <loc>${url}</loc>\n`;
            xml += `    <lastmod>${currentDate}</lastmod>\n`;
            xml += `    <changefreq>${changefreq}</changefreq>\n`;
            xml += `    <priority>${priority}</priority>\n`;
            xml += '  </url>\n';
        });

        merchants.forEach((merchant: any) => {
            const isPremium = merchant.premiumSeller || merchant.topRated || merchant.verified;
            const priority = isPremium ? '0.9' : '0.7';
            const changeFreq = isPremium ? 'weekly' : 'monthly';

            const lastMod = merchant.updatedAt
                ? new Date(merchant.updatedAt).toISOString().split('T')[0]
                : currentDate;

            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/merchants/${merchant.merchantSlug}</loc>\n`;
            xml += `    <lastmod>${lastMod}</lastmod>\n`;
            xml += `    <changefreq>${changeFreq}</changefreq>\n`;
            xml += `    <priority>${priority}</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>';

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600', // 30 min cache, 1 hour stale
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