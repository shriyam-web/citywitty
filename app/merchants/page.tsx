import React from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Shield, Building2, Utensils, Hotel, ShoppingBag, Scissors, Gamepad2, Filter, SortAsc, Clock, CheckCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MerchantsStructuredData } from './merchants-structured-data';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { MerchantCardImage } from './merchant-card-image';

interface Merchant {
    _id: string;
    merchantSlug?: string;
    displayName: string;
    category: string;
    city: string;
    description: string;
    logo?: string;
    averageRating?: number;
    offlineDiscount?: {
        discountPercent: number;
    }[];
    customOffer?: string;
    citywittyAssured?: boolean;
    isPremiumSeller?: boolean;
    isVerified?: boolean;
    trust?: boolean;
    isOpen?: boolean;
    businessHours?: {
        open?: string;
        close?: string;
        days?: string[];
    };
}

// SEO Metadata for Merchants Listing Page
export const metadata: Metadata = {
    metadataBase: new URL('https://citywitty.com'),
    title: 'All Merchants - CityWitty | Premium Deals & Discounts',
    description: 'Browse all CityWitty partner merchants. Discover exclusive discounts on restaurants, hotels, shopping, salons, and entertainment across major cities in India.',
    keywords: 'merchants, local businesses, discount merchants, CityWitty partners, exclusive deals, city businesses',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    openGraph: {
        title: 'All Merchants - CityWitty',
        description: 'Discover premium merchants with exclusive CityWitty discounts',
        type: 'website',
        url: '/merchants',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    alternates: {
        canonical: '/merchants',
    },
};

async function fetchFilterOptions(): Promise<{ categories: string[], cities: string[] }> {
    try {
        await dbConnect();
        const categories = await Partner.distinct('category', { status: 'active' });
        const cities = await Partner.distinct('city', { status: 'active' });

        // Normalize cities to title case and remove duplicates
        const normalizedCities = cities
            .filter(Boolean)
            .map(city => city.trim())
            .filter(city => city.length > 0)
            .map(city => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())
            .filter((city, index, arr) => arr.indexOf(city) === index) // Remove duplicates
            .sort();

        return {
            categories: categories.filter(Boolean).sort(),
            cities: normalizedCities
        };
    } catch (error) {
        console.error('Error fetching filter options:', error);
        return { categories: [], cities: [] };
    }
}

async function fetchMerchantsForPage(filters: { category?: string, city?: string, minRating?: number, sortBy?: string, isOpen?: boolean, verified?: boolean, premium?: boolean } = {}): Promise<Merchant[]> {
    try {
        await dbConnect();
        const query: any = { status: 'active' };
        if (filters.category) query.category = filters.category;
        if (filters.city) query.city = new RegExp(`^${filters.city}$`, 'i'); // Case insensitive city match
        if (filters.minRating !== undefined && !isNaN(filters.minRating)) {
            query.$and = query.$and || [];
            query.$and.push(
                { averageRating: { $exists: true, $ne: null } },
                { averageRating: { $gte: filters.minRating } }
            );
        }
        if (filters.verified !== undefined) query.isVerified = filters.verified;
        if (filters.premium !== undefined) query.isPremiumSeller = filters.premium;

        // Note: Open/closed filtering will be done in JavaScript after fetching

        let sort: any = { isPremiumSeller: -1, isVerified: -1, averageRating: -1 };
        if (filters.sortBy === 'discount') {
            sort = { 'offlineDiscount.0.discountPercent': -1, isPremiumSeller: -1, isVerified: -1 };
        } else if (filters.sortBy === 'rating') {
            sort = { averageRating: -1, isPremiumSeller: -1, isVerified: -1 };
        } else if (filters.sortBy === 'newest') {
            sort = { createdAt: -1 };
        }

        let merchants = await Partner.find(query)
            .select('merchantSlug displayName category city description logo averageRating offlineDiscount customOffer citywittyAssured isPremiumSeller isVerified trust isOpen createdAt businessHours')
            .sort(sort)
            .limit(500)
            .lean() as unknown as (Merchant & { businessHours?: { open?: string, close?: string, days?: string[] } })[];

        // Filter by open/closed status if specified
        if (filters.isOpen !== undefined) {
            const now = new Date();
            const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTime = currentHour * 60 + currentMinute;

            merchants = merchants.filter(merchant => {
                const hours = merchant.businessHours;
                if (!hours || !hours.open || !hours.close) {
                    return !filters.isOpen; // If no hours set, consider closed
                }

                // Parse business hours (assuming format like "09:00" or "9:00")
                const openTime = hours.open.split(':').map(Number);
                const closeTime = hours.close.split(':').map(Number);
                const openMinutes = (openTime[0] || 0) * 60 + (openTime[1] || 0);
                const closeMinutes = (closeTime[0] || 0) * 60 + (closeTime[1] || 0);

                // Check if current day is in operating days
                const operatingDays = hours.days?.map(d => d.toLowerCase()) || [];
                const isOperatingDay = operatingDays.length === 0 || operatingDays.includes(currentDay);

                if (!isOperatingDay) {
                    return !filters.isOpen;
                }

                // Check if current time is within business hours
                const isOpen = currentTime >= openMinutes && currentTime <= closeMinutes;
                return isOpen === filters.isOpen;
            });
        }

        return merchants || [];
    } catch (error) {
        console.error('Error fetching merchants:', error);
        return [];
    }
}

const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('restaurant') || lowerCategory.includes('food') || lowerCategory.includes('cafe')) {
        return <Utensils className="h-16 w-16 text-gray-400" />;
    }
    if (lowerCategory.includes('hotel') || lowerCategory.includes('resort') || lowerCategory.includes('stay')) {
        return <Hotel className="h-16 w-16 text-gray-400" />;
    }
    if (lowerCategory.includes('shopping') || lowerCategory.includes('store') || lowerCategory.includes('mall')) {
        return <ShoppingBag className="h-16 w-16 text-gray-400" />;
    }
    if (lowerCategory.includes('salon') || lowerCategory.includes('spa') || lowerCategory.includes('beauty')) {
        return <Scissors className="h-16 w-16 text-gray-400" />;
    }
    if (lowerCategory.includes('entertainment') || lowerCategory.includes('game') || lowerCategory.includes('movie')) {
        return <Gamepad2 className="h-16 w-16 text-gray-400" />;
    }
    return <Building2 className="h-16 w-16 text-gray-400" />;
};

