"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  CreditCard,
  Sparkles,
  Zap,
  Gift,
} from "lucide-react";

const rotatingOffers = [
  { merchant: "Royal Palace Hotel", discount: "30% OFF", category: "Hotels" },
  { merchant: "Style Studio Salon", discount: "25% OFF", category: "Beauty" },
  { merchant: "Gadget Galaxy", discount: "20% OFF", category: "Electronics" },
  { merchant: "Fashion Forward", discount: "35% OFF", category: "Fashion" },
];

export function HeroSection() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentOffer((prev) => (prev + 1) % rotatingOffers.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-3000" />

      {/* Floating Icons */}
      <div className="absolute top-32 left-1/4 animate-bounce delay-1000">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Gift className="h-8 w-8 text-white/70" />
        </div>
      </div>
      <div className="absolute top-48 right-1/4 animate-bounce delay-2000">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Zap className="h-6 w-6 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-48 left-1/3 animate-bounce delay-3000">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Sparkles className="h-7 w-7 text-white/70" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <br />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-white">
            {/* <br /> */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/30">
                {" "}
                <Star className="h-4 w-4 text-yellow-400 mt-4 pt-4" />
                <span>India's #1 Premium Discount Platform</span>
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Unlock
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Exclusive
                </span>
                <span className="block">Savings</span>
              </h1>

              <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl leading-relaxed">
                Experience premium lifestyle at unbeatable prices. Get instant
                access to
                <span className="text-yellow-400 font-semibold">
                  {" "}
                  1000+ verified merchants{" "}
                </span>
                across India with your CityWitty card.
              </p>

              {/* Live Rotating Offers */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-300 font-medium">
                    LIVE OFFER
                  </span>
                </div>
                <div
                  className={`transition-all duration-300 ${isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-2"
                    }`}
                >
                  <p className="text-2xl font-bold text-white">
                    {rotatingOffers[currentOffer].discount}
                  </p>
                  <p className="text-blue-200">
                    at {rotatingOffers[currentOffer].merchant}
                  </p>
                  <p className="text-sm text-blue-300">
                    {rotatingOffers[currentOffer].category}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/get-card">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Get Your Card Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg backdrop-blur-sm text-dark"
                asChild
              >
                <Link href="/merchants" className=" text-green-900">
                  Explore Merchants
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  1000+
                </div>
                <div className="text-blue-200 text-sm">Premium Partners</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  20+
                </div>
                <div className="text-blue-200 text-sm">Major Cities</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  50K+
                </div>
                <div className="text-blue-200 text-sm">Happy Members</div>
              </div>
              <br />
            </div>
          </div>

          {/* Interactive 3D Card */}
          <div className="relative">
            <div className="relative group">
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 transform rotate-6 group-hover:rotate-3 transition-all duration-500 shadow-2xl border border-white/20">
                <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 space-y-6 transform group-hover:scale-105 transition-transform duration-300">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          CityWitty
                        </div>
                        <div className="text-sm text-gray-600">
                          Premium Card
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Valid Till</div>
                      <div className="font-bold text-gray-900">12/2025</div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 font-bold">ACTIVE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        Available Offers
                      </span>
                      <span className="text-emerald-600 font-bold">
                        UNLIMITED
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        Max Discount
                      </span>
                      <span className="text-orange-600 font-bold">
                        UP TO 50%
                      </span>
                    </div>
                  </div>

                  {/* Holographic Discount Badge */}
                  <div className="relative">
                    <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl p-4 text-white text-center transform group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="text-3xl font-bold">SAVE BIG</div>
                        <div className="text-sm opacity-90">
                          with every purchase
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chip Effect */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md flex items-center justify-center">
                      <div className="w-8 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-sm" />
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-gray-900">
                        **** **** **** 1234
                      </div>
                      <div className="text-xs text-gray-500">
                        PREMIUM MEMBER
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Benefits */}
              <div className="absolute -top-6 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold animate-bounce p-4">
                ✨ INSTANT ACTIVATION
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold animate-bounce delay-1000">
                🎯 LIFETIME VALIDITY
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
