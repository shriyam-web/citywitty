'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Mail, Globe, Clock, CreditCard, Shield, Award, Share2, MessageCircle, ThumbsUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface MerchantProductVariant {
    variantId?: string;
    name?: string;
    price?: number;
    stock?: number;
}

interface MerchantProductFAQ {
    question: string;
    answer: string;
    certifiedBuyer?: boolean;
    isLike?: boolean;
}

interface MerchantProduct {
    _id?: string;
    productId?: string;
    productName?: string;
    productImages?: string[];
    productDescription?: string;
    productCategory?: string;
    brand?: string;
    productHighlights?: string[];
    productVariants?: MerchantProductVariant[];
    originalPrice?: number;
    discountedPrice?: number;
    offerApplicable?: string;
    deliveryFee?: number;
    orderHandlingFee?: number;
    discountOfferedOnProduct?: number;
    deliverableLocations?: string[];
    eta?: string;
    faq?: MerchantProductFAQ[];
    instore?: boolean;
    cityWittyAssured?: boolean;
    isWalletCompatible?: boolean;
    cashbackPoints?: number;
    isPriority?: boolean;
    sponsored?: boolean;
    bestsellerBadge?: boolean;
    additionalInfo?: string;
    isReplacement?: boolean;
    replacementDays?: number;
    isAvailableStock?: boolean;
    availableStocks?: number;
}

