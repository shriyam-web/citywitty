'use client';

import React, { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Star, Phone, Mail, Globe, Clock, CreditCard, Shield, Award, CheckCircle, Zap, Users, Heart, Share2, MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ReviewsSection } from '@/components/merchant/ReviewsSection';
import { BranchLocationsMap } from '@/components/merchant/BranchLocationsMap';
import { SuggestedMerchantsNearYou } from '@/components/merchant/SuggestedMerchantsNearYou';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface Merchant {
    _id: string;
    merchantSlug?: string;
    displayName: string;
    category: string;
    city: string;
    streetAddress: string;
    description: string;
    logo?: string;
    storeImages?: string[];
    averageRating?: number;
    ratings?: {
        userId: string;
        user: string;
        rating: number;
        review?: string;
        reply?: string;
        createdAt?: Date;
    }[];
    phone: string;
    email: string;
    website?: string;
    whatsapp: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        twitter?: string;
        linkedin?: string;
    };
    businessHours?: {
        open?: string;
        close?: string;
        days?: string[];
    };
    paymentMethodAccepted?: string[];
    offlineDiscount?: {
        category: string;
        offerTitle: string;
        offerDescription: string;
        discountValue: number;
        discountPercent: number;
        status: "Active" | "Inactive";
        validUpto: Date;
    }[];
    customOffer?: string;
    ribbonTag?: string;
    tags?: string[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    joinedSince?: string;
    mapLocation?: string;
    latitude?: number;
    longitude?: number;
    citywittyAssured?: boolean;
    premiumSeller?: boolean;
    verified?: boolean;
    trust?: boolean;
    topRated?: boolean;
    branchLocations?: {
        branchName: string;
        city: string;
        streetAddress: string;
        pincode: string;
        locality: string;
        state: string;
        country: string;
        mapLocation: string;
        latitude: number;
        longitude: number;
    }[];
    products?: {
        _id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        images: string[];
        isAvailable: boolean;
        tags: string[];
        variants?: {
            name: string;
            price: number;
            description: string;
        }[];
        faqs?: {
            question: string;
            answer: string;
        }[];
    }[];
}

