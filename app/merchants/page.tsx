'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Filter } from 'lucide-react';
// import type { Metadata } from 'next';
import Script from "next/script";
// export const metadata: Metadata = {
//   title: "Partner Merchants - CityWitty | Hotels, Restaurants, Salons & More",
//   description:
//     "Explore verified partner merchants on CityWitty across hotels, restaurants, salons, fashion, electronics, and more. Discover amazing deals and discounts in top cities of India.",
//   keywords: [
//     "CityWitty merchants",
//     "partner stores",
//     "hotel deals",
//     "restaurant discounts",
//     "salon offers",
//     "fashion shopping",
//     "electronics discounts",
//     "Mumbai merchants",
//     "Delhi merchants",
//     "Bangalore merchants",
//     "Chennai merchants",
//     "Pune merchants"
//   ],
//   alternates: {
//     canonical: "https://citywitty.com/merchants",
//   },
//   openGraph: {
//     title: "Partner Merchants - CityWitty",
//     description:
//       "Browse trusted partner merchants on CityWitty and grab exclusive offers across India.",
//     url: "https://citywitty.com/merchants",
//     siteName: "CityWitty",
//     images: [
//       {
//         url: "https://citywitty.com/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "CityWitty Partner Merchants",
//       },
//     ],
//     locale: "en_IN",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Partner Merchants - CityWitty",
//     description:
//       "Discover verified partner merchants on CityWitty and save big on hotels, restaurants, fashion, and more.",
//     images: ["https://citywitty.com/og-image.png"],
//   },
// };

const merchants = [
  {
    id: 1,
    name: 'Royal Palace Hotel',
    category: 'Hotels',
    city: 'Mumbai',
    description: 'Luxury accommodation in the heart of Mumbai with world-class amenities and exceptional service.',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    discount: '30% OFF',
    reviews: 1245
  },
  {
    id: 2,
    name: 'Style Studio Salon',
    category: 'Salon & Spa',
    city: 'Delhi',
    description: 'Premium beauty and wellness services with expert professionals and modern facilities.',
    image: 'https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    discount: '25% OFF',
    reviews: 856
  },
  {
    id: 3,
    name: 'Gadget Galaxy',
    category: 'Electronics',
    city: 'Bangalore',
    description: 'Latest electronics and gadgets at unbeatable prices with genuine warranty.',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    discount: '20% OFF',
    reviews: 2130
  },
  {
    id: 4,
    name: 'Fashion Forward',
    category: 'Fashion',
    city: 'Chennai',
    description: 'Trendy clothing and accessories from top brands at discounted prices.',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    discount: '35% OFF',
    reviews: 934
  },
  {
    id: 5,
    name: 'Gourmet Delights',
    category: 'Restaurants',
    city: 'Pune',
    description: 'Fine dining experience with authentic cuisine and exceptional ambiance.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    discount: '20% OFF',
    reviews: 1876
  },
  {
    id: 6,
    name: 'Wellness Spa Resort',
    category: 'Salon & Spa',
    city: 'Mumbai',
    description: 'Rejuvenating spa treatments and wellness services in a serene environment.',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    discount: '40% OFF',
    reviews: 567
  }
];

const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'];
const categories = ['All Categories', 'Hotels', 'Salon & Spa', 'Electronics', 'Fashion', 'Restaurants'];

export default function MerchantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All Cities' || merchant.city === selectedCity;
    const matchesCategory = selectedCategory === 'All Categories' || merchant.category === selectedCategory;

    return matchesSearch && matchesCity && matchesCategory;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CityWitty Partner Merchants",
    description:
      "Discover verified partner merchants across multiple categories like hotels, restaurants, fashion, salons, and electronics on CityWitty.",
    url: "https://citywitty.com/merchants",
    publisher: {
      "@type": "Organization",
      name: "CityWitty",
      url: "https://citywitty.com",
      logo: {
        "@type": "ImageObject",
        url: "https://citywitty.com/logo.png"
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@citywitty.com",
        telephone: "+91-9876543210"
      }
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: "https://citywitty.com/merchants/1",
          name: "Royal Palace Hotel - Mumbai"
        },
        {
          "@type": "ListItem",
          position: 2,
          url: "https://citywitty.com/merchants/2",
          name: "Style Studio Salon - Delhi"
        },
        {
          "@type": "ListItem",
          position: 3,
          url: "https://citywitty.com/merchants/3",
          name: "Gadget Galaxy - Bangalore"
        },
        {
          "@type": "ListItem",
          position: 4,
          url: "https://citywitty.com/merchants/4",
          name: "Fashion Forward - Chennai"
        },
        {
          "@type": "ListItem",
          position: 5,
          url: "https://citywitty.com/merchants/5",
          name: "Gourmet Delights - Pune"
        },
        {
          "@type": "ListItem",
          position: 6,
          url: "https://citywitty.com/merchants/6",
          name: "Wellness Spa Resort - Mumbai"
        }
      ]
    }
  };
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Partner Merchants
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals from our verified merchant partners across various categories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search merchants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              <span>{filteredMerchants.length} merchants found</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('All Cities');
                setSelectedCategory('All Categories');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Merchants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMerchants.map((merchant) => (
            <Card key={merchant.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={merchant.image}
                    alt={merchant.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {merchant.discount}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {merchant.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {merchant.name}
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
                      <span className="text-sm font-medium">{merchant.rating}</span>
                      <span className="text-xs text-gray-500">({merchant.reviews})</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No merchants found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}