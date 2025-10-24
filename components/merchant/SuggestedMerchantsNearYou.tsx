'use client';

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Shield, Sparkles, ExternalLink } from 'lucide-react';
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        async function fetchMerchants() {
            try {
                const response = await fetch("/api/partners?all=true");
                const data = await response.json();
                setMerchants(data.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch merchants:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMerchants();
    }, []);

    useEffect(() => {
        if (isHovering || merchants.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % merchants.length);
        }, 5500);

        return () => clearInterval(interval);
    }, [isHovering, merchants.length]);

    const getVisibleMerchants = () => {
        const visibleCount = 3;
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            visible.push(merchants[(currentIndex + i) % merchants.length]);
        }
        return visible;
    };

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
        <section className="relative py-8 sm:py-10 lg:py-12 w-full px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>
            </div>
            <div className="relative w-full max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 group-hover:blur-xl animate-pulse group-hover:animate-none"></div>
                            <div className="relative px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-950 rounded-full border border-cyan-400/60 backdrop-blur-md hover:border-cyan-300/80 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-300 animate-spin" style={{ animationDuration: '3s' }} />
                                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                                        AI Suggest
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                        Suggested Merchants Near You
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                        Discover other great merchants in your area
                    </p>
                </div>

                <div 
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-hidden"
                >
                    {getVisibleMerchants().map((merchant, idx) => (
                        <div 
                            key={merchant._id} 
                            className="animate-in fade-in slide-in-from-right-96 duration-700"
                            style={{
                                animation: `slideIn 0.7s ease-out ${idx * 0.1}s both`
                            }}
                        >
                            <style>{`
                                @keyframes slideIn {
                                    from {
                                        opacity: 0;
                                        transform: translateX(400px);
                                    }
                                    to {
                                        opacity: 1;
                                        transform: translateX(0);
                                    }
                                }
                            `}</style>
                        <Card className="group overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-cyan-500/50 h-full">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img
                                        src={merchant.logo || "https://via.placeholder.com/300x150?text=No+Image"}
                                        alt={merchant.displayName}
                                        className="w-full h-24 sm:h-28 md:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2">
                                        {(merchant.offlineDiscount && merchant.offlineDiscount.length > 0 || merchant.customOffer) && (
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
                                                <span className="relative block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                                                    {merchant.offlineDiscount && merchant.offlineDiscount.length > 0
                                                        ? `${merchant.offlineDiscount[0].discountPercent}% OFF`
                                                        : merchant.customOffer || ""}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <span className="bg-slate-900/80 backdrop-blur border border-cyan-400/50 text-cyan-200 px-2 py-1 rounded-lg text-xs font-semibold">
                                            {merchant.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-3 space-y-2">
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
                                            {merchant.displayName}
                                        </h3>
                                        <p className="text-slate-400 text-[10px] sm:text-xs line-clamp-2">
                                            {merchant.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 text-slate-400">
                                            <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-400" />
                                            <span className="text-[10px] sm:text-xs">{merchant.city}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400 fill-current" />
                                            <span className="text-[10px] sm:text-xs font-medium text-white">{merchant.averageRating?.toFixed(1) || "N/A"}</span>
                                        </div>
                                    </div>

                                    <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-all duration-300 text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:translate-y-0.5 active:translate-y-1 group" asChild>
                                        <Link href={merchant.merchantSlug ? `/merchants/${merchant.merchantSlug}` : '#'} className="flex items-center justify-center gap-2">
                                            <span>View Details</span>
                                            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </section>
    );
}
