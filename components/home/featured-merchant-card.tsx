import React, { useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Crown, CheckCircle, Building2, Utensils, Hotel, ShoppingBag, Scissors, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Merchant {
  _id: string;
  merchantSlug?: string;
  displayName: string;
  category: string;
  city: string;
  streetAddress?: string;
  description: string;
  logo?: string;
  averageRating?: number;
  offlineDiscount?: {
    originalPrice: number;
    discountValue: number;
    discountPercent: number;
  }[];
  customOffer?: string;
  citywittyAssured?: boolean;
  isPremiumSeller?: boolean;
  isVerified?: boolean;
}

const toTitleCase = (value?: string) => {
  if (!value) {
    return "";
  }
  return value.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};

const calculateDiscountPercent = (offer: { originalPrice: number; discountValue: number; discountPercent: number }) => {
  if (offer.discountPercent && offer.discountPercent > 0) {
    return offer.discountPercent;
  }
  if (offer.originalPrice && offer.originalPrice > 0 && offer.discountValue) {
    return Math.round((offer.discountValue / offer.originalPrice) * 100);
  }
  return offer.discountValue || 0;
};

function getCategoryIcon(category: string) {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('restaurant') || lowerCategory.includes('food') || lowerCategory.includes('cafe')) {
    return Utensils;
  }
  if (lowerCategory.includes('hotel') || lowerCategory.includes('resort') || lowerCategory.includes('stay')) {
    return Hotel;
  }
  if (lowerCategory.includes('shopping') || lowerCategory.includes('store') || lowerCategory.includes('mall')) {
    return ShoppingBag;
  }
  if (lowerCategory.includes('salon') || lowerCategory.includes('spa') || lowerCategory.includes('beauty')) {
    return Scissors;
  }
  if (lowerCategory.includes('entertainment') || lowerCategory.includes('game') || lowerCategory.includes('movie')) {
    return Gamepad2;
  }
  return Building2;
}

export function FeaturedMerchantCard({ merchant }: { merchant: Merchant }) {
  const [showFallback, setShowFallback] = useState(!merchant.logo);
  const Icon = getCategoryIcon(merchant.category);

  return (
    <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl">
      <CardContent className="p-0">
        <div className="relative">
          <div className="w-full h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {showFallback && (
              <Icon className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-slate-400" />
            )}
          </div>
          {merchant.logo && (
            <img
              src={merchant.logo}
              alt={merchant.displayName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setShowFallback(false)}
              onError={() => setShowFallback(true)}
            />
          )}
          {((merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && calculateDiscountPercent(merchant.offlineDiscount[0]) > 0) || merchant.customOffer) && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <span className="bg-orange-500 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
                {merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && calculateDiscountPercent(merchant.offlineDiscount[0]) > 0
                  ? `${calculateDiscountPercent(merchant.offlineDiscount[0])}% OFF`
                  : merchant.customOffer || ""}
              </span>
            </div>
          )}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
            <span className="bg-black/70 text-white px-2 py-1 rounded text-xs sm:text-sm">
              {merchant.category}
            </span>
          </div>
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 max-w-[60%]">
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
                <Crown className="h-3 w-3 mr-0.5" />
                Premium
              </Badge>
            )}
            {merchant.isVerified && (
              <Badge
                variant="default"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-[10px] px-1 py-0.5 shadow-lg"
              >
                <CheckCircle className="h-3 w-3 mr-0.5" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
              {toTitleCase(merchant.displayName)}
            </h3>
            {merchant.streetAddress && (
              <p className="text-gray-500 text-xs sm:text-sm">
                {toTitleCase(merchant.streetAddress)}
              </p>
            )}
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
              {merchant.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{toTitleCase(merchant.city)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
              <span className="text-xs sm:text-sm font-medium">{merchant.averageRating?.toFixed(1) || "5.0"}</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105" asChild>
            <Link href={merchant.merchantSlug ? `/merchants/${merchant.merchantSlug}` : '#'}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