interface Merchant {
    _id: string;
    merchantSlug?: string;
    displayName: string;
    category: string;
    city: string;
    streetAddress: string;
    description: string;
    logo?: string;
    storeImages?: string[];
    averageRating?: number;
    ratings?: {
        userId: string;
        user: string;
        rating: number;
        review?: string;
        reply?: string;
        createdAt?: Date;
    }[];
    phone: string;
    email: string;
    website?: string;
    whatsapp: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        twitter?: string;
        linkedin?: string;
    };
    businessHours?: {
        open?: string;
        close?: string;
        days?: string[];
    };
    paymentMethodAccepted?: string[];
    offlineDiscount?: {
        category: string;
        offerTitle: string;
        offerDescription: string;
        discountValue: number;
        discountPercent: number;
        status: "Active" | "Inactive";
        validUpto: Date;
    }[];
    customOffer?: string;
    ribbonTag?: string;
    tags?: string[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    joinedSince?: string;
    mapLocation?: string;
    latitude?: number;
    longitude?: number;
    citywittyAssured?: boolean;
    premiumSeller?: boolean;
    verified?: boolean;
    trust?: boolean;
    topRated?: boolean;
    branchLocations?: {
        branchName: string;
        city: string;
        streetAddress: string;
        pincode: string;
        locality: string;
        state: string;
        country: string;
        mapLocation: string;
        latitude: number;
        longitude: number;
    }[];
    products?: MerchantProduct[];
}

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
        // If URL already has a protocol, return it as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // Otherwise, prepend https://
        return `https://${url}`;
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

    const statusBadges: HighlightBadge[] = [
        {
            key: 'premiumSeller',
            label: 'Premium Seller',
            icon: Award,
            activeClass: 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-lg shadow-amber-500/30',
        },
        {
            key: 'verified',
            label: 'Verified',
            icon: Shield,
            activeClass: 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
        },
        {
            key: 'citywittyAssured',
            label: 'Assured',
            icon: ThumbsUp,
            activeClass: 'bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30',
        },
        {
            key: 'topRated',
            label: 'Top Merchant',
            icon: Star,
            activeClass: 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/30',
        }
    ];

    const activeStatusBadges = statusBadges.filter((badge) => Boolean(merchant[badge.key]));

    const galleryImages = merchant.storeImages ?? [];
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
    const formattedJoinedSince = joinedDate
        ? joinedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
        : 'Since 2020';
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
    const headquarters = merchant.streetAddress?.trim()
        ? `${merchant.streetAddress}, ${displayCity}`
        : displayCity;
    const snapshotItems = [
        merchant.category
            ? { icon: Award, label: 'Primary Category', value: merchant.category }
            : null,
        headquarters
            ? { icon: MapPin, label: 'Headquarters', value: headquarters }
            : null,
        formattedJoinedSince
            ? { icon: Clock, label: 'Joined Citywitty', value: formattedJoinedSince }
            : null,
    ].filter((item): item is { icon: LucideIcon; label: string; value: string } => Boolean(item));

    return (
        <>
            <Header />

            <div className="min-h-screen bg-slate-100 py-16 pt-24 sm:pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative mb-12">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute -top-16 left-6 h-40 w-40 rounded-full bg-indigo-300/25 blur-3xl"></div>
                            <div className="absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-sky-300/25 blur-3xl"></div>
                        </div>
                        <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_55px_-30px_rgba(15,23,42,0.25)]">
                            <div className="relative h-48 w-full sm:h-56 lg:h-60">
                                {galleryImages.length > 0 ? (
                                    <img
                                        src={galleryImages[0]}
                                        alt={merchant.displayName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                                        Citywitty Merchant
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                                <div className="flex flex-col gap-4 sm:gap-5">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="hidden h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:block sm:h-24 sm:w-24 lg:h-28 lg:w-28 flex-shrink-0">
                                            <img
                                                src={merchant.logo || "https://via.placeholder.com/120x120?text=No+Logo"}
                                                alt={merchant.displayName}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                                                <span className="rounded-full bg-slate-900/90 px-2 sm:px-3 py-1 text-white shadow-sm">{merchant.category}</span>
                                                {merchant.ribbonTag && (
                                                    <span className="rounded-full bg-indigo-600/10 px-2 sm:px-3 py-1 text-indigo-600">{merchant.ribbonTag}</span>
                                                )}
                                            </div>
                                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
                                                {merchant.displayName}
                                            </h1>
                                            {merchant.customOffer ? (
                                                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">{merchant.customOffer}</p>
                                            ) : (
                                                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
                                                    Premium {merchant.category.toLowerCase()} experiences curated for Citywitty shoppers.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-[13px] text-slate-500">
                                        <div className="flex items-center gap-2 rounded-full bg-slate-900/90 px-3 sm:px-4 py-1 text-white shadow-sm whitespace-nowrap">
                                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-300" />
                                            <span className="text-sm sm:text-[15px] font-semibold">{merchant.averageRating?.toFixed(1) || "5.0"}</span>
                                        </div>
                                        {distance && (
                                            <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap">
                                                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />
                                                <span className="font-medium text-xs sm:text-sm">{distance}</span>
                                            </div>
                                        )}
                                        {merchant.joinedSince && (
                                            <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap">
                                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />
                                                <span className="font-medium text-xs sm:text-sm">Since {new Date(merchant.joinedSince).getFullYear()}</span>
                                            </div>
                                        )}
                                    </div>
                                    {activeStatusBadges.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {activeStatusBadges.map((item) => (
                                                <div
                                                    key={item.key}
                                                    className={`${item.activeClass} flex items-center gap-1 sm:gap-2 rounded-full px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm`}
                                                >
                                                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    <span className="hidden sm:inline">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3">
                                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Established</div>
                                            <div className="mt-1 sm:mt-2 text-lg sm:text-xl font-semibold text-slate-900">
                                                {merchant.joinedSince ? `${new Date(merchant.joinedSince).getFullYear()}` : 'Since 2020'}
                                            </div>
                                            <div className="text-[11px] sm:text-xs text-slate-500">Years serving</div>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3">
                                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Distance</div>
                                            <div className="mt-1 sm:mt-2 text-lg sm:text-xl font-semibold text-slate-900">
                                                {distance || 'Nearby'}
                                            </div>
                                            <div className="text-[11px] sm:text-xs text-slate-500">From you</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                                        <Button asChild className="h-9 sm:h-10 rounded-full bg-emerald-500 px-4 sm:px-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white hover:bg-emerald-600 whitespace-nowrap">
                                            <a href={`https://wa.me/${merchant.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                <span className="hidden sm:inline">WhatsApp</span>
                                                <span className="sm:hidden">Chat</span>
                                            </a>
                                        </Button>
                                        <Button asChild variant="outline" className="h-9 sm:h-10 rounded-full border border-slate-300 bg-white px-4 sm:px-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 hover:bg-slate-100 whitespace-nowrap">
                                            <a href={merchant.mapLocation ? merchant.mapLocation : `tel:${merchant.phone}`} target={merchant.mapLocation ? "_blank" : undefined} rel={merchant.mapLocation ? "noopener noreferrer" : undefined}>
                                                <MapPin className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                {merchant.mapLocation ? 'Directions' : 'Call'}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            {/* About Section */}
                            <Card className="border border-slate-200 bg-white shadow-xl">
                                <CardHeader className="space-y-4">
                                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">About the merchant</p>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-900">Discover {merchant.displayName}</CardTitle>
                                    <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">{merchant.customOffer || 'A deeper look at what makes this merchant stand out.'}</p>
                                    {aboutStats.length > 0 && (
                                        <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-slate-700 pt-2">
                                            {aboutStats.map((stat, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <span className="text-lg sm:text-xl font-bold text-slate-900">{stat.label}</span>
                                                    <span className="text-xs font-medium text-slate-500">{stat.caption}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold text-slate-900">The Story</h3>
                                                {descriptionParagraphs.map((paragraph, index) => (
                                                    <p key={index} className="text-base leading-relaxed text-slate-700">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                                {descriptionParagraphs.length === 0 && (
                                                    <p className="text-base leading-relaxed text-slate-700">{descriptionCopy}</p>
                                                )}
                                            </div>
                                            {merchant.customOffer && (
                                                <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-5 py-4 text-indigo-900 shadow-sm">
                                                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">Exclusive Highlight</span>
                                                    <p className="mt-2 text-base font-semibold text-indigo-900">{merchant.customOffer}</p>
                                                </div>
                                            )}
                                            {merchant.tags && merchant.tags.length > 0 && (
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                        <span className="h-1 w-6 rounded-full bg-indigo-600"></span>
                                                        Specialties
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {merchant.tags.map((tag, index) => (
                                                            <span key={index} className="rounded-full border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-6">
                                            {snapshotItems.length > 0 && (
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-bold text-slate-900">Quick Info</h3>
                                                    <dl className="space-y-3">
                                                        {snapshotItems.map((item, index) => (
                                                            <div key={index} className="flex gap-3">
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 flex-shrink-0">
                                                                    <item.icon className="h-5 w-5" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{item.label}</dt>
                                                                    <dd className="text-sm font-bold text-slate-900">{item.value}</dd>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                            )}
                                            {paymentMethods.length > 0 && (
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-bold text-slate-900">Payment Methods</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {paymentMethods.map((method, index) => (
                                                            <span key={index} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
                                                                {method}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600 font-medium">Location</span>
                                                    <span className="font-bold text-slate-900">{displayCity}</span>
                                                </div>
                                                <div className="flex justify-between border-t border-slate-200 pt-2">
                                                    <span className="text-slate-600 font-medium">Joined</span>
                                                    <span className="font-bold text-slate-900">{formattedJoinedSince}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Offers Section */}
                            {merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Featured Offers</CardTitle>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Redeem these in-store savings before they expire.</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-5">
                                            {merchant.offlineDiscount.map((offer, index) => (
                                                <div
                                                    key={index}
                                                    className="relative isolate overflow-hidden rounded-[24px] border border-dashed border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
                                                >
                                                    <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-0 sm:items-stretch">
                                                        <div className="flex flex-col gap-5 p-6 sm:p-7">
                                                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">{offer.category}</span>
                                                                <span
                                                                    className={`rounded-full px-3 py-1 ${offer.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}
                                                                >
                                                                    {offer.status}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h4 className="text-xl font-semibold text-slate-900">{offer.offerTitle}</h4>
                                                                <p className="text-sm leading-6 text-slate-600">{offer.offerDescription}</p>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                                                                {offer.discountValue > 0 && (
                                                                    <span className="rounded-full bg-slate-100 px-3 py-1">Save ₹{offer.discountValue}</span>
                                                                )}
                                                                <span className="rounded-full bg-slate-100 px-3 py-1">In-store redemption</span>
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                Show this ticket at checkout to redeem your discount.
                                                            </div>
                                                        </div>
                                                        <div className="relative flex shrink-0 flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-500 px-6 py-8 text-white sm:border-l sm:border-dashed sm:border-white/30 sm:px-8">
                                                            <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-indigo-100/80">Save</div>
                                                            <div className="flex items-end gap-1 text-3xl font-bold leading-none">
                                                                <span>{offer.discountPercent}</span>
                                                                <span className="text-xl font-semibold">%</span>
                                                            </div>
                                                            {offer.discountValue > 0 && (
                                                                <div className="text-xs font-semibold text-indigo-100/80">
                                                                    Up to ₹{offer.discountValue}
                                                                </div>
                                                            )}
                                                            <div className="text-xs text-center text-indigo-100/80">
                                                                Valid until {new Date(offer.validUpto).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-dashed border-slate-200 bg-slate-100 sm:block"
                                                    ></span>
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute -right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-dashed border-slate-200 bg-slate-100 sm:block"
                                                    ></span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Reviews Section */}
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

                            {/* FAQ Section */}
                            {merchant.faqs && merchant.faqs.length > 0 && (
                                <Card className="border-0 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 shadow-xl ring-1 ring-slate-200/40">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Frequently Asked</CardTitle>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Quick answers that help you choose faster.</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            {merchant.faqs.map((faq, index) => (
                                                <div key={index} className="rounded-2xl border border-white/60 bg-white px-4 py-4 shadow-sm">
                                                    <div className="text-sm font-semibold text-slate-900">{faq.question}</div>
                                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Products Section */}
                            {merchant.products && merchant.products.length > 0 && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900">Signature Offerings</CardTitle>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Curated products that customers love the most.</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {merchant.products.map((product, index) => {
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
                                                const highlights = product.productHighlights ?? [];
                                                const variants = product.productVariants ?? [];
                                                const faqs = product.faq ?? [];
                                                const offerLabel = product.offerApplicable;
                                                const formatCurrency = (value?: number | null) => {
                                                    if (value === undefined || value === null) {
                                                        return null;
                                                    }
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
                                                                {product.cityWittyAssured && (
                                                                    <Badge className="absolute left-3 top-3 rounded-full bg-emerald-500/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-sm">
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
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    {product.productCategory && (
                                                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-500">
                                                                            {product.productCategory}
                                                                        </span>
                                                                    )}
                                                                    {product.brand && (
                                                                        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                                                                            {product.brand}
                                                                        </span>
                                                                    )}
                                                                    {offerLabel && (
                                                                        <Badge variant="secondary" className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700">
                                                                            {offerLabel}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <h4 className="text-lg font-semibold text-slate-900">
                                                                    {product.productName ?? `Product ${index + 1}`}
                                                                </h4>
                                                                <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
                                                                    {product.productDescription ?? product.additionalInfo ?? 'Detailed description coming soon.'}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                                {formattedDisplayPrice ? (
                                                                    <div className="flex items-end gap-2">
                                                                        <span className="text-2xl font-semibold text-indigo-600">₹{formattedDisplayPrice}</span>
                                                                        {hasDiscount && formattedOriginalPrice && (
                                                                            <span className="text-sm font-medium text-slate-400 line-through">₹{formattedOriginalPrice}</span>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-sm font-semibold text-slate-500">Contact for pricing</span>
                                                                )}
                                                                {highlights.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {highlights.slice(0, 2).map((highlight, highlightIndex) => (
                                                                            <span key={highlightIndex} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                                                                                {highlight}
                                                                            </span>
                                                                        ))}
                                                                        {highlights.length > 2 && (
                                                                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                                                                +{highlights.length - 2}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {variants.length > 0 && (
                                                                <div className="space-y-2 rounded-2xl bg-slate-50 px-3 py-2">
                                                                    <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">Variants</div>
                                                                    <div className="space-y-1 text-sm text-slate-600">
                                                                        {variants.map((variant, variantIndex) => (
                                                                            <div key={variantIndex} className="flex items-center justify-between">
                                                                                <span className="font-medium text-slate-700">{variant.name ?? `Variant ${variantIndex + 1}`}</span>
                                                                                {variant.price !== undefined && variant.price !== null && (
                                                                                    <span className="font-semibold text-slate-900">₹{formatCurrency(variant.price)}</span>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {faqs.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">FAQs</div>
                                                                    <div className="space-y-2">
                                                                        {faqs.slice(0, 2).map((faq, faqIndex) => (
                                                                            <div key={faqIndex} className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                                                                                <div className="font-semibold text-slate-800">{faq.question}</div>
                                                                                <p className="mt-1 text-slate-500">{faq.answer}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {(product.deliverableLocations && product.deliverableLocations.length > 0) || product.eta ? (
                                                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                                                                    {product.deliverableLocations && product.deliverableLocations.length > 0 && (
                                                                        <div>
                                                                            <span className="font-semibold text-slate-700">Deliverable to:</span>{' '}
                                                                            {product.deliverableLocations.slice(0, 3).join(', ')}
                                                                            {product.deliverableLocations.length > 3 && ` +${product.deliverableLocations.length - 3}`}
                                                                        </div>
                                                                    )}
                                                                    {product.eta && (
                                                                        <div className="mt-1 font-semibold text-slate-700">ETA: {product.eta}</div>
                                                                    )}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                            {/* Contact Info */}
                            <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                <CardHeader className="space-y-2">
                                    <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Connect Instantly</CardTitle>
                                    <p className="text-xs font-medium text-slate-500 sm:text-sm">Reach out through your preferred channel.</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4 sm:py-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-slate-600 font-medium truncate">{merchant.phone}</span>
                                            </div>
                                            <Button asChild size="sm" className="rounded-full bg-indigo-600 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-indigo-700 whitespace-nowrap flex-shrink-0">
                                                <a href={`tel:${merchant.phone}`}>Call</a>
                                            </Button>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4 sm:py-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-slate-600 font-medium truncate">{merchant.email}</span>
                                            </div>
                                            <Button asChild size="sm" variant="outline" className="rounded-full border-indigo-200 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 whitespace-nowrap flex-shrink-0">
                                                <a href={`mailto:${merchant.email}`}>Email</a>
                                            </Button>
                                        </div>
                                        {merchant.website && (
                                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4 sm:py-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                                                    <a href={ensureHttps(merchant.website)} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-indigo-600 hover:underline truncate">
                                                        {merchant.website}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {merchant.mapLocation && (
                                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4 sm:py-3">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                                                    <a href={merchant.mapLocation} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-indigo-600 hover:underline">
                                                        View on Map
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {merchant.socialLinks && (
                                            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-sm">
                                                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Social Presence</div>
                                                <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                                                    {merchant.socialLinks.facebook && (
                                                        <a href={ensureHttps(merchant.socialLinks.facebook)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-indigo-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
                                                            <span className="hidden sm:inline">Facebook</span>
                                                        </a>
                                                    )}
                                                    {merchant.socialLinks.instagram && (
                                                        <a href={ensureHttps(merchant.socialLinks.instagram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-rose-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 hover:bg-rose-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" /></svg>
                                                            <span className="hidden sm:inline">Instagram</span>
                                                        </a>
                                                    )}
                                                    {merchant.socialLinks.youtube && (
                                                        <a href={ensureHttps(merchant.socialLinks.youtube)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-red-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-600 hover:bg-red-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                            <span className="hidden sm:inline">YouTube</span>
                                                        </a>
                                                    )}
                                                    {merchant.socialLinks.twitter && (
                                                        <a href={ensureHttps(merchant.socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-sky-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 hover:bg-sky-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                                                            <span className="hidden sm:inline">Twitter</span>
                                                        </a>
                                                    )}
                                                    {merchant.socialLinks.linkedin && (
                                                        <a href={ensureHttps(merchant.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" /></svg>
                                                            <span className="hidden sm:inline">LinkedIn</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Button className="w-full rounded-full bg-indigo-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white hover:bg-indigo-700" asChild>
                                        <a href={`https://wa.me/${merchant.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                            Contact on WhatsApp
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Business Hours */}
                            {merchant.businessHours && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Business Hours</CardTitle>
                                        <p className="text-xs font-medium text-slate-500 sm:text-sm">Plan your visit with confidence.</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4 sm:space-y-5">
                                        {isOpenAllWeek ? (
                                            <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 p-4 sm:p-6 lg:p-7">
                                                <div className="absolute inset-y-0 right-0 hidden w-24 rounded-l-full bg-emerald-500/15 sm:block"></div>
                                                <div className="relative flex flex-col gap-3 sm:gap-4 text-emerald-700">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                        <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white/70 shadow-sm flex-shrink-0">
                                                            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </span>
                                                        <div>
                                                            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/80">Always On</div>
                                                            <div className="text-lg sm:text-2xl font-semibold text-emerald-700">Open All Days</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
                                                        <span className="rounded-full bg-white/80 px-2 sm:px-3 py-1 text-emerald-700">{openingTime} - {closingTime}</span>
                                                        <span className="rounded-full bg-white/80 px-2 sm:px-3 py-1 text-emerald-700">Every day</span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-emerald-600/90">Drop in any day you like&mdash;the team is ready to welcome you throughout the week.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                                                    <span className="text-sm sm:text-base font-semibold text-slate-900">{openingTime} - {closingTime}</span>
                                                </div>
                                                <div className="grid gap-2 text-xs sm:text-sm text-slate-600 sm:grid-cols-2">
                                                    {orderedBusinessDays.map((day) => (
                                                        <div
                                                            key={day}
                                                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3"
                                                        >
                                                            <span className="font-medium text-slate-700">{day}</span>
                                                            <span className="text-xs sm:text-sm font-medium text-slate-500">{openingTime} - {closingTime}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Payment Methods */}
                            {merchant.paymentMethodAccepted && merchant.paymentMethodAccepted.length > 0 && (
                                <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
                                    <CardHeader className="space-y-2">
                                        <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Payment Methods</CardTitle>
                                        <p className="text-xs font-medium text-slate-500 sm:text-sm">Multiple options to make transactions seamless.</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {merchant.paymentMethodAccepted.map((method, index) => (
                                                <span key={index} className="rounded-full bg-indigo-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Branch Locations */}
                            {merchant.branchLocations && merchant.branchLocations.length > 0 && (
                                <BranchLocationsMap branches={merchant.branchLocations} />
                            )}
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild>
                            <Link href="/merchants">Back to All Merchants</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Suggested Merchants Section - Full Width */}
            <SuggestedMerchantsNearYou />
            <Footer />
        </>
    );
}