export default function MerchantProfilePage({ params }: { params: { merchantSlug: string } }) {
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [distance, setDistance] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMerchant() {
            try {
                const response = await fetch(`/api/merchants/${params.merchantSlug}`);
                if (response.status === 404) {
                    notFound();
                }
                const data = await response.json();
                setMerchant(data);
            } catch (error) {
                console.error("Failed to fetch merchant:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMerchant();
    }, [params.merchantSlug]);

    useEffect(() => {
        if (navigator.geolocation && merchant?.latitude !== undefined && merchant?.longitude !== undefined) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setUserLocation({ lat: userLat, lng: userLng });
                    const dist = calculateDistance(userLat, userLng, merchant.latitude!, merchant.longitude!);
                    setDistance(dist);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, [merchant]);

    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;
        return dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(1)} km`;
    };

    const ensureHttps = (url: string | undefined): string => {
        if (!url) return '';
        // If URL already has a protocol, return it as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // Otherwise, prepend https://
        return `https://${url}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>Loading merchant details...</p>
                </div>
            </div>
        );
    }

    if (!merchant) {
        return notFound();
    }

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-16 pt-20 sm:pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                    {/* Hero Header */}
                    <div className="relative h-72 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden mb-4 sm:mb-6 md:mb-8  ">
                        {merchant.storeImages && merchant.storeImages.length > 0 && (
                            <img
                                src={merchant.storeImages[0]}
                                alt={merchant.displayName}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        {/* Top Right Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {merchant.verified && (
                                <Badge
                                    variant="default"
                                    className="relative bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 text-white font-bold text-xs px-3 py-1 whitespace-nowrap flex-shrink-0 border-0 transform hover:scale-105 transition-all duration-300"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse"></span>
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <CheckCircle className="w-3.5 h-3.5 text-cyan-200" />
                                        <span className="font-semibold tracking-wide">Verified</span>
                                    </span>
                                </Badge>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-wrap">
                                <img
                                    src={merchant.logo || "https://via.placeholder.com/100x100?text=No+Logo"}
                                    alt={merchant.displayName}
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg border-2 sm:border-4 border-white shadow-lg"
                                />
                                <div className="flex-1 min-w-0 max-w-full">
                                    {merchant.citywittyAssured && (
                                        <div className="mb-2">
                                            <Badge
                                                variant="default"
                                                className="text-white font-bold text-xs px-2 py-1 whitespace-nowrap flex-shrink-0 border-2 border-white transform hover:scale-105 transition-all duration-300"
                                            >
                                                <span className="flex items-center gap-1">
                                                    <ThumbsUp className="w-3 h-3 text-white fill-white" />
                                                    <span className="font-bold tracking-wide text-xs">CityWitty Assured</span>
                                                </span>
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mb-1 sm:mb-2 flex-wrap">
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">{merchant.displayName}</h1>
                                        {merchant.premiumSeller && (
                                            <Badge
                                                variant="default"
                                                className="relative bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 text-white font-bold text-xs px-2 py-1 shadow-2xl overflow-hidden group whitespace-nowrap flex-shrink-0 border-0 transform hover:scale-110 transition-all duration-500"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                                                <span className="absolute inset-0 bg-white/10 rounded-full"></span>
                                                <span className="relative z-10 flex items-center gap-1">
                                                    <Award className="w-3 h-3 text-yellow-300 animate-pulse" />
                                                    <span className="font-semibold tracking-wide text-xs">Premium</span>
                                                </span>
                                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></span>
                                                <span className="absolute inset-0 rounded-full border border-yellow-300/30 animate-spin" style={{ animationDuration: '8s' }}></span>
                                                <span className="absolute inset-0 shadow-inner rounded-full"></span>
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-lg sm:text-xl mb-3 sm:mb-4">{merchant.category}</p>
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="flex items-center space-x-1 text-sm sm:text-base">
                                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                            <span className="break-words">{merchant.city}, {merchant.streetAddress}</span>
                                            {distance && <span className="whitespace-nowrap">({distance} away)</span>}
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current flex-shrink-0" />
                                            <span className="font-medium text-sm sm:text-base">{merchant.averageRating?.toFixed(1) || "5"}</span>
                                        </div>
                                        {merchant.joinedSince && (
                                            <div className="flex items-center space-x-1 text-sm sm:text-base">
                                                <span>Joined {new Date(merchant.joinedSince).getFullYear()}</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            {/* About Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>About {merchant.displayName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed">{merchant.description}</p>
                                    {merchant.tags && merchant.tags.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="font-semibold mb-3 text-lg">Specialties</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {merchant.tags.map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="text-sm">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Offers Section */}
                            {merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Offers</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {merchant.offlineDiscount.map((offer, index) => (
                                                <div key={index} className="border rounded-lg p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50">
                                                    <h4 className="font-bold text-base sm:text-lg mb-2">{offer.offerTitle}</h4>
                                                    <p className="text-gray-600 mb-4">{offer.offerDescription}</p>
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                                        <Badge variant="destructive" className="text-sm sm:text-lg px-3 py-1">{offer.discountPercent}% OFF</Badge>
                                                        <span className="text-xs sm:text-sm text-gray-500">
                                                            Valid until {new Date(offer.validUpto).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Reviews Section */}
                            {merchant.ratings && merchant.ratings.length > 0 && (
                                <ReviewsSection reviews={merchant.ratings} />
                            )}

                            {/* FAQ Section */}
                            {merchant.faqs && merchant.faqs.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>FAQs</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {merchant.faqs.map((faq, index) => (
                                                <div key={index} className="text-sm">
                                                    <strong className="text-gray-800">{faq.question}</strong>
                                                    <p className="text-gray-600 mt-1">{faq.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Products Section */}
                            {merchant.products && merchant.products.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Our Products</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {merchant.products.map((product, index) => (
                                                <div key={index} className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                                    {product.images && product.images.length > 0 && (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                                                        />
                                                    )}
                                                    <h4 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2">{product.name}</h4>
                                                    <p className="text-gray-600 mb-4 leading-relaxed text-xs sm:text-sm md:text-base">{product.description}</p>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="font-bold text-xl sm:text-2xl text-green-600">₹{product.price}</span>
                                                        {!product.isAvailable && <Badge variant="secondary">Out of Stock</Badge>}
                                                    </div>
                                                    {product.tags && product.tags.length > 0 && (
                                                        <div className="mb-4">
                                                            <div className="flex flex-wrap gap-2">
                                                                {product.tags.map((tag, tagIndex) => (
                                                                    <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {product.variants && product.variants.length > 0 && (
                                                        <div className="mb-4">
                                                            <h5 className="font-semibold mb-2">Available Variants:</h5>
                                                            <ul className="space-y-1 text-sm text-gray-600">
                                                                {product.variants.map((variant, vIndex) => (
                                                                    <li key={vIndex} className="flex justify-between">
                                                                        <span className="font-medium">{variant.name}</span>
                                                                        <span>₹{variant.price}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {product.faqs && product.faqs.length > 0 && (
                                                        <div>
                                                            <h5 className="font-semibold mb-2">FAQs:</h5>
                                                            <div className="space-y-2">
                                                                {product.faqs.map((faq, fIndex) => (
                                                                    <div key={fIndex} className="text-sm">
                                                                        <strong className="text-gray-800">{faq.question}</strong>
                                                                        <p className="text-gray-600 mt-1">{faq.answer}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                            {/* Contact Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="h-5 w-5 text-gray-500" />
                                            <span>{merchant.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="h-5 w-5 text-gray-500" />
                                            <span>{merchant.email}</span>
                                        </div>
                                        {merchant.website && (
                                            <div className="flex items-center space-x-3 break-words max-w-full">
                                                <Globe className="h-5 w-5 text-gray-500" />
                                                <a href={ensureHttps(merchant.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all max-w-full truncate">
                                                    {merchant.website}
                                                </a>
                                            </div>
                                        )}
                                        {merchant.mapLocation && (
                                            <div className="flex items-center space-x-3 break-words max-w-full">
                                                <MapPin className="h-5 w-5 text-gray-500" />
                                                <a href={merchant.mapLocation} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all max-w-full truncate">
                                                    View on Map
                                                </a>
                                            </div>
                                        )}
                                        {merchant.socialLinks && (
                                            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
                                                {merchant.socialLinks.facebook && (
                                                    <a href={ensureHttps(merchant.socialLinks.facebook)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
                                                        <span>Facebook</span>
                                                    </a>
                                                )}
                                                {merchant.socialLinks.instagram && (
                                                    <a href={ensureHttps(merchant.socialLinks.instagram)} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" /></svg>
                                                        <span>Instagram</span>
                                                    </a>
                                                )}
                                                {merchant.socialLinks.youtube && (
                                                    <a href={ensureHttps(merchant.socialLinks.youtube)} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                        <span>YouTube</span>
                                                    </a>
                                                )}
                                                {merchant.socialLinks.twitter && (
                                                    <a href={ensureHttps(merchant.socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                                                        <span>Twitter</span>
                                                    </a>
                                                )}
                                                {merchant.socialLinks.linkedin && (
                                                    <a href={ensureHttps(merchant.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" /></svg>
                                                        <span>LinkedIn</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <Button className="w-full" asChild>
                                            <a href={`https://wa.me/${merchant.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                                Contact on WhatsApp
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Business Hours */}
                            {merchant.businessHours && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Business Hours</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Clock className="h-5 w-5 text-gray-500" />
                                            <span>{merchant.businessHours.open} - {merchant.businessHours.close}</span>
                                        </div>
                                        {merchant.businessHours.days && (
                                            <p className="text-sm text-gray-600">
                                                {merchant.businessHours.days.join(', ')}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Payment Methods */}
                            {merchant.paymentMethodAccepted && merchant.paymentMethodAccepted.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Methods</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-3">
                                            <CreditCard className="h-5 w-5 text-gray-500" />
                                            <div className="flex flex-wrap gap-2">
                                                {merchant.paymentMethodAccepted.map((method, index) => (
                                                    <Badge key={index} variant="outline">{method}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Branch Locations */}
                            {merchant.branchLocations && merchant.branchLocations.length > 0 && (
                                <BranchLocationsMap branches={merchant.branchLocations} />
                            )}
                        </div>
                    </div>

                    {/* Suggested Merchants Section */}
                    <SuggestedMerchantsNearYou />

                    {/* Back Button */}
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild>
                            <Link href="/merchants">Back to All Merchants</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
