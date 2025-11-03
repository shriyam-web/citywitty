'use client';

import React, { useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { MerchantStructuredData } from './merchant-structured-data';
import type { Merchant } from './types';
import { Star, Crown, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    GoogleReviewsSection
} from './components';

export default function MerchantProfilePage({ params }: { params: { merchantSlug?: string } }) {
    const merchantSlug = params?.merchantSlug ?? notFound();
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [distance, setDistance] = useState<string | null>(null);

    // Offline Purchase Modal State
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

    useEffect(() => {
        async function fetchMerchant() {
            try {
                const response = await fetch(`/api/merchants/${merchantSlug}`);
                if (response.status === 404) {
                    notFound();
                }
                const data = await response.json() as Merchant & {
                    isVerified?: boolean;
                    isPremiumSeller?: boolean;
                    isTopMerchant?: boolean;
                };
                const normalizedMerchant: Merchant = {
                    ...data,
                    verified: data.verified ?? data.isVerified ?? false,
                    premiumSeller: data.premiumSeller ?? data.isPremiumSeller ?? false,
                    topRated: data.topRated ?? data.isTopMerchant ?? false,
                };
                console.log('Fetched merchant data:', normalizedMerchant);
                console.log('Has offlineDiscount?', normalizedMerchant.offlineDiscount);
                console.log('Has offlineProducts?', normalizedMerchant.offlineProducts);
                console.log('Offline products count:', normalizedMerchant.offlineProducts?.length);
                setMerchant(normalizedMerchant);
            } catch (error) {
                console.error("Failed to fetch merchant:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMerchant();
    }, [merchantSlug]);

    useEffect(() => {
        if (navigator.geolocation && merchant?.latitude !== undefined && merchant?.longitude !== undefined) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setUserLocation({ lat: userLat, lng: userLng });
                    const dist = calculateDistance(userLat, userLng, merchant.latitude!, merchant.longitude!);
                    setDistance(dist);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, [merchant]);

    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;
        return dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(1)} km`;
    };

    const ensureHttps = (url: string | undefined): string => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    const isOfferExpired = (validUpto: Date | string): boolean => {
        const expiryDate = new Date(validUpto);
        return expiryDate < new Date();
    };

    const getBusinessHoursData = () => {
        if (!merchant?.businessHours) return null;

        const openingTime = merchant.businessHours.open || '09:00 AM';
        const closingTime = merchant.businessHours.close || '09:00 PM';
        const businessDays = merchant.businessHours.days || [];

        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const orderedBusinessDays = dayOrder.filter(day => businessDays.includes(day));
        const isOpenAllWeek = orderedBusinessDays.length === 7;

        return { isOpenAllWeek, orderedBusinessDays, openingTime, closingTime };
    };

    const activeStatusBadges = [
        {
            key: 'premiumSeller' as const,
            label: 'Premium Seller',
            icon: Crown,
            activeClass: 'bg-amber-500/10 text-amber-600'
        },
        {
            key: 'citywittyAssured' as const,
            label: 'Assured',
            icon: ThumbsUp,
            activeClass: 'bg-emerald-500/10 text-emerald-600'
        },
        {
            key: 'topRated' as const,
            label: 'Top Rated',
            icon: Star,
            activeClass: 'bg-purple-500/10 text-purple-600'
        }
    ].filter(badge => merchant && merchant[badge.key]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>Loading merchant details...</p>
                </div>
            </div>
        );
    }

    if (!merchant) {
        return notFound();
    }

    return (
        <>
            <Header />

            <div className="relative z-10">
                <BackgroundWatermarkIcons />

                {/* Merchant Content */}
                <div className="relative z-10 min-h-screen bg-transparent">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                        {/* Hero Section */}
                        <div className="mt-16">
                            <MerchantHero
                                merchant={merchant}
                                distance={distance}
                                activeStatusBadges={activeStatusBadges}
                                onPurchaseClick={() => setIsPurchaseModalOpen(true)}
                            />
                        </div>

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
                                    aboutStats={[
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
                                    ]}
                                />
                                <OfflineDiscountsSection merchant={merchant} isOfferExpired={isOfferExpired} />

                                {/* Offline/In-Store Products Section */}
                                {merchant.offlineProducts && merchant.offlineProducts.length > 0 && (
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
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {merchant.offlineProducts.map((product, index) => {
                                                    const productKey = product._id ?? product.productId ?? index;
                                                    const productImages = product.productImages ?? [];
                                                    const firstImage = productImages[0];
                                                    const isOutOfStock = product.isAvailableStock === false || product.availableStocks === 0;
                                                    const displayPrice = product.discountedPrice ?? product.originalPrice ?? null;
                                                    const originalPrice = product.originalPrice ?? null;
                                                    const hasDiscount =
                                                        product.discountedPrice !== undefined &&
                                                        product.discountedPrice !== null &&
                                                        originalPrice !== null &&
                                                        product.discountedPrice < originalPrice;
                                                    const formatCurrency = (value?: number | null) => {
                                                        if (value === undefined || value === null) return null;
                                                        return value.toLocaleString('en-IN');
                                                    };
                                                    const formattedDisplayPrice = formatCurrency(displayPrice);
                                                    const formattedOriginalPrice = formatCurrency(originalPrice);

                                                    return (
                                                        <div key={productKey} className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                                                            {firstImage ? (
                                                                <div className="relative h-44 overflow-hidden">
                                                                    <img
                                                                        src={firstImage}
                                                                        alt={product.productName ?? `Product ${index + 1}`}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                    {isOutOfStock && (
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                                                            Out of Stock
                                                                        </div>
                                                                    )}
                                                                    <Badge className="absolute left-3 top-3 rounded-full bg-indigo-600/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-sm">
                                                                        In-Store
                                                                    </Badge>
                                                                    {product.cityWittyAssured && (
                                                                        <Badge className="absolute left-3 top-12 rounded-full bg-emerald-500/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-sm">
                                                                            Assured
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                                                    No Image
                                                                </div>
                                                            )}
                                                            <div className="flex flex-1 flex-col gap-4 p-5">
                                                                <div className="space-y-2">
                                                                    <h5 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">
                                                                        {product.productName ?? `Product ${index + 1}`}
                                                                    </h5>
                                                                    {product.brand && (
                                                                        <p className="text-xs font-medium text-slate-500">
                                                                            Brand: <span className="text-slate-700">{product.brand}</span>
                                                                        </p>
                                                                    )}
                                                                    {product.productDescription && (
                                                                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                                                                            {product.productDescription}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="mt-auto space-y-3">
                                                                    {formattedDisplayPrice && (
                                                                        <div className="flex items-baseline gap-2">
                                                                            <span className="text-xl font-bold text-indigo-600">₹{formattedDisplayPrice}</span>
                                                                            {hasDiscount && formattedOriginalPrice && (
                                                                                <span className="text-sm font-medium text-slate-400 line-through">₹{formattedOriginalPrice}</span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                                                                        Visit store to purchase
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Online Products Section */}
                                {merchant.products && merchant.products.length > 0 && (
                                    <ProductsSection products={merchant.products} />
                                )}

                                <FAQSection faqs={merchant.faqs ?? []} />
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-8">
                                <ContactInformation merchant={merchant} ensureHttps={ensureHttps} />
                                {/* {getBusinessHoursData() && (
                                    <BusinessHoursSection
                                        merchant={merchant}
                                        isOpenAllWeek={getBusinessHoursData()!.isOpenAllWeek}
                                        orderedBusinessDays={getBusinessHoursData()!.orderedBusinessDays}
                                        openingTime={getBusinessHoursData()!.openingTime}
                                        closingTime={getBusinessHoursData()!.closingTime}
                                    />
                                )} */}
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
            </div>

            <SuggestedMerchantsNearYou
                excludeId={merchant._id}
                city={merchant.city}
            />

            <RelatedSearches tags={merchant.relatedSearches ?? merchant.tags ?? []} />

            <div className="relative z-50">
                <Footer />
            </div>

            {/* Structured Data for SEO */}
            <MerchantStructuredData merchant={merchant} />

            {/* Offline Purchase Modal */}
            {merchant?.merchantId && (
                <OfflinePurchaseModal
                    isOpen={isPurchaseModalOpen}
                    onClose={() => setIsPurchaseModalOpen(false)}
                    merchantId={merchant.merchantId}
                    merchantSlug={merchantSlug}
                />
            )}
        </>
    );
}
