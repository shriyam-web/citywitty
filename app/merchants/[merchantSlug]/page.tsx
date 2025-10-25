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
    OfflinePurchaseModal
} from './components';

export default function MerchantProfilePage({ params }: { params: { merchantSlug: string } }) {
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [distance, setDistance] = useState<string | null>(null);

    // Offline Purchase Modal State
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
                                <AboutSection
                                    merchant={merchant}
                                    descriptionParagraphs={merchant.description ? merchant.description.split('\n').filter(p => p.trim()) : []}
                                    aboutStats={[
                                        { label: (merchant.ratings?.length || 1).toString(), caption: 'Reviews' },
                                        { label: (merchant.averageRating ?? 5).toFixed(1), caption: 'Rating' },
                                        { label: (merchant.branchLocations?.length || 1).toString(), caption: 'Branches' }
                                    ]}
                                />
                                <OfflineDiscountsSection merchant={merchant} isOfferExpired={isOfferExpired} />
                                <ProductsSection products={merchant.products ?? []} />
                                <FAQSection faqs={merchant.faqs ?? []} />
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-8">
                                <ContactInformation merchant={merchant} ensureHttps={ensureHttps} />
                                {getBusinessHoursData() && (
                                    <BusinessHoursSection
                                        merchant={merchant}
                                        isOpenAllWeek={getBusinessHoursData()!.isOpenAllWeek}
                                        orderedBusinessDays={getBusinessHoursData()!.orderedBusinessDays}
                                        openingTime={getBusinessHoursData()!.openingTime}
                                        closingTime={getBusinessHoursData()!.closingTime}
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
            {merchant && (
                <OfflinePurchaseModal
                    isOpen={isPurchaseModalOpen}
                    onClose={() => setIsPurchaseModalOpen(false)}
                    merchantId={merchant._id}
                    merchantSlug={params.merchantSlug}
                />
            )}
        </>
    );
}
