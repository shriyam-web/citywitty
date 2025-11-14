'use client';

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeaturedMerchantCard } from './featured-merchant-card';

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
            <FeaturedMerchantCard key={merchant._id} merchant={merchant} />
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
