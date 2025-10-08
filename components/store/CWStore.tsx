"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Header } from "../layout/header";
import { Footer } from "../layout/footer";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  merchantName: string;
  merchantSlug: string;
}

// Diwali Lamp Component
const DiwaliLamp: React.FC<{ delay: number }> = ({ delay }) => (
  <div
    className="absolute animate-pulse"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '2s'
    }}
  >
    <div className="text-yellow-400 text-2xl">🪔</div>
  </div>
);

// Floating Sparkle Component
const FloatingSparkle: React.FC<{ delay: number; left: string; top: string }> = ({ delay, left, top }) => (
  <div
    className="absolute text-yellow-300 animate-bounce"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    ✨
  </div>
);

// Firework Component
const Firework: React.FC<{ delay: number; left: string }> = ({ delay, left }) => (
  <div
    className="absolute animate-ping"
    style={{
      left,
      top: '20%',
      animationDelay: `${delay}s`,
      animationDuration: '4s'
    }}
  >
    <div className="text-red-500 text-xl">🎆</div>
  </div>
);

// Banner Slider Component
const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: "/banner1.jpg", // Replace with your banner image path
      title: "Diwali Special Offers",
      subtitle: "Up to 50% off on all products"
    },
    {
      id: 2,
      image: "/banner2.jpg", // Replace with your banner image path
      title: "Festive Collection",
      subtitle: "Exclusive Diwali merchandise"
    },
    {
      id: 3,
      image: "/banner3.jpg", // Replace with your banner image path
      title: "Premium Products",
      subtitle: "From trusted merchants"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden rounded-xl shadow-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e, #ffb627)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="text-white p-8 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-pulse">{banner.title}</h2>
              <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const CWStore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cloth" | "electronics">("cloth");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Trigger celebration animation on load
    setTimeout(() => setShowCelebration(true), 1000);
  }, []);

  // Static cloth products
  const clothProducts: Product[] = [
    {
      _id: "cloth001",
      name: "Designer Jeans",
      description: "Premium denim jeans with modern fit and style",
      price: 2999,
      category: "Clothing",
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"],
      merchantName: "Style Hub",
      merchantSlug: "style-hub"
    },
    {
      _id: "cloth002",
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt for everyday wear",
      price: 899,
      category: "Clothing",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"],
      merchantName: "Fashion Forward",
      merchantSlug: "fashion-forward"
    },
    {
      _id: "cloth003",
      name: "Banarasi Silk Saree",
      description: "Handwoven Banarasi silk saree with intricate designs",
      price: 2500,
      category: "Clothing",
      images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop"],
      merchantName: "Royal Sarees",
      merchantSlug: "royal-sarees"
    },
    {
      _id: "cloth004",
      name: "Cotton Saree",
      description: "Comfortable cotton saree for everyday wear",
      price: 800,
      category: "Clothing",
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      merchantName: "Royal Sarees",
      merchantSlug: "royal-sarees"
    }
  ];

  // Static electronics products
  const electronicsProducts: Product[] = [
    {
      _id: "elec001",
      name: "Wireless Bluetooth Headphones",
      description: "Premium wireless headphones with noise cancellation and 30-hour battery life",
      price: 2999,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"],
      merchantName: "TechHub Electronics",
      merchantSlug: "techhub-electronics"
    },
    {
      _id: "elec002",
      name: "Smartphone 128GB",
      description: "Latest smartphone with advanced camera and fast processor",
      price: 24999,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"],
      merchantName: "TechHub Electronics",
      merchantSlug: "techhub-electronics"
    }
  ];

  const currentProducts = activeTab === "cloth" ? clothProducts : electronicsProducts;

  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden cursor-pointer">
      {/* Diwali Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Diwali Lamps */}
        <DiwaliLamp delay={0} />
        <DiwaliLamp delay={1} />
        <DiwaliLamp delay={2} />
        <DiwaliLamp delay={3} />

        {/* Floating Sparkles */}
        <FloatingSparkle delay={0.5} left="10%" top="20%" />
        <FloatingSparkle delay={1.5} left="80%" top="30%" />
        <FloatingSparkle delay={2.5} left="60%" top="60%" />
        <FloatingSparkle delay={3.5} left="20%" top="70%" />
        <FloatingSparkle delay={4.5} left="90%" top="50%" />

        {/* Fireworks */}
        {showCelebration && (
          <>
            <Firework delay={0} left="15%" />
            <Firework delay={1} left="70%" />
            <Firework delay={2} left="45%" />
          </>
        )}

        {/* Diwali Rangoli Pattern */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-6xl opacity-10 animate-pulse">
          🪔✨🪔
        </div>
      </div>

      <Header />

      <div className="pt-20 pb-8 relative">
        {/* Left Ad Space */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 w-40 h-[28rem] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm font-medium z-10">
          Ad Space
        </div>

        {/* Right Ad Space */}
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-40 h-[28rem] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm font-medium z-10">
          Ad Space
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:mx-64">
          {/* Header with Diwali Animation */}
          <div className="mb-12">
            <div className="relative">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                CW Store
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover premium products from our trusted merchants
            </p>
          </div>

          {/* Banner Slider */}
          <BannerSlider />

          {/* Search Bar with Diwali Touch */}
          <div className="max-w-md mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-4 focus:ring-yellow-400 focus:border-orange-500 bg-white shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-orange-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Tabs with Diwali Styling */}
          <div className="flex justify-start mb-8">
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-2 rounded-xl shadow-lg border-2 border-orange-200">
              <button
                onClick={() => setActiveTab("cloth")}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${activeTab === "cloth"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse"
                  : "text-orange-700 hover:text-red-600 hover:bg-orange-50"
                  }`}
              >
                👗 Clothing & Fashion
              </button>
              <button
                onClick={() => setActiveTab("electronics")}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${activeTab === "electronics"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse"
                  : "text-orange-700 hover:text-red-600 hover:bg-orange-50"
                  }`}

              >
                📱 Electronics
              </button>
            </div>
          </div>

          {/* Products Grid with Diwali Effects */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-left">
              <div className="text-orange-400 mb-4 animate-bounce">
                <svg className="mx-0 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2 animate-pulse">No products found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product._id}
                  className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-orange-200 overflow-hidden relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Diwali Corner Decorations */}
                  <div className="absolute top-2 left-2 text-yellow-400 animate-pulse">✨</div>
                  <div className="absolute top-2 right-2 text-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }}>🪔</div>

                  <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg animate-pulse">
                        {product.category}
                      </span>
                    </div>
                    {/* Diwali Offer Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 shadow-lg animate-bounce">
                        🪔 FESTIVE
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-orange-600 animate-pulse">₹{product.price}</span>
                      <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.merchantName}</span>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                      🛒 Add to Cart - Diwali Special!
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CWStore;
