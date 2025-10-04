'use client';

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Shield } from 'lucide-react';
import Link from 'next/link';

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
    premiumSeller?: boolean;
    verified?: boolean;
    trust?: boolean;
}

interface SuggestedMerchantsNearYouProps {
    city?: string;
    excludeId?: string;
}

export function SuggestedMerchantsNearYou({ city, excludeId }: SuggestedMerchantsNearYouProps = {}) {
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMerchants() {
            try {
                const response = await fetch("/api/partners?all=true");
                const data = await response.json();
                // Show all merchants, limit to 6 for display
                setMerchants(data.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch merchants:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMerchants();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>Loading merchants...</p>
                </div>
            </section>
        );
    }

    if (merchants.length === 0) {
        return null; // Don't show if no merchants
    }

    return (
        <section className="pt-10 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Suggested Merchants Near You
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover other great merchants in your area
                    </p>
                </div>

                <div className="grid grid-cols-6 gap-4 mb-8">
                    {merchants.slice(0, 6).map((merchant) => (
                        <Card key={merchant._id} className="col-span-1 group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img
                                        src={merchant.logo || "https://via.placeholder.com/300x150?text=No+Image"}
                                        alt={merchant.displayName}
                                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                            {merchant.offlineDiscount && merchant.offlineDiscount.length > 0
                                                ? `${merchant.offlineDiscount[0].discountPercent}% OFF`
                                                : merchant.customOffer || ""}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <span className="bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                                            {merchant.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 space-y-2">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {merchant.displayName}
                                        </h3>
                                        <p className="text-gray-600 text-xs line-clamp-2">
                                            {merchant.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <MapPin className="h-3 w-3" />
                                            <span className="text-xs">{merchant.city}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                            <span className="text-xs font-medium">{merchant.averageRating?.toFixed(1) || "N/A"}</span>
                                        </div>
                                    </div>

                                    <Button size="sm" className="w-full group-hover:bg-blue-600 transition-colors text-xs" asChild>
                                        <Link href={merchant.merchantSlug ? `/merchants/${merchant.merchantSlug}` : '#'}>
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
