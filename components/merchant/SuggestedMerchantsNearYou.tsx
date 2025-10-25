'use client';

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, Sparkles, ExternalLink } from 'lucide-react';
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
    const [logoColors, setLogoColors] = useState<Record<string, string>>({});
    const defaultLogoColor = '#0f172a';

    useEffect(() => {
        async function fetchMerchants() {
            try {
                const response = await fetch("/api/partners?all=true");
                const data = await response.json();
                setMerchants(data.slice(0, 10));
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

    const updateLogoColor = (merchantId: string, color: string) => {
        setLogoColors((prev) => {
            if (prev[merchantId] === color) {
                return prev;
            }
            return { ...prev, [merchantId]: color };
        });
    };

    const handleImageLoad = (image: HTMLImageElement, merchantId: string) => {
        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                updateLogoColor(merchantId, defaultLogoColor);
                return;
            }

            const width = Math.min(image.naturalWidth || 50, 60);
            const height = Math.min(image.naturalHeight || 50, 60);

            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);

            const { data } = context.getImageData(0, 0, width, height);
            let r = 0;
            let g = 0;
            let b = 0;
            let count = 0;

            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha < 200) {
                    continue;
                }
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count += 1;
            }

            if (count === 0) {
                updateLogoColor(merchantId, defaultLogoColor);
                return;
            }

            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            const lightenFactor = 0.2;
            r = Math.round(r + (255 - r) * lightenFactor);
            g = Math.round(g + (255 - g) * lightenFactor);
            b = Math.round(b + (255 - b) * lightenFactor);

            const color = `rgb(${r}, ${g}, ${b})`;
            updateLogoColor(merchantId, color);
        } catch (error) {
            updateLogoColor(merchantId, defaultLogoColor);
        }
    };

    const handleImageError = (merchantId: string) => {
        updateLogoColor(merchantId, defaultLogoColor);
    };

    const getVisibleMerchants = () => {
        const visibleCount = Math.min(merchants.length, 5);
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
        <section className="relative py-10 sm:py-12 lg:py-14 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>
            </div>
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
                <div className="text-center max-w-4xl mx-auto space-y-4">
                    <div className="inline-flex items-center justify-center">
                        <style>{`
                            @keyframes aiBadgePulse {
                                0%, 100% {
                                    transform: scale(0.94);
                                    opacity: 0.5;
                                }
                                50% {
                                    transform: scale(1.04);
                                    opacity: 0.85;
                                }
                            }
                            @keyframes aiBadgeShimmer {
                                0% {
                                    background-position: 0% 50%;
                                }
                                100% {
                                    background-position: 200% 50%;
                                }
                            }
                            @keyframes aiSparkleTwinkle {
                                0%, 100% {
                                    transform: scale(0.8);
                                    opacity: 0.6;
                                }
                                50% {
                                    transform: scale(1.1);
                                    opacity: 1;
                                }
                            }
                        `}</style>
                        <div className="relative inline-flex items-center justify-center">
                            <span className="absolute inset-[-6px] rounded-full bg-cyan-400/20 blur-lg animate-[aiBadgePulse_4.5s_ease-in-out_infinite]"></span>
                            <div className="relative flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 px-3 py-1 bg-slate-950/80 backdrop-blur-sm transition-all duration-200">
                                <span
                                    className="absolute inset-0 rounded-full opacity-70"
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(34,211,238,0.6), rgba(99,102,241,0.6), rgba(34,211,238,0.6))',
                                        backgroundSize: '200% 200%',
                                        animation: 'aiBadgeShimmer 7s linear infinite',
                                    }}
                                ></span>
                                <div className="relative flex items-center justify-center">
                                    <Sparkles className="mr-1 h-3 w-3 text-cyan-100 animate-[aiSparkleTwinkle_3s_ease-in-out_infinite]" />
                                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.55em] text-cyan-50">
                                        AI Suggest
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-white">
                        Suggested Merchants Near You
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                        Discover other great merchants in your area
                    </p>
                </div>

                <div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 overflow-hidden"
                >
                    {getVisibleMerchants().map((merchant, idx) => (
                        <div
                            key={merchant._id}
                            className="pt-6 animate-in fade-in slide-in-from-right-96 duration-700"
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
                                        <div
                                            className="flex h-20 sm:h-24 lg:h-28 w-full items-center justify-center overflow-hidden rounded-t-xl bg-slate-900 transition-colors duration-300"
                                            style={{ backgroundColor: logoColors[merchant._id] ?? defaultLogoColor }}
                                        >
                                            <img
                                                src={merchant.logo || "https://via.placeholder.com/300x150?text=No+Image"}
                                                alt={merchant.displayName}
                                                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                crossOrigin="anonymous"
                                                loading="lazy"
                                                onLoad={(event) => handleImageLoad(event.currentTarget, merchant._id)}
                                                onError={() => handleImageError(merchant._id)}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
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

                                    <div className="p-2 sm:p-2.5 space-y-1.5">
                                        <div>
                                            <h3 className="text-[11px] sm:text-sm font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
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

                                        <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-all duration-300 text-[11px] sm:text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:translate-y-0.5 active:translate-y-1 group" asChild>
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
