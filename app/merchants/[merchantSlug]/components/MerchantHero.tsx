import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, CreditCard, Check, Clock, ChevronDown } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import type { Merchant } from '../types';

interface MerchantHeroProps {
    merchant: Merchant;
    distance: string | null;
    activeStatusBadges: Array<{
        key: keyof Pick<Merchant, "premiumSeller" | "verified" | "citywittyAssured" | "topRated">;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        activeClass: string;
    }>;
    onPurchaseClick: () => void;
}

export const MerchantHero: React.FC<MerchantHeroProps> = ({
    merchant,
    distance,
    activeStatusBadges,
    onPurchaseClick
}) => {
    const galleryImages = merchant.storeImages ?? [];
    const offerCount = React.useMemo(() => {
        if (!merchant.offlineDiscount || merchant.offlineDiscount.length === 0) return 0;
        const now = new Date();
        return merchant.offlineDiscount.filter(offer =>
            offer.status === "Active" &&
            new Date(offer.validUpto) >= now
        ).length;
    }, [merchant.offlineDiscount]);

    const formatMinutesToDisplay = React.useCallback((value: number) => {
        const normalizedValue = ((value % 1440) + 1440) % 1440;
        let hours = Math.floor(normalizedValue / 60);
        const minutes = normalizedValue % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
        return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }, []);

    const weeklyScheduleTooltip = React.useMemo(() => {
        const businessHours = merchant.businessHours;
        if (!businessHours?.open || !businessHours?.close) return null;

        const parseTimeToMinutes = (time: string) => {
            const trimmed = time.trim();
            const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
            if (!match) return null;
            let hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const meridiem = match[3]?.toUpperCase();
            if (meridiem === 'AM') {
                if (hours === 12) hours = 0;
            } else if (meridiem === 'PM') {
                if (hours !== 12) hours += 12;
            }
            if (hours >= 24 || minutes >= 60) return null;
            return hours * 60 + minutes;
        };

        const openMinutes = parseTimeToMinutes(businessHours.open);
        const closeMinutes = parseTimeToMinutes(businessHours.close);
        if (openMinutes === null || closeMinutes === null) return null;

        const openDisplay = formatMinutesToDisplay(openMinutes);
        const closeDisplay = formatMinutesToDisplay(closeMinutes);
        const days = businessHours.days ?? [];
        const normalizedDays = days.map((day) => day.toLowerCase());
        const operatesAllWeek = normalizedDays.length === 0;
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const isTwentyFourHours = closeMinutes === openMinutes;

        return (
            <div className="space-y-2 p-2">
                <div className="text-sm font-semibold border-b border-slate-200 pb-2">Business Hours</div>
                <div className="space-y-1">
                    {weekDays.map((day) => {
                        const isOpenDay = operatesAllWeek || normalizedDays.includes(day.toLowerCase());
                        return (
                            <div key={day} className="flex justify-between text-xs">
                                <span className={`font-medium ${isOpenDay ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {day}
                                </span>
                                <span className={`${isOpenDay ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                                    {isOpenDay ? (isTwentyFourHours ? '24 Hours' : `${openDisplay} - ${closeDisplay}`) : 'Closed'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }, [merchant.businessHours, formatMinutesToDisplay]);

    const availabilityBadge = React.useMemo(() => {
        const businessHours = merchant.businessHours;
        if (!businessHours?.open || !businessHours?.close) return null;
        const parseTimeToMinutes = (time: string) => {
            const trimmed = time.trim();
            const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
            if (!match) return null;
            let hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const meridiem = match[3]?.toUpperCase();
            if (meridiem === 'AM') {
                if (hours === 12) hours = 0;
            } else if (meridiem === 'PM') {
                if (hours !== 12) hours += 12;
            }
            if (hours >= 24 || minutes >= 60) return null;
            return hours * 60 + minutes;
        };
        const openMinutes = parseTimeToMinutes(businessHours.open);
        const closeMinutes = parseTimeToMinutes(businessHours.close);
        if (openMinutes === null || closeMinutes === null) return null;
        const openDisplay = formatMinutesToDisplay(openMinutes);
        const closeDisplay = formatMinutesToDisplay(closeMinutes);
        const days = businessHours.days ?? [];
        const normalizedDays = days.map((day) => day.toLowerCase());
        const now = new Date();
        const minutesNow = now.getHours() * 60 + now.getMinutes();
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayIndex = now.getDay();
        const today = weekDays[todayIndex].toLowerCase();
        const previousDay = weekDays[(todayIndex + 6) % 7].toLowerCase();
        const operatesAllWeek = normalizedDays.length === 0;
        const isOpenToday = operatesAllWeek || normalizedDays.includes(today);
        const wasOpenYesterday = operatesAllWeek || normalizedDays.includes(previousDay);
        const spansMidnight = closeMinutes < openMinutes;
        const isTwentyFourHours = closeMinutes === openMinutes;
        let isCurrentlyOpen = false;
        if (isTwentyFourHours) {
            isCurrentlyOpen = isOpenToday;
        } else if (spansMidnight) {
            if (minutesNow >= openMinutes) {
                isCurrentlyOpen = isOpenToday;
            } else {
                isCurrentlyOpen = wasOpenYesterday && minutesNow < closeMinutes;
            }
        } else {
            isCurrentlyOpen = isOpenToday && minutesNow >= openMinutes && minutesNow < closeMinutes;
        }
        if (isCurrentlyOpen) {
            if (isTwentyFourHours) {
                return {
                    label: `OPEN 24 HOURS`,
                    className: 'border-emerald-200 bg-emerald-500/10 text-emerald-600'
                };
            }
            return {
                label: `OPEN ${openDisplay} - ${closeDisplay}`,
                className: 'border-emerald-200 bg-emerald-500/10 text-emerald-600'
            };
        }
        if (isTwentyFourHours) {
            return {
                label: `CLOSED 24 HOURS`,
                className: 'border-rose-200 bg-rose-500/10 text-rose-600'
            };
        }
        return {
            label: `CLOSED. OPENS AT ${openDisplay}`,
            className: 'border-rose-200 bg-rose-500/10 text-rose-600'
        };
    }, [merchant.businessHours, formatMinutesToDisplay]);

    return (
        <div className="relative z-10 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_55px_-30px_rgba(15,23,42,0.25)]">
            <div className="relative h-40 w-full sm:h-52 lg:h-64">
                {galleryImages.length > 0 ? (
                    <img
                        src={galleryImages[0]}
                        alt={merchant.displayName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Citywitty Merchant
                    </div>
                )}
            </div>
            <div className="grid gap-2 p-3 sm:p-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div className="flex flex-col gap-2 sm:gap-2">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className="hidden h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:block sm:h-28 sm:w-28 lg:h-32 lg:w-32 flex-shrink-0">
                            <img
                                src={merchant.logo || "https://via.placeholder.com/120x120?text=No+Logo"}
                                alt={merchant.displayName}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <span className="rounded-full bg-white border border-slate-300 px-2 sm:px-2.5 py-0.5 text-slate-700 shadow-sm">{merchant.category}</span>
                                {merchant.ribbonTag && (
                                    <span className="rounded-full bg-indigo-600/10 px-2 sm:px-2.5 py-0.5 text-indigo-600">{merchant.ribbonTag}</span>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-2 sm:px-2.5 py-0.5 text-white shadow-sm">
                                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        {merchant.averageRating?.toFixed(1) || "5.0"}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600 normal-case">
                                        ({merchant.ratings?.length || 1} review{merchant.ratings && merchant.ratings.length !== 1 ? 's' : ''})
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight flex flex-wrap items-center gap-2">
                                {merchant.displayName}
                                {merchant.verified && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center justify-center rounded-full bg-blue-500 p-1 cursor-pointer hover:scale-110 transition-all duration-300">
                                                    <Check className="h-3 w-3 text-white font-bold" strokeWidth={3} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>Verified seller</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                                {availabilityBadge && weeklyScheduleTooltip && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all hover:shadow-md ${availabilityBadge.className.includes('emerald')
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                                                }`}>
                                                <Clock className="h-3 w-3" />
                                                {availabilityBadge.label}
                                                <ChevronDown className="h-3 w-3 opacity-70" />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent side="bottom" className="max-w-xs">
                                            {weeklyScheduleTooltip}
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </h1>
                            {merchant.customOffer ? (
                                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">{merchant.customOffer}</p>
                            ) : (
                                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
                                    Premium {merchant.category.toLowerCase()} experiences curated for Citywitty shoppers.
                                </p>
                            )}
                            {activeStatusBadges.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {activeStatusBadges.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div
                                                key={item.key}
                                                className={`${item.activeClass} flex items-center gap-1 sm:gap-1.5 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider shadow-sm`}
                                            >
                                                <IconComponent className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                                                <span>{item.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-200/50 bg-gradient-to-r from-blue-50/60 via-cyan-50/40 to-emerald-50/60 rounded-lg -mx-2 sm:-mx-3 px-2 sm:px-3">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Button asChild className="h-7 sm:h-8 rounded-full bg-emerald-500 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-emerald-600 whitespace-nowrap">
                                <a href={`https://wa.me/${merchant.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                    <SiWhatsapp className="mr-1 sm:mr-1.5 h-3 w-3" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                    <span className="sm:hidden">Chat</span>
                                </a>
                            </Button>
                            <Button asChild className="h-7 sm:h-8 rounded-full bg-blue-600 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-blue-700 whitespace-nowrap">
                                <a href={merchant.mapLocation ? merchant.mapLocation : `tel:${merchant.phone}`} target={merchant.mapLocation ? "_blank" : undefined} rel={merchant.mapLocation ? "noopener noreferrer" : undefined}>
                                    <MapPin className="mr-1 sm:mr-1.5 h-3 w-3" />
                                    {merchant.mapLocation ? 'Directions' : 'Call'}
                                </a>
                            </Button>
                            <Button
                                className="h-7 sm:h-8 rounded-full bg-indigo-600 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-indigo-700 whitespace-nowrap"
                                onClick={onPurchaseClick}
                            >
                                <CreditCard className="mr-1 sm:mr-1.5 h-3 w-3" />
                                Made an offline Purchase
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1.5">
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Joined CityWitty</div>
                            <div className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900">
                                {merchant.joinedSince ? `${new Date(merchant.joinedSince).getFullYear()}` : 'Since 2020'}
                            </div>
                            <div className="text-xs text-slate-500">Merchant Community</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1.5">
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Distance</div>
                            <div className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900">
                                {distance || 'Nearby'}
                            </div>
                            <div className="text-xs text-slate-500">From you</div>
                        </div>
                    </div>
                    {offerCount > 0 && (
                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 via-red-800 to-red-900 px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-500 hover:scale-[1.02] border-2 border-red-500/50">
                            {/* Animated Fire Background Blobs */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -top-10 -right-10 h-40 w-40 bg-red-600/50 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 bg-red-700/40 rounded-full blur-2xl animate-pulse animation-delay-1s"></div>
                                <div className="absolute -bottom-10 -left-10 h-36 w-36 bg-red-800/50 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
                            </div>

                            {/* Shine Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <div className="relative z-10 space-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-red-100 animate-pulse">
                                            🔥 Hot Deals
                                        </div>
                                    </div>
                                    <div className="animate-ping-slow">
                                        <span className="text-xl">🔥</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-red-200 animate-gradient-x">
                                        {offerCount}
                                    </div>
                                    <div className="text-xs font-semibold text-red-100">
                                        Exclusive {offerCount === 1 ? 'Offer' : 'Offers'} Available
                                    </div>
                                </div>
                                <div className="text-[10px] font-medium text-red-200/80">
                                    Limited time only!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};