'use client';

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { MapPin, Star, Shield, Crown, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import { getCategoryIcon } from '@/lib/categoryIcons';

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

// Helper function to calculate discount percentage
const calculateDiscountPercent = (offer: { originalPrice: number; discountValue: number; discountPercent: number }) => {
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

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function FeaturedMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await fetch("/api/partners?all=true");
        const data = await response.json() as Merchant[];
        // Shuffle and limit to 12 featured merchants
        const shuffled = shuffleArray(data);
        const featured = shuffled.slice(0, 12);
        setMerchants(featured);
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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg mb-4 mx-auto w-64"></div>
            <div className="h-6 bg-gray-200 rounded mb-8 mx-auto w-96"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Featured Merchants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of premium merchants offering exceptional services and exclusive discounts across major cities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {merchants.map((merchant) => (
            <Card key={merchant._id} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {(() => {
                      const Icon = getCategoryIcon(merchant.category);
                      return <Icon className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-slate-400" />;
                    })()}
                  </div>
                  {merchant.logo && (
                    <img
                      src={merchant.logo}
                      alt={merchant.displayName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ display: 'none' }}
                      onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
            <Link href="/merchants">
              Explore All Merchants
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
