'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Merchant } from '../types';

interface OfflineDiscountsSectionProps {
    merchant: Merchant;
    isOfferExpired: (validUpto: Date | string) => boolean;
}

export const OfflineDiscountsSection: React.FC<OfflineDiscountsSectionProps> = ({
    merchant,
    isOfferExpired
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const OFFERS_PER_VIEW = 2;

    const allOffers = merchant.offlineDiscount || [];

    // Debug: Log offers data
    console.log('Merchant offlineDiscount:', allOffers);
    console.log('Offers length:', allOffers.length);

    if (!allOffers || allOffers.length === 0) {
        console.log('No offers to display - returning null');
        return null;
    }

    const totalPages = Math.ceil(allOffers.length / OFFERS_PER_VIEW);

    useEffect(() => {
        if (totalPages <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % totalPages);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalPages]);

    const startIdx = currentIndex * OFFERS_PER_VIEW;
    const visibleOffers = allOffers.slice(startIdx, startIdx + OFFERS_PER_VIEW);

    return (
        <Card className="border-0 bg-white shadow-xl ring-1 ring-slate-200/60">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">Exclusive Deals</CardTitle>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">Limited-time savings that maximize your wallet.</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {visibleOffers.map((offer, index) => {
                            const expired = isOfferExpired(offer.validUpto);
                            // Calculate discount percentage from price comparison
                            const calculateDiscountPercent = () => {
                                if (offer.discountPercent && offer.discountPercent > 0) {
                                    return offer.discountPercent;
                                }
                                // Calculate from originalPrice and discountValue
                                if (offer.originalPrice && offer.originalPrice > 0 && offer.discountValue) {
                                    return Math.round((offer.discountValue / offer.originalPrice) * 100);
                                }
                                // Fallback: use discountValue as the display value
                                return offer.discountValue || 0;
                            };
                            const displayDiscountPercent = calculateDiscountPercent();
                            return (
                                <div
                                    key={startIdx + index}
                                    className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${expired
                                        ? 'border-slate-200 bg-slate-50 shadow-md opacity-60'
                                        : 'border-slate-200 bg-white shadow-md'
                                        }`}
                                >
                                    {expired && <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-500/10 pointer-events-none"></div>}
                                    <div className={`flex flex-col h-full ${expired ? 'relative z-10' : ''}`}>
                                        <div className="flex flex-col gap-5 p-6 flex-1">
                                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                                <span className={`rounded-full px-3 py-1 ${expired
                                                    ? 'bg-slate-200 text-slate-600'
                                                    : 'bg-indigo-50 text-indigo-600'
                                                    }`}>
                                                    {offer.category}
                                                </span>
                                                <span className={`rounded-full px-3 py-1 ${expired
                                                    ? 'bg-red-500/10 text-red-600'
                                                    : 'bg-emerald-500/10 text-emerald-600'
                                                    }`}>
                                                    {expired ? 'Expired' : offer.status}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className={`text-lg font-semibold ${expired ? 'text-slate-600' : 'text-slate-900'}`}>
                                                    {offer.offerTitle}
                                                </h4>
                                                <p className={`text-sm leading-5 ${expired ? 'text-slate-500' : 'text-slate-600'}`}>
                                                    {offer.offerDescription}
                                                </p>
                                            </div>
                                            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${expired ? 'text-slate-400' : 'text-slate-500'}`}>
                                                {offer.discountValue > 0 && (
                                                    <span className={`rounded-full px-3 py-1 ${expired ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                                        Save ₹{offer.discountValue}
                                                    </span>
                                                )}
                                                <span className={`rounded-full px-3 py-1 ${expired ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                                    In-store redemption
                                                </span>
                                            </div>
                                            <div className={`text-xs mt-auto ${expired ? 'text-slate-500' : 'text-slate-500'}`}>
                                                Show this ticket at checkout to redeem your discount.
                                            </div>
                                        </div>
                                        <div className={`relative flex shrink-0 flex-col items-center justify-center gap-2 px-4 py-6 text-white border-t ${expired
                                            ? 'bg-gradient-to-br from-slate-400 via-slate-400 to-slate-400 border-slate-300 text-slate-600'
                                            : 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-500 border-white/10'
                                            }`}>
                                            <div className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${expired ? 'text-slate-500/80' : 'text-indigo-100/80'
                                                }`}>
                                                Save
                                            </div>
                                            <div className="flex items-end gap-1 text-2xl font-bold leading-none">
                                                <span>{displayDiscountPercent || 0}</span>
                                                <span className="text-lg font-semibold">%</span>
                                            </div>
                                            {offer.discountValue > 0 && (
                                                <div className={`text-xs font-semibold ${expired ? 'text-slate-500/80' : 'text-indigo-100/80'}`}>
                                                    Up to ₹{offer.discountValue}
                                                </div>
                                            )}
                                            <div className={`text-xs text-center mt-1 ${expired ? 'text-slate-500/80' : 'text-indigo-100/80'}`}>
                                                {expired ? 'Expired: ' : 'Valid until '}{new Date(offer.validUpto).toLocaleDateString('en-IN')}
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -left-4 top-1/3 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-dashed ${expired
                                            ? 'border-slate-300 bg-slate-200'
                                            : 'border-slate-200 bg-slate-100'
                                            } sm:block`}
                                    ></span>
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -right-4 top-1/3 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-dashed ${expired
                                            ? 'border-slate-300 bg-slate-200'
                                            : 'border-slate-200 bg-slate-100'
                                            } sm:block`}
                                    ></span>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to page ${idx + 1}`}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'bg-indigo-600 w-7'
                                        : 'bg-slate-300 w-2.5 hover:bg-slate-400'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};