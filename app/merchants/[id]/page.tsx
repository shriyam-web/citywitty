'use client';

import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
// app/merchants/[id]/page.tsx
import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
//     description:
//         "Enjoy a luxurious stay at Luxe Hotels & Resorts, Mumbai. Get 25% OFF with CityWitty Discount Card. Fine dining, spa, swimming pool & world-class services.",
//     keywords:
//         "Luxe Hotels Mumbai, Hotels discount Mumbai, CityWitty hotel offers, Mumbai luxury stay, Luxe Resorts deal",
//     openGraph: {
//         title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
//         description:
//             "Book Luxe Hotels & Resorts in Mumbai with 25% OFF via CityWitty. Premium luxury stay, spa & fine dining included.",
//         url: "https://citywitty.com/merchants/1",
//         siteName: "CityWitty",
//         images: [
//             {
//                 url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
//                 width: 1200,
//                 height: 630,
//                 alt: "Luxe Hotels & Resorts - Mumbai",
//             },
//         ],
//         locale: "en_IN",
//         type: "website",
//     },
//     twitter: {
//         card: "summary_large_image",
//         site: "@citywitty",
//         title: "Luxe Hotels & Resorts - Mumbai | 25% OFF | CityWitty",
//         description:
//             "Book Luxe Hotels & Resorts in Mumbai with CityWitty and get 25% OFF. Luxury, spa & fine dining included.",
//         images: [
//             "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
//         ],
//     },
//     alternates: {
//         canonical: "https://citywitty.com/merchants/1",
//     },
// };

type RatingBreakdown = Record<1 | 2 | 3 | 4 | 5, number>;

const merchants = [
    {
        id: 1,
        name: "Luxe Hotels & Resorts",
        category: "Hotels",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
        discount: "25% OFF",
        rating: 4.8,
        city: "Mumbai",
        assured: true,
        description:
            "Enjoy a luxurious stay with premium facilities and world-class service at Luxe Hotels & Resorts. Located in the heart of Mumbai, this hotel offers stunning views, fine dining, and a serene spa experience.",
        facilities: ["Free Wi-Fi", "Swimming Pool", "Spa & Wellness", "Fine Dining", "Airport Shuttle"],
        openingHours: "Open 24 hours",
        contact: "+91 98765 43210",
        address: "Marine Drive, Mumbai, Maharashtra, India",
        reviews: [
            { user: "Rohit Sharma", comment: "Amazing stay! Rooms were spotless and service was exceptional.", rating: 5 },
            { user: "Neha Verma", comment: "Loved the food and ambiance. Definitely worth the price.", rating: 4.5 },
            { user: "Vikram Singh", comment: "Great location and staff. Will visit again.", rating: 5 },
            { user: "Aditi Mehra", comment: "Spa services were excellent. Highly recommend.", rating: 4.8 },
        ],
    },
    {
        id: 2,
        name: "TechZone Electronics",
        category: "Electronics",
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
        discount: "15% OFF",
        rating: 4.6,
        city: "Delhi",
        assured: false,
        description:
            "Latest gadgets and electronic devices at unbeatable prices. From smartphones to laptops, TechZone offers premium quality and genuine products.",
        facilities: ["Latest Gadgets", "Brand Warranty", "Easy Returns", "Home Delivery"],
        openingHours: "10 AM - 9 PM",
        contact: "+91 98123 45678",
        address: "Connaught Place, Delhi, India",
        reviews: [
            { user: "Ankit Malhotra", comment: "Got my new iPhone here, authentic and best price!", rating: 5 },
            { user: "Shreya Kapoor", comment: "Delivery was late but product was genuine.", rating: 4 },
            { user: "Rajesh Kumar", comment: "Staff is knowledgeable and helpful.", rating: 4.5 },
        ],
    },
    {
        id: 3,
        name: "Bliss Spa & Wellness",
        category: "Salon & Spa",
        image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800",
        discount: "30% OFF",
        rating: 4.9,
        city: "Bangalore",
        assured: true,
        description:
            "Relax and rejuvenate at Bliss Spa & Wellness. Our professional therapists provide a range of services including massages, facials, and wellness treatments.",
        facilities: ["Aromatherapy", "Steam & Sauna", "Skincare", "Massage Therapies"],
        openingHours: "9 AM - 10 PM",
        contact: "+91 99001 23456",
        address: "MG Road, Bangalore, India",
        reviews: [
            { user: "Priya Nair", comment: "The massage was heavenly, worth every penny!", rating: 5 },
            { user: "Akash Rao", comment: "Beautiful ambience and professional staff.", rating: 4.9 },
            { user: "Sneha Iyer", comment: "My go-to spa in Bangalore. Highly recommended!", rating: 5 },
        ],
    },
    {
        id: 4,
        name: "Fashion Forward",
        category: "Fashion",
        image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
        discount: "20% OFF",
        rating: 4.7,
        city: "Chennai",
        assured: false,
        description:
            "Trendy and stylish clothing collections for men, women, and kids. Fashion Forward ensures the latest designs at pocket-friendly prices.",
        facilities: ["Latest Collections", "Seasonal Discounts", "Personal Styling"],
        openingHours: "11 AM - 9 PM",
        contact: "+91 98765 78901",
        address: "T. Nagar, Chennai, India",
        reviews: [
            { user: "Deepika R", comment: "Got amazing dresses here, quality is great!", rating: 5 },
            { user: "Hari Krishnan", comment: "Trendy but a little expensive.", rating: 4 },
            { user: "Madhuri S", comment: "Variety is awesome, will shop again.", rating: 4.8 },
        ],
    },
    {
        id: 5,
        name: "Gourmet Delights",
        category: "Restaurants",
        image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800",
        discount: "35% OFF",
        rating: 4.8,
        city: "Pune",
        assured: true,
        description:
            "Savor delicious global cuisines crafted by top chefs. Gourmet Delights offers fine dining with a mix of Indian, Italian, and Continental dishes.",
        facilities: ["Fine Dining", "Outdoor Seating", "Live Music", "Bar"],
        openingHours: "12 PM - 12 AM",
        contact: "+91 98765 11223",
        address: "Koregaon Park, Pune, India",
        reviews: [
            { user: "Sahil Patil", comment: "Food was amazing and ambience was classy.", rating: 5 },
            { user: "Ananya Joshi", comment: "Loved the pasta and cocktails!", rating: 4.7 },
            { user: "Kiran Shah", comment: "Perfect place for a date night.", rating: 4.9 },
        ],
    },
];