export default async function MerchantsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const category = typeof searchParams.category === 'string' && searchParams.category !== '' && searchParams.category !== 'all' ? searchParams.category : undefined;
    const city = typeof searchParams.city === 'string' && searchParams.city !== '' && searchParams.city !== 'all' ? searchParams.city : undefined;
    const minRating = typeof searchParams.minRating === 'string' && searchParams.minRating !== '' && searchParams.minRating !== 'all' ? parseFloat(searchParams.minRating) : undefined;
    const sortBy = typeof searchParams.sortBy === 'string' && searchParams.sortBy !== '' && searchParams.sortBy !== 'all' ? searchParams.sortBy : undefined;
    const isOpen = typeof searchParams.isOpen === 'string' && searchParams.isOpen !== '' && searchParams.isOpen !== 'all' ? searchParams.isOpen === 'true' : undefined;
    const verified = typeof searchParams.verified === 'string' && searchParams.verified !== '' && searchParams.verified !== 'all' ? searchParams.verified === 'true' : undefined;
    const premium = typeof searchParams.premium === 'string' && searchParams.premium !== '' && searchParams.premium !== 'all' ? searchParams.premium === 'true' : undefined;
    const filters = { category, city, minRating, sortBy, isOpen, verified, premium };

    const merchants = await fetchMerchantsForPage(filters);
    const { categories, cities } = await fetchFilterOptions();

    return (
        <>
            <Header />
            <MerchantsStructuredData merchantCount={merchants.length} />
            <div className="min-h-screen bg-gray-50 py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <Breadcrumb className="mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Merchants</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            All Merchants
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover all our premium merchants offering exceptional services and exclusive discounts
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            {merchants.length} merchants available
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Filter className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Filter & Sort Merchants</h3>
                        </div>
                        <form method="get" className="space-y-6">
                            {/* Primary Filters Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Building2 className="h-4 w-4 text-blue-600" />
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={category || 'all'}
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <MapPin className="h-4 w-4 text-green-600" />
                                        City
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={city || 'all'}
                                    >
                                        <option value="all">All Cities</option>
                                        {cities.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="minRating" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        Min Rating
                                    </label>
                                    <select
                                        id="minRating"
                                        name="minRating"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={minRating !== undefined ? minRating.toString() : 'all'}
                                    >
                                        <option value="all">Any Rating</option>
                                        <option value="4.5">Excellent (4.5+)</option>
                                        <option value="4.0">Very Good (4.0+)</option>
                                        <option value="3.5">Good (3.5+)</option>
                                        <option value="3.0">Average (3.0+)</option>
                                        <option value="2.5">Below Average (2.5+)</option>
                                        <option value="2.0">Poor (2.0+)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sortBy" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <SortAsc className="h-4 w-4 text-purple-600" />
                                        Sort By
                                    </label>
                                    <select
                                        id="sortBy"
                                        name="sortBy"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={sortBy || 'all'}
                                    >
                                        <option value="all">Default (Recommended)</option>
                                        <option value="discount">Highest Discount First</option>
                                        <option value="rating">Highest Rating First</option>
                                        <option value="newest">Recently Added</option>
                                    </select>
                                </div>
                            </div>

                            {/* Secondary Filters Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="isOpen" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Clock className="h-4 w-4 text-orange-600" />
                                        Operating Status
                                    </label>
                                    <select
                                        id="isOpen"
                                        name="isOpen"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={isOpen !== undefined ? isOpen.toString() : 'all'}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="true">🟢 Currently Open</option>
                                        <option value="false">🔴 Currently Closed</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="verified" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                        Verification
                                    </label>
                                    <select
                                        id="verified"
                                        name="verified"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={verified !== undefined ? verified.toString() : 'all'}
                                    >
                                        <option value="all">All Merchants</option>
                                        <option value="true">✅ Verified Only</option>
                                        <option value="false">Unverified Only</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="premium" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Crown className="h-4 w-4 text-yellow-600" />
                                        Seller Type
                                    </label>
                                    <select
                                        id="premium"
                                        name="premium"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        defaultValue={premium !== undefined ? premium.toString() : 'all'}
                                    >
                                        <option value="all">All Sellers</option>
                                        <option value="true">👑 Premium Sellers</option>
                                        <option value="false">Regular Sellers</option>
                                    </select>
                                </div>
                                <div className="flex items-end gap-3">
                                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Apply Filters
                                    </Button>
                                    <Link href="/merchants" className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all hover:shadow-md">
                                        Clear All
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    {merchants.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No merchants available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {merchants.map((merchant) => (
                                <Card key={merchant._id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <CardContent className="p-0">
                                        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                            <MerchantCardImage
                                                logo={merchant.logo}
                                                displayName={merchant.displayName}
                                                category={merchant.category}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {merchant.offlineDiscount && merchant.offlineDiscount.length > 0
                                                        ? `${merchant.offlineDiscount[0].discountPercent}% OFF`
                                                        : merchant.customOffer || "OFFER"}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                                                    {merchant.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 right-4 flex flex-wrap gap-1 max-w-[60%] justify-end">
                                                {merchant.citywittyAssured && (
                                                    <Badge
                                                        variant="default"
                                                        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-[10px] px-1 py-0.5 shadow-lg"
                                                    >
                                                        Assured
                                                    </Badge>
                                                )}
                                                {merchant.isPremiumSeller && (
                                                    <Badge
                                                        variant="default"
                                                        className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-[10px] px-1 py-0.5 shadow-lg"
                                                    >
                                                        Premium
                                                    </Badge>
                                                )}
                                                {merchant.isVerified && (
                                                    <Badge
                                                        variant="default"
                                                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-[10px] px-1 py-0.5 shadow-lg"
                                                    >
                                                        Verified
                                                    </Badge>
                                                )}
                                                {merchant.trust && (
                                                    <Badge
                                                        variant="default"
                                                        className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white text-[10px] px-1 py-0.5 shadow-lg"
                                                    >
                                                        <Shield className="h-3 w-3 mr-0.5" />
                                                        Trust
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {merchant.displayName}
                                                </h2>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {merchant.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-1 text-gray-600">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="text-sm">{merchant.city}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium">{merchant.averageRating?.toFixed(1) || "N/A"}</span>
                                                </div>
                                            </div>

                                            <Button className="w-full group-hover:bg-blue-600 transition-colors" asChild>
                                                <Link href={merchant.merchantSlug ? `/merchants/${merchant.merchantSlug}` : '#'}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}