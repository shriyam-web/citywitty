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

export function FeaturedMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await fetch("/api/partners");
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {merchants.map((merchant) => (
            <Card key={merchant._id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={merchant.logo || "https://via.placeholder.com/400x224?text=No+Image"}
                    alt={merchant.displayName}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {merchant.offlineDiscount && merchant.offlineDiscount.length > 0
                        ? `${merchant.offlineDiscount[0].discountPercent}% OFF`
                        : merchant.customOffer || ""}
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
                        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Assured
                      </Badge>
                    )}
                    {merchant.premiumSeller && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Premium
                      </Badge>
                    )}
                    {merchant.verified && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        Verified
                      </Badge>
                    )}
                    {merchant.trust && (
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white text-xs px-2 py-0.5 shadow-lg"
                      >
                        <Shield className="h-3 w-3 mr-0.5" />
                        Trust
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {merchant.displayName}
                    </h3>
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