export default function MerchantDetailPage({ params }: { params: { id: string } }) {
    const merchant = merchants.find((m) => m.id === Number(params.id));
    if (!merchant) return notFound();

    const getBreakdown = (): RatingBreakdown => {
        const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        merchant.reviews.forEach((r) => {
            const star = Math.floor(r.rating) as 1 | 2 | 3 | 4 | 5;
            breakdown[star] += 1;
        });
        return breakdown;
    };

    const breakdown = getBreakdown();
    const totalReviews = merchant.reviews.length;

    return (
        <>
            <Header /><Script
                id="jsonld-merchant"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "LocalBusiness",
                                "name": "Luxe Hotels & Resorts",
                                "image": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
                                "@id": "https://citywitty.com/merchants/1",
                                "url": "https://citywitty.com/merchants/1",
                                "telephone": "+91 98765 43210",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Marine Drive",
                                    "addressLocality": "Mumbai",
                                    "addressRegion": "Maharashtra",
                                    "addressCountry": "IN"
                                },
                                "priceRange": "$$",
                                "servesCuisine": "Multi-cuisine",
                                "openingHours": "Mo-Su 00:00-23:59",
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.8",
                                    "reviewCount": "4"
                                },
                                "review": [
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Rohit Sharma" },
                                        "reviewBody": "Amazing stay! Rooms were spotless and service was exceptional.",
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Neha Verma" },
                                        "reviewBody": "Loved the food and ambiance. Definitely worth the price.",
                                        "reviewRating": { "@type": "Rating", "ratingValue": "4.5" }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://citywitty.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Merchants",
                                        "item": "https://citywitty.com/merchants"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Luxe Hotels & Resorts",
                                        "item": "https://citywitty.com/merchants/1"
                                    }
                                ]
                            }
                        ]
                    }),
                }}
            /> <br /><br />
            <div className="container mx-auto py-12 px-4">
                <Card className="overflow-hidden shadow-lg">
                    <img src={merchant.image} alt={merchant.name} className="w-full h-80 object-cover" />
                    <CardContent className="p-6 space-y-8">
                        {/* Header section */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold flex items-center gap-2">
                                    {merchant.name}
                                    {merchant.assured && (
                                        <span className="ml-2 inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                            <ShieldCheck className="h-4 w-4 mr-1" />
                                            CityWitty Assured
                                        </span>
                                    )}
                                </h1>
                                <p className="text-gray-600">{merchant.category} • {merchant.city}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                <span className="font-medium">{merchant.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        {/* Discount & Description */}
                        <div>
                            <p className="text-lg font-medium text-green-600">{merchant.discount}</p>
                            <p className="text-gray-700 leading-relaxed mt-2">{merchant.description}</p>
                        </div>

                        {/* Facilities */}
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Facilities & Services</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {merchant.facilities.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Address */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{merchant.contact}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{merchant.openingHours}</span>
                            </div>
                            <div className="flex items-center space-x-3 sm:col-span-2">
                                <MapPin className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{merchant.address}</span>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Customer Ratings</h2>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = breakdown[star as 1 | 2 | 3 | 4 | 5];
                                    const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                    return (
                                        <div key={star} className="flex items-center space-x-3">
                                            <span className="w-6 text-sm font-medium">{star}★</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-yellow-400 h-3 rounded-full"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Customer Reviews */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                            <div className="space-y-4">
                                {merchant.reviews.map((review, i) => (
                                    <div key={i} className="border-b pb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900">{review.user}</span>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="text-sm">{review.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mt-1">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call-to-action */}
                        <Button className="w-full py-3 text-lg">Book / Claim Offer</Button>
                    </CardContent>

                </Card>
            </div>
            <Footer />
        </>
    );
}
