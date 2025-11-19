import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { MerchantStructuredData } from '@/app/merchants/[merchantSlug]/merchant-structured-data';
import { OfflineProductsGrid } from '@/app/merchants/[merchantSlug]/offline-products-grid';
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
} from '@/app/merchants/[merchantSlug]/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Merchant } from '@/app/merchants/[merchantSlug]/types';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

export const revalidate = 0;

async function getMerchantByUsername(username: string) {
    try {
        await dbConnect();
        const merchant = await Partner.findOne({
            username: username,
            status: 'active'
        }).lean() as unknown as IPartner | null;

        if (!merchant) {
            return null;
        }

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

export async function generateMetadata({
    params,
}: {
    params: { username: string };
}): Promise<Metadata> {
    if (!params?.username) {
        return {
            title: 'Merchant Not Found',
            description: 'The merchant you are looking for does not exist.',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    try {
        const data = await getMerchantByUsername(params.username);
        
        if (!data || !data.merchant) {
            return {
                title: 'Merchant Not Found',
                description: 'The merchant you are looking for does not exist.',
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const merchant = data.merchant;
        const displayName = merchant.displayName || 'Merchant';
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
        
        const canonicalUrl = `${baseUrl}/merchants/${merchant.merchantSlug}`;
        const imageUrl = merchant.storeImages?.[0] || `${baseUrl}/og-image.png`;
        const city = merchant.city || 'Local Area';
        const category = merchant.category || 'Business';
        const rating = merchant.googleReviews?.rating || merchant.averageRating || null;
        const ratingCount = merchant.googleReviews?.userRatingsTotal || merchant.ratings?.length || 0;
        const lastModified = merchant.updatedAt ? new Date(merchant.updatedAt) : new Date();

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

        if (merchant.tags && merchant.tags.length > 0) {
            const relevantTags = merchant.tags.slice(0, 3).join(', ');
            const tagAddition = ` Specializing in: ${relevantTags}.`;
            if (description.length + tagAddition.length <= 160) {
                description += tagAddition;
            }
        }

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
            ...(merchant.premiumSeller ? [`premium ${category}`, `quality ${category}`] : []),
            `${displayName} reviews`,
            `${displayName} deals`,
            `${displayName} contact`,
            `${displayName} location`,
            `${displayName} ${city}`,
            `${displayName} phone number`,
            ...(merchant.paymentMethodAccepted ? merchant.paymentMethodAccepted.map(method => `${category} accepting ${method}`) : []),
        ].filter((k, i, arr) => k && arr.indexOf(k) === i);

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
                'googleBot': 'index, follow',
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
                url: canonicalUrl,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${displayName} - Deals & Reviews`,
                description,
                images: [imageUrl],
                creator: '@CityWitty',
            },
            alternates: {
                canonical: canonicalUrl,
            },
            metadataBase: new URL(baseUrl),
            ...(merchant.updatedAt && {
                lastModified,
            }),
            appLinks: {
                android: {
                    package: 'com.google.android.gms',
                    url: canonicalUrl,
                }
            },
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

export default async function UsernameMerchantProfilePage({
    params,
}: {
    params: { username: string };
}) {
    if (!params?.username) {
        notFound();
    }

    const data = await getMerchantByUsername(params.username);

    if (!data || !data.merchant) {
        notFound();
    }

    const { merchant: rawMerchant, offlineProducts } = data;
    const merchant = {
        ...rawMerchant,
        displayName: toTitleCase(rawMerchant.displayName),
    };

    const businessHours = getBusinessHoursData(merchant);
    const statusBadges = getActiveStatusBadges(merchant);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
    const canonicalUrl = `${baseUrl}/merchants/${merchant.merchantSlug}`;

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

    const descriptionParagraphs = merchant.description ? merchant.description.split('\n').filter(p => p.trim()) : [];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <MerchantStructuredData merchant={merchant} />

                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <BreadcrumbNavigation merchant={merchant} />

                    <div className="mt-8">
                        <BackgroundWatermarkIcons />
                        <MerchantHero merchant={merchant} activeStatusBadges={statusBadges} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                        <div className="lg:col-span-2 space-y-8">
                            <AboutSection
                                merchant={merchant}
                                descriptionParagraphs={descriptionParagraphs}
                                aboutStats={aboutStats}
                            />

                            {offlineProducts && offlineProducts.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <OfflineProductsGrid products={offlineProducts} />
                                </>
                            )}

                            {merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <OfflineDiscountsSection merchant={merchant} />
                                </>
                            )}

                            {merchant.products && merchant.products.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <ProductsSection products={merchant.products} />
                                </>
                            )}

                            {merchant.googleReviews?.reviews && merchant.googleReviews.reviews.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <GoogleReviewsSection googleReviews={merchant.googleReviews} />
                                </>
                            )}

                            {merchant.ratings && merchant.ratings.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <ReviewsSection reviews={merchant.ratings} merchantId={merchant._id} />
                                </>
                            )}

                            {merchant.branchLocations && merchant.branchLocations.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <BranchLocationsMap branches={merchant.branchLocations} />
                                </>
                            )}

                            {merchant.faq && merchant.faq.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <FAQSection merchant={merchant} />
                                </>
                            )}

                            <hr className="my-8" />
                            <RelatedSearches merchant={merchant} />
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <ContactInformation merchant={merchant} />
                                {businessHours && <BusinessHoursSection businessHours={businessHours} />}
                                <PaymentMethodsSection merchant={merchant} />
                            </div>
                        </div>
                    </div>

                    <OfflinePurchaseModal />
                    <SuggestedMerchantsNearYou merchant={merchant} />
                </div>
            </main>
            <Footer />
        </>
    );
}
