import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { MerchantStructuredData } from './merchant-structured-data';
import { OfflineProductsGrid } from './offline-products-grid';
import {
    BackgroundWatermarkIcons,
    MerchantHero,
    AboutSection,
    ContactInformation,
    BusinessHoursSection,
    PaymentMethodsSection,
    OfflineDiscountsSection,
    FAQSection,
    ProductsSection,
    RelatedSearches,
    OfflinePurchaseModal,
    GoogleReviewsSection,
    BreadcrumbNavigation,
} from './components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Merchant } from './types';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

// Disable ISR for instant updates - fetch fresh data on every request
export const revalidate = 0;

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
    params,
}: {
    params: { merchantSlug?: string };
}): Promise<Metadata> {
    if (!params?.merchantSlug) {
        return {
            title: 'Merchant Not Found',
            description: 'The merchant you are looking for does not exist.',
            robots: 'noindex, nofollow',
        };
    }

    try {
        await dbConnect();
        const merchant = await Partner.findOne({
            merchantSlug: params.merchantSlug,
            status: 'active'
        }).lean() as unknown as IPartner | null;

        if (!merchant) {
            return {
                title: 'Merchant Not Found',
                description: 'The merchant you are looking for does not exist.',
                robots: 'noindex, nofollow',
            };
        }

        const displayName = merchant.displayName || 'Merchant';
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
        const merchantUrl = `${baseUrl}/merchants/${params.merchantSlug}`;
        const imageUrl = merchant.storeImages?.[0] || `${baseUrl}/og-image.png`;
        const city = merchant.city || 'Local Area';
        const category = merchant.category || 'Business';
        const rating = merchant.googleReviews?.rating || merchant.averageRating || null;
        const ratingCount = merchant.googleReviews?.userRatingsTotal || merchant.ratings?.length || 0;
        const lastModified = merchant.updatedAt ? new Date(merchant.updatedAt) : new Date();

        // Build comprehensive description with SEO keywords (160 chars optimal)
        let description: string;
        if (merchant.description) {
            description = merchant.description.split('\n')[0].substring(0, 158);
            if (description.length === 158) description += '...';
        } else {
            description = `Discover ${displayName}, a trusted ${category} in ${city}. `;
            if (rating && rating >= 4.0) {
                description += `Highly rated ${rating.toFixed(1)}/5 stars. `;
            }
            description += `Find exclusive deals, verified reviews, and premium local services.`;
        }

        // Include relevant tags in description for better SEO targeting
        if (merchant.tags && merchant.tags.length > 0) {
            const relevantTags = merchant.tags.slice(0, 3).join(', ');
            const tagAddition = ` Specializing in: ${relevantTags}.`;
            if (description.length + tagAddition.length <= 160) {
                description += tagAddition;
            }
        }

        // Build comprehensive keywords with semantic variations
        const keywords: string[] = [
            displayName,
            category,
            city,
            `${category} in ${city}`,
            `${city} ${category}`,
            `best ${category} in ${city}`,
            `top ${category} ${city}`,
            `${category} near me`,
            `${category} ${city} area`,
            'local business',
            'local merchant',
            'local services',
            'best deals',
            'exclusive offers',
            'verified reviews',
            'customer reviews',
            'local shopping',
            'premium services',
            ...(merchant.tags || []),
            ...(rating && rating >= 4.5 ? [`best rated ${category}`, `top ${category}`, `highly rated ${category}`] : []),
            ...(merchant.isVerified ? [`verified ${category}`, `trusted ${category}`] : []),
            ...(merchant.isPremiumSeller ? [`premium ${category}`, `quality ${category}`] : []),
            `${displayName} reviews`,
            `${displayName} deals`,
            `${displayName} contact`,
            `${displayName} location`,
            `${displayName} ${city}`,
            `${displayName} phone number`,
            ...(merchant.paymentMethodAccepted ? merchant.paymentMethodAccepted.map(method => `${category} accepting ${method}`) : []),
        ].filter((k, i, arr) => k && arr.indexOf(k) === i); // Remove duplicates

        // Generate optimized title with establishment year
        const establishmentYear = merchant.joinedSince ? new Date(merchant.joinedSince).getFullYear() : null;
        const title = establishmentYear
            ? `${displayName} - ${category} in ${city} Since ${establishmentYear} | CityWitty Local Deals & Reviews`
            : `${displayName} - ${category} in ${city} | CityWitty Local Deals & Reviews`;

        return {
            title,
            description,
            keywords: keywords.slice(0, 20).join(', '),
            authors: [{ name: 'CityWitty' }],
            creator: 'CityWitty',
            publisher: 'CityWitty',
            formatDetection: {
                telephone: true,
                email: true,
                address: true,
            },
            robots: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
                'googlebot': 'index, follow',
            },
            openGraph: {
                title: `${displayName} - Exclusive Deals & Reviews in ${city}`,
                description,
                type: 'website',
                locale: 'en_IN',
                siteName: 'CityWitty',
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: `${displayName} storefront`,
                    },
                    {
                        url: imageUrl,
                        width: 800,
                        height: 800,
                        alt: displayName,
                    }
                ],
                url: merchantUrl,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${displayName} - Deals & Reviews`,
                description,
                images: [imageUrl],
                creator: '@CityWitty',
            },
            alternates: {
                canonical: merchantUrl,
            },
            metadataBase: new URL(baseUrl),
            // Content dating signals for freshness
            ...(merchant.updatedAt && {
                lastModified,
            }),
            // Additional SEO enhancements
            appLinks: [
                {
                    url: merchantUrl,
                    app: 'com.google.android.gms',
                    should_fallback: true,
                }
            ],
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Merchant Profile - CityWitty',
            description: 'Discover premium local merchants with exclusive deals and verified reviews on CityWitty.',
            robots: 'index, follow',
        };
    }
}

/**
 * Generate static params for dynamic routes (ISR)
 * Prioritizes top merchants, recent, and high-rated for better crawl budget
 */
export async function generateStaticParams() {
    try {
        await dbConnect();

        // Fetch merchants strategically: verified, top-rated, and recent
        const [premiumMerchants, recentMerchants] = await Promise.all([
            // Premium merchants: verified, top-rated, high ratings
            Partner.find({
                status: 'active',
                $or: [
                    { isVerified: true, isPremiumSeller: true },
                    { isTopMerchant: true },
                    { averageRating: { $gte: 4.5 } }
                ]
            })
                .select('merchantSlug')
                .sort({ averageRating: -1, ratings: -1 })
                .limit(150)
                .lean(),

            // Recent merchants for freshness
            Partner.find({ status: 'active' })
                .select('merchantSlug')
                .sort({ createdAt: -1 })
                .limit(150)
                .lean(),
        ]);

        // Combine and deduplicate
        const combinedSlugs = new Set<string>();
        [...premiumMerchants, ...recentMerchants].forEach((m: any) => {
            if (m.merchantSlug) combinedSlugs.add(m.merchantSlug);
        });

        return Array.from(combinedSlugs).slice(0, 200).map(slug => ({
            merchantSlug: slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

/**
 * Fetch merchant data and offline products server-side
 * This ensures data is available for SSR and SEO
 */
async function getMerchantData(merchantSlug: string): Promise<{
    merchant: Merchant | null;
    offlineProducts: any[];
} | null> {
    try {
        await dbConnect();

        const merchant = await Partner.findOne({
            merchantSlug,
            status: 'active'
        }).lean() as unknown as IPartner | null;

        if (!merchant) {
            return null;
        }

        // Fetch offline products directly from database (avoids HTTP calls during build)
        let offlineProducts: any[] = [];
        try {
            const merchantIdStr = merchant.merchantId;
            const objectIdStr = merchant._id?.toString();

            offlineProducts = await (
                await import('@/models/OfflineProduct')
            ).default.find({
                $or: [
                    { merchantId: merchantIdStr },
                    { merchantId: objectIdStr }
                ],
                status: "active"
            }).sort({ createdAt: -1 }).lean();

            offlineProducts = offlineProducts || [];
        } catch (error) {
            console.warn('Failed to fetch offline products:', error);
            // Continue with empty products array during build/static generation
        }

        return {
            merchant: JSON.parse(JSON.stringify(merchant)) as Merchant,
            offlineProducts,
        };
    } catch (error) {
        console.error('Failed to fetch merchant data:', error);
        return null;
    }
}

/**
 * Utility functions (server-side)
 */
function toTitleCase(value?: string): string {
    if (!value) return value ?? '';
    return value.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}



function getBusinessHoursData(merchant: Merchant): {
    isOpenAllWeek: boolean;
    orderedBusinessDays: string[];
    openingTime: string;
    closingTime: string;
} | null {
    if (!merchant?.businessHours) return null;

    const openingTime = merchant.businessHours.open || '09:00 AM';
    const closingTime = merchant.businessHours.close || '09:00 PM';
    const businessDays = merchant.businessHours.days || [];

    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const orderedBusinessDays = dayOrder.filter(day => businessDays.includes(day));
    const isOpenAllWeek = orderedBusinessDays.length === 7;

    return { isOpenAllWeek, orderedBusinessDays, openingTime, closingTime };
}

/**
 * Get active status badges
 * Returns badge data with icon names (strings) instead of components
 * to avoid serialization errors when passing from server to client components
 */
function getActiveStatusBadges(merchant: Merchant) {
    return [
        {
            key: 'premiumSeller' as const,
            label: 'Premium Seller',
            iconName: 'crown' as const,
            activeClass: 'bg-amber-500/10 text-amber-600'
        },
        {
            key: 'citywittyAssured' as const,
            label: 'Assured',
            iconName: 'thumbsup' as const,
            activeClass: 'bg-emerald-500/10 text-emerald-600'
        },
        {
            key: 'topRated' as const,
            label: 'Top Rated',
            iconName: 'star' as const,
            activeClass: 'bg-purple-500/10 text-purple-600'
        }
    ].filter(badge => merchant[badge.key] === true);
}



/**
 * Main Merchant Page Component - Server Component
 * This component is rendered server-side for optimal SEO
 * All heavy lifting is done server-side, minimal client-side interactivity
 */
export default async function MerchantProfilePage({
    params,
}: {
    params: { merchantSlug?: string };
}) {
    // Validate params
    if (!params?.merchantSlug) {
        notFound();
    }

    // Fetch data server-side
    const data = await getMerchantData(params.merchantSlug);

    if (!data || !data.merchant) {
        notFound();
    }

    const { merchant: rawMerchant, offlineProducts } = data;

    // Normalize merchant data
    const rawMerchantAny = rawMerchant as any;
    const merchant: Merchant = {
        ...rawMerchant,
        displayName: toTitleCase(rawMerchant.displayName) ?? rawMerchant.displayName,
        streetAddress: toTitleCase(rawMerchant.streetAddress) ?? rawMerchant.streetAddress,
        city: toTitleCase(rawMerchant.city) ?? rawMerchant.city,
        isVerified: rawMerchant.isVerified,
        premiumSeller: rawMerchantAny.isPremiumSeller,
        topRated: rawMerchantAny.isTopMerchant,
        citywittyAssured: rawMerchantAny.citywittyAssured,
    };

    const aboutStats = [
        {
            label: merchant.googleReviews?.userRatingsTotal
                ? merchant.googleReviews.userRatingsTotal.toString()
                : (merchant.ratings?.length || 1).toString(),
            caption: merchant.googleReviews?.userRatingsTotal ? 'Google Reviews' : 'Reviews'
        },
        {
            label: merchant.googleReviews?.rating
                ? merchant.googleReviews.rating.toFixed(1)
                : (merchant.averageRating ?? 5).toFixed(1),
            caption: merchant.googleReviews?.rating ? 'Google Rating' : 'Rating'
        },
        { label: (merchant.branchLocations?.length || 1).toString(), caption: 'Branches' }
    ];

    const businessHoursData = getBusinessHoursData(merchant);
    const activeStatusBadges = getActiveStatusBadges(merchant);

    return (
        <>
            {/* Structured Data for SEO - server-side rendered */}
            <MerchantStructuredData merchant={merchant} />

            <Header />

            <main className="relative z-10">
                <BackgroundWatermarkIcons />

                {/* Merchant Content */}
                <div className="relative z-10 min-h-screen bg-transparent">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                        {/* Hero Section */}
                        <div className="mt-16">
                            <MerchantHero
                                merchant={merchant}
                                distance={null}
                                activeStatusBadges={activeStatusBadges}
                            />
                        </div>

                        {/* Breadcrumb Navigation - SEO and UX */}
                        <BreadcrumbNavigation merchant={merchant} />

                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Google Reviews Section */}
                                {merchant.googleReviews && (
                                    <GoogleReviewsSection googleReviews={merchant.googleReviews} />
                                )}

                                <AboutSection
                                    merchant={merchant}
                                    descriptionParagraphs={merchant.description ? merchant.description.split('\n').filter(p => p.trim()) : []}
                                    aboutStats={aboutStats}
                                />
                                <OfflineDiscountsSection merchant={merchant} />

                                {/* Offline/In-Store Products Section */}
                                {offlineProducts && offlineProducts.length > 0 && (
                                    <Card className="border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-xl ring-1 ring-slate-200/60">
                                        <CardHeader className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                                    </svg>
                                                </div>
                                                <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Available In-Store</CardTitle>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-600 font-medium">Visit our store to purchase these products offline</p>
                                        </CardHeader>
                                        <CardContent>
                                            <OfflineProductsGrid products={offlineProducts} />
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Online Products Section */}
                                {merchant.offlineProducts && merchant.offlineProducts.length > 0 && (
                                    <ProductsSection products={merchant.offlineProducts} />
                                )}

                                <FAQSection faqs={merchant.faqs ?? []} />
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-8">
                                <ContactInformation merchant={merchant} />
                                {businessHoursData && (
                                    <BusinessHoursSection
                                        merchant={merchant}
                                        isOpenAllWeek={businessHoursData.isOpenAllWeek}
                                        orderedBusinessDays={businessHoursData.orderedBusinessDays}
                                        openingTime={businessHoursData.openingTime}
                                        closingTime={businessHoursData.closingTime}
                                    />
                                )}
                                <PaymentMethodsSection paymentMethods={merchant.paymentMethodAccepted ?? []} />
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <ReviewsSection
                            reviews={merchant.ratings || []}
                            merchantId={merchant.merchantId}
                        />

                        {/* Branch Locations */}
                        {merchant.branchLocations && merchant.branchLocations.length > 0 && (
                            <BranchLocationsMap
                                branches={merchant.branchLocations}
                            />
                        )}
                    </div>
                </div>
            </main>

            <SuggestedMerchantsNearYou
                excludeId={merchant._id}
                city={merchant.city}
            />
            <RelatedSearches tags={merchant.relatedSearches ?? merchant.tags ?? []} />

            <div className="relative z-50">
                <Footer />
            </div>
        </>
    );
}
