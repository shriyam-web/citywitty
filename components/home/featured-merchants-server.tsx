import React from "react";
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Shield, Building2, Utensils, Hotel, ShoppingBag, Scissors, Gamepad2, CheckCircle } from 'lucide-react';
import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';

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
    businessHours?: {
        open?: string;
        close?: string;
        days?: string[];
    };
}

const fetchFilterOptions = unstable_cache(
    async (): Promise<{ categories: string[], cities: string[] }> => {
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
    },
    ['filter-options'],
    { revalidate: 3600 } // Cache for 1 hour
);

const fetchFeaturedMerchants = async (): Promise<Merchant[]> => {
    try {
        await dbConnect();
        const merchants = await Partner.aggregate([
            { $match: { status: 'active' } },
            { $sample: { size: 6 } },
            {
                $project: {
                    merchantSlug: 1,
                    displayName: 1,
                    category: 1,
                    city: 1,
                    description: 1,
                    logo: 1,
                    averageRating: 1,
                    offlineDiscount: 1,
                    customOffer: 1,
                    citywittyAssured: 1,
                    isPremiumSeller: 1,
                    isVerified: 1,
                    trust: 1,
                    businessHours: 1
                }
            }
        ]).exec() as Merchant[];
        return merchants || [];
    } catch (error) {
        console.error('Error fetching featured merchants:', error);
        return [];
    }
};

const calculateDiscountPercent = (offer: { discountPercent?: number; discountValue?: number; originalPrice?: number }): number => {
    if (offer.discountPercent && offer.discountPercent > 0) {
        return offer.discountPercent;
    }
    if (offer.originalPrice && offer.originalPrice > 0 && offer.discountValue) {
        return Math.round((offer.discountValue / offer.originalPrice) * 100);
    }
    return offer.discountValue || 0;
};

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

const toTitleCase = (value?: string): string => {
    if (!value) return value ?? '';
    return value.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};

const getRandomDistance = (): string => {
    // Generate random distance between 0.5 and 15 km
    const distance = (Math.random() * 14.5 + 0.5).toFixed(1);
    return `${distance} Km away`;
};

export async function FeaturedMerchantsServer() {
    const merchants = await fetchFeaturedMerchants();
    const { categories, cities } = await fetchFilterOptions();

    if (merchants.length === 0) {
        return null;
    }

    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Featured Merchants
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover our premium partners offering exclusive deals and exceptional service
                    </p>
                </div>

                {/* Filters */}
                <div className="max-w-6xl mx-auto mb-12">
                    <form method="get" action="/merchants" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
                        <div className="min-w-[200px]">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-3 py-2 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" className="text-gray-900">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="text-gray-900">{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="min-w-[200px]">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
                            <select
                                id="city"
                                name="city"
                                className="w-full px-3 py-2 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" className="text-gray-900">All Cities</option>
                                {cities.map((c) => (
                                    <option key={c} value={c} className="text-gray-900">{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="min-w-[200px]">
                            <label htmlFor="verified" className="block text-sm font-medium text-gray-300 mb-1">Verification</label>
                            <select
                                id="verified"
                                name="verified"
                                className="w-full px-3 py-2 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" className="text-gray-900">All Merchants</option>
                                <option value="true" className="text-gray-900">Verified Only</option>
                            </select>
                        </div>
                        <div className="min-w-[200px]">
                            <label htmlFor="premium" className="block text-sm font-medium text-gray-300 mb-1">Seller Type</label>
                            <select
                                id="premium"
                                name="premium"
                                className="w-full px-3 py-2 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" className="text-gray-900">All Sellers</option>
                                <option value="true" className="text-gray-900">Premium Only</option>
                            </select>
                        </div>
                        <div className="min-w-[200px]">
                            <button type="submit" className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors">
                                Explore Merchants
                            </button>
                        </div>
                    </form>
                </div>

                {/* Merchants Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {merchants.map((merchant) => (
                        <Link
                            key={merchant._id}
                            href={merchant.merchantSlug ? `/merchants/${merchant.merchantSlug}` : '#'}
                            className="group"
                            aria-label={`Visit ${merchant.displayName}`}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
                                <CardContent className="p-0 h-full flex flex-col">
                                    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        {merchant.logo ? (
                                            <img
                                                src={merchant.logo}
                                                alt={`${merchant.displayName} - ${merchant.category}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        ) : null}
                                        <div
                                            className={`absolute inset-0 ${merchant.logo ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200`}
                                            style={merchant.logo ? { display: 'none' } : { display: 'flex' }}
                                        >
                                            {getCategoryIcon(merchant.category)}
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                        {/* Offer Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-gradient-to-br from-red-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm">
                                                {merchant.offlineDiscount && merchant.offlineDiscount.length > 0
                                                    ? `${calculateDiscountPercent(merchant.offlineDiscount[0])}% OFF`
                                                    : merchant.customOffer || "OFFER"}
                                            </span>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="bg-slate-900/90 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                                                {merchant.category}
                                            </span>
                                        </div>

                                        {/* Status Badges */}
                                        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 max-w-[45%] justify-end">
                                            {merchant.isPremiumSeller && (
                                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 shadow-md">
                                                    Premium
                                                </Badge>
                                            )}

                                            {merchant.citywittyAssured && (
                                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] px-1.5 py-0.5 shadow-md">
                                                    Assured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col space-y-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex items-center gap-2">
                                                {toTitleCase(merchant.displayName)}
                                                {merchant.isVerified && (
                                                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                                )}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                                                {merchant.description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                                <span className="text-xs font-medium">{getRandomDistance()}</span>
                                            </div>
                                            {merchant.averageRating && (
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current flex-shrink-0" />
                                                    <span className="text-xs font-semibold text-gray-900">{merchant.averageRating.toFixed(1)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link
                        href="/merchants"
                        className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        View All Merchants
                        <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}