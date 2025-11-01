'use client';

import React, { useEffect, useState } from "react";
import { Award, Star, ThumbsUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MerchantStructuredData } from './merchant-structured-data';
import type { Merchant } from './types';
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
} from './components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HighlightBadge = {
    key: keyof Pick<Merchant, "premiumSeller" | "verified" | "citywittyAssured" | "topRated">;
    label: string;
    icon: LucideIcon;
    activeClass: string;
};

export default function MerchantProfilePage({ params }: { params: { merchantSlug: string } }) {
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

    useEffect(() => {
        async function fetchMerchant() {
            try {
                const response = await fetch(`/api/merchants/${params.merchantSlug}`);
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
                setMerchant(normalizedMerchant);
            } catch (error) {
                console.error("Failed to fetch merchant:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMerchant();
    }, [params.merchantSlug]);

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

    // Prepare data for components
    const statusBadges: HighlightBadge[] = [
        {
            key: 'premiumSeller',
            label: 'Premium Seller',
            icon: Award,
            activeClass: 'bg-white text-amber-700 border border-amber-200 shadow-sm',
        },
        {
            key: 'citywittyAssured',
            label: 'Assured',
            icon: ThumbsUp,
            activeClass: 'bg-white text-blue-600 border border-blue-200 shadow-sm',
        },
        {
            key: 'topRated',
            label: 'Top Seller',
            icon: Star,
            activeClass: 'bg-white text-indigo-600 border border-indigo-200 shadow-sm',
        }
    ];

    const activeStatusBadges = statusBadges.filter((badge) => Boolean(merchant[badge.key]));

    // Business hours data
    const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const normalizeDayName = (day: string) => {
        const match = DAYS_OF_WEEK.find((weekday) => weekday.toLowerCase() === day.toLowerCase());
        return match ?? day;
    };
    const rawBusinessDays = merchant.businessHours?.days ?? [];
    const normalizedBusinessDays = Array.from(new Set(rawBusinessDays.map((day) => normalizeDayName(day))));
    const isOpenAllWeek = normalizedBusinessDays.length === DAYS_OF_WEEK.length &&
        DAYS_OF_WEEK.every((weekday) => normalizedBusinessDays.includes(weekday));
    const orderedBusinessDays = DAYS_OF_WEEK.filter((weekday) => normalizedBusinessDays.includes(weekday))
        .concat(normalizedBusinessDays.filter((day) => !DAYS_OF_WEEK.includes(day)));
    const openingTime = merchant.businessHours?.open ?? 'Open';
    const closingTime = merchant.businessHours?.close ?? 'Close';

    // Description and stats
    const displayCity = merchant.city?.trim() || 'your area';
    const fallbackCategory = merchant.category ? merchant.category.toLowerCase() : 'merchant';
    const descriptionCopy = merchant.description?.trim().length
        ? merchant.description
        : `Dedicated to delivering exceptional ${fallbackCategory} experiences to the ${displayCity} community.`;
    const descriptionParagraphs = descriptionCopy
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const joinedDate = merchant.joinedSince ? new Date(merchant.joinedSince) : null;
    const yearsActive = joinedDate
        ? Math.max(1, Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24 * 365)))
        : null;
    const offerCount = merchant.offlineDiscount?.length ?? 0;
    const paymentMethods = merchant.paymentMethodAccepted ?? [];
    const paymentMethodSummary = paymentMethods.slice(0, 3).join(', ');
    const ratingValue = merchant.averageRating ?? null;
    const aboutStats = [
        yearsActive ? { label: `${yearsActive}+ years`, caption: 'Serving the community' } : null,
        offerCount > 0 ? { label: `${offerCount} featured deal${offerCount > 1 ? 's' : ''}`, caption: 'Ready for in-store redemption' } : null,
        paymentMethods.length > 0
            ? {
                label: `${paymentMethods.length} payment method${paymentMethods.length > 1 ? 's' : ''}`,
                caption: paymentMethodSummary ? `${paymentMethodSummary}${paymentMethods.length > 3 ? ' +' : ''}` : 'Flexible checkout options',
            }
            : null,
        ratingValue ? { label: `${ratingValue.toFixed(1)}/5`, caption: 'Shopper-rated experience' } : null,
    ].filter((stat): stat is { label: string; caption: string } => Boolean(stat));

    return (
        <>
            <Header />
            <MerchantStructuredData merchant={merchant} />

            <div className="relative z-10">
                {/* Background Watermark Icons */}
                <BackgroundWatermarkIcons />

                {/* Main Content */}
                <div className="relative z-20 bg-slate-50 py-8 sm:py-12 lg:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl space-y-8">
                            {/* Hero Section */}
                            <MerchantHero
                                merchant={merchant}
                                distance={distance}
                                activeStatusBadges={activeStatusBadges}
                                onPurchaseClick={() => setIsPurchaseModalOpen(true)}
                            />

                            {/* About Section */}
                            <AboutSection
                                merchant={merchant}
                                descriptionParagraphs={descriptionParagraphs}
                                aboutStats={aboutStats}
                            />

                            {/* Branch Locations */}
                            {merchant.branchLocations && merchant.branchLocations.length > 0 && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Our Locations</CardTitle>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Find us at these convenient locations</p>
                                    </CardHeader>
                                    <CardContent>
                                        <BranchLocationsMap
                                            branches={merchant.branchLocations}
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Offline Discounts */}
                            <OfflineDiscountsSection
                                merchant={merchant}
                                isOfferExpired={isOfferExpired}
                            />

                            {/* Products */}
                            <ProductsSection products={merchant.products ?? []} />

                            {/* Reviews */}
                            {merchant.ratings && merchant.ratings.length > 0 && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Customer Voices</CardTitle>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Real feedback from the Citywitty community.</p>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <ReviewsSection reviews={merchant.ratings} />
                                    </CardContent>
                                </Card>
                            )}

                            {/* FAQ */}
                            <FAQSection faqs={merchant.faqs ?? []} />

                            {/* Contact & Business Hours Grid */}
                            {/* <div className="grid gap-6 lg:grid-cols-2">
                                <ContactInformation merchant={merchant} ensureHttps={ensureHttps} />
                                <BusinessHoursSection
                                    merchant={merchant}
                                    isOpenAllWeek={isOpenAllWeek}
                                    orderedBusinessDays={orderedBusinessDays}
                                    openingTime={openingTime}
                                    closingTime={closingTime}
                                />
                            </div> */}

                            {/* Payment Methods */}
                            <PaymentMethodsSection paymentMethods={paymentMethods} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Merchants */}
            <SuggestedMerchantsNearYou />

            {/* Related Searches */}
            <RelatedSearches tags={merchant.tags ?? []} />

            <Footer />

            {/* Offline Purchase Modal */}
            <OfflinePurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => setIsPurchaseModalOpen(false)}
                merchantId={merchant._id}
                merchantSlug={params.merchantSlug}
            />
        </>
    );
}