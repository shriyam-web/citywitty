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
    originalPrice: number;
    discountValue: number;
    discountPercent: number;
  }[];
  customOffer?: string;
  citywittyAssured?: boolean;
  isPremiumSeller?: boolean;
  isVerified?: boolean;
}

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

export function FeaturedMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await fetch("/api/partners?all=true");
        const data = await response.json();
        setMerchants(data);
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Merchants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium merchants offering exceptional services and exclusive discounts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
          {merchants.map((merchant) => (
            <Card key={merchant._id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={merchant.logo || "https://via.placeholder.com/400x224?text=No+Image"}
                    alt={merchant.displayName}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex flex-wrap gap-1 max-w-[50%] sm:max-w-[60%] justify-end">
                    {merchant.citywittyAssured && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Assured
                      </Badge>
                    )}
                    {merchant.isPremiumSeller && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Premium
                      </Badge>
                    )}
                    {merchant.isVerified && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {merchant.displayName}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                      {merchant.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">{merchant.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm font-medium">{merchant.averageRating?.toFixed(1) || "5.0"}</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 transition-colors text-sm sm:text-base" asChild>
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
          <Button size="lg" variant="outline" asChild>
            <Link href="/merchants">
              View All Merchants
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
