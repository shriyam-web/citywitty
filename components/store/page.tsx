"use client";

import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { useCart } from "@/lib/cart-context";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  merchantName: string;
  merchantSlug: string;
  rating?: number;
  discount?: number;
  deliveryDays?: number;
}

interface Category {
  key: string;
  icon: string;
  label: string;
  description: string;
  products: Product[];
}

type QuickFilterKey = "all" | "under1000" | "1000to2000" | "above2000";

type SortOption = "featured" | "priceLowHigh" | "priceHighLow";

const clothProducts: Product[] = [
  {
    _id: "cloth001",
    name: "Designer Jeans",
    description: "Premium denim jeans with modern fit and style",
    price: 2999,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"],
    merchantName: "Style Hub",
    merchantSlug: "style-hub",
    rating: 4.5,
    discount: 20,
    deliveryDays: 2
  },
  {
    _id: "cloth002",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 899,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"],
    merchantName: "Fashion Forward",
    merchantSlug: "fashion-forward",
    rating: 4.8,
    discount: 15,
    deliveryDays: 1
  },
  {
    _id: "cloth003",
    name: "Banarasi Silk Saree",
    description: "Handwoven Banarasi silk saree with intricate designs",
    price: 2500,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop"],
    merchantName: "Royal Sarees",
    merchantSlug: "royal-sarees",
    rating: 4.9,
    discount: 25,
    deliveryDays: 3
  },
  {
    _id: "cloth004",
    name: "Cotton Saree",
    description: "Comfortable cotton saree for everyday wear",
    price: 800,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
    merchantName: "Royal Sarees",
    merchantSlug: "royal-sarees",
    rating: 4.6,
    discount: 10,
    deliveryDays: 2
  }
];

const electronicsProducts: Product[] = [
  {
    _id: "elec001",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life",
    price: 2999,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"],
    merchantName: "TechHub Electronics",
    merchantSlug: "techhub-electronics",
    rating: 4.7,
    discount: 30,
    deliveryDays: 1
  },
  {
    _id: "elec002",
    name: "Smartphone 128GB",
    description: "Latest smartphone with advanced camera and fast processor",
    price: 24999,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"],
    merchantName: "TechHub Electronics",
    merchantSlug: "techhub-electronics",
    rating: 4.4,
    discount: 10,
    deliveryDays: 2
  }
];

const homeProducts: Product[] = [
  {
    _id: "home001",
    name: "Handcrafted Bamboo Lamp",
    description: "Ambient lighting handmade by artisans from Assam",
    price: 1899,
    category: "Home & Living",
    images: ["https://images.unsplash.com/photo-1459173895421-1eff73c89fab?w=400&h=300&fit=crop"],
    merchantName: "Crafted Lights",
    merchantSlug: "crafted-lights",
    rating: 4.9,
    discount: 15,
    deliveryDays: 3
  },
  {
    _id: "home002",
    name: "Organic Cotton Throw",
    description: "Lightweight woven throw with contrast tassels",
    price: 1299,
    category: "Home & Living",
    images: ["https://images.unsplash.com/photo-1522648485144-849409408aee?w=400&h=300&fit=crop"],
    merchantName: "Habitat Loom",
    merchantSlug: "habitat-loom",
    rating: 4.3,
    discount: 20,
    deliveryDays: 2
  }
];

const beautyProducts: Product[] = [
  {
    _id: "beauty001",
    name: "Ayurvedic Face Elixir",
    description: "Blend of saffron, kumkumadi tailam, and botanicals",
    price: 1599,
    category: "Beauty & Wellness",
    images: ["https://images.unsplash.com/photo-1612810806695-30ba72b0da2a?w=400&h=300&fit=crop"],
    merchantName: "Rasa Rituals",
    merchantSlug: "rasa-rituals",
    rating: 4.8,
    discount: 18,
    deliveryDays: 2
  },
  {
    _id: "beauty002",
    name: "Serene Soy Candle",
    description: "Lavender and bergamot candle with 60-hour burn time",
    price: 999,
    category: "Beauty & Wellness",
    images: ["https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=300&fit=crop"],
    merchantName: "Slow Glow",
    merchantSlug: "slow-glow",
    rating: 4.6,
    discount: 12,
    deliveryDays: 1
  }
];

const decorProducts: Product[] = [
  {
    _id: "decor001",
    name: "Terracotta Planter Duo",
    description: "Sustainably fired planters with matte glaze finish",
    price: 899,
    category: "Art & Decor",
    images: ["https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=400&h=300&fit=crop"],
    merchantName: "Clay Stories",
    merchantSlug: "clay-stories",
    rating: 4.5,
    discount: 22,
    deliveryDays: 2
  },
  {
    _id: "decor002",
    name: "Monochrome Wall Art Set",
    description: "Limited edition prints by indie illustrators",
    price: 2199,
    category: "Art & Decor",
    images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop"],
    merchantName: "Studio Frame",
    merchantSlug: "studio-frame",
    rating: 4.7,
    discount: 28,
    deliveryDays: 3
  }
];

const CATEGORY_DEFINITIONS: Category[] = [
  {
    key: "cloth",
    icon: "👗",
    label: "Clothing & Fashion",
    description: "Handpicked apparel, sarees, and everyday classics",
    products: clothProducts
  },
  {
    key: "electronics",
    icon: "📱",
    label: "Smart Tech",
    description: "Latest gadgets, audio, and connected essentials",
    products: electronicsProducts
  },
  {
    key: "home",
    icon: "🏡",
    label: "Home & Living",
    description: "Soft furnishings and mindful home upgrades",
    products: homeProducts
  },
  {
    key: "beauty",
    icon: "🌿",
    label: "Beauty & Wellness",
    description: "Self-care rituals inspired by ayurvedic wisdom",
    products: beautyProducts
  },
  {
    key: "decor",
    icon: "🖼️",
    label: "Art & Decor",
    description: "Statement pieces to refresh your spaces",
    products: decorProducts
  }
];

const QUICK_FILTERS: { key: QuickFilterKey; label: string; description: string }[] = [
  { key: "all", label: "All budgets", description: "Every price point" },
  { key: "under1000", label: "Under ₹1000", description: "Easy add-ons" },
  { key: "1000to2000", label: "₹1000 - ₹2000", description: "Gifting favourites" },
  { key: "above2000", label: "Above ₹2000", description: "Premium picks" }
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "priceLowHigh", label: "Price: Low to High" },
  { key: "priceHighLow", label: "Price: High to Low" }
];

const sortProductsByOption = (products: Product[], option: SortOption) => {
  if (option === "priceLowHigh") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (option === "priceHighLow") {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
};

const applyQuickFilter = (products: Product[], filter: QuickFilterKey) => {
  if (filter === "under1000") {
    return products.filter((product) => product.price <= 1000);
  }
  if (filter === "1000to2000") {
    return products.filter((product) => product.price > 1000 && product.price <= 2000);
  }
  if (filter === "above2000") {
    return products.filter((product) => product.price > 2000);
  }
  return products;
};

const CWStore: React.FC = () => {
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilterKey>("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMerchants, setSelectedMerchants] = useState<Set<string>>(new Set());
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [minDiscount, setMinDiscount] = useState<number>(0);


  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategoryKey(categoryKey);
  };

  const allMerchants = useMemo(() =>
    Array.from(
      new Set(CATEGORY_DEFINITIONS.flatMap((cat) => cat.products.map((p) => p.merchantName)))
    ).sort(),
    []
  );

  const query = searchTerm.trim().toLowerCase();
  const firstCategoryKey = CATEGORY_DEFINITIONS[0]?.key;

  const categoriesWithMatches = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((category) => {
      const baseFiltered = category.products.filter((product) => {
        if (query.length === 0) {
          return true;
        }
        const matcher = query;
        const nameMatch = product.name.toLowerCase().includes(matcher);
        const categoryMatch = product.category.toLowerCase().includes(matcher);
        const merchantMatch = product.merchantName.toLowerCase().includes(matcher);
        return nameMatch || categoryMatch || merchantMatch;
      });

      const filterApplied = baseFiltered.filter((product) => {
        if (quickFilter !== "all") {
          const priceFilter = applyQuickFilter([product], quickFilter);
          if (priceFilter.length === 0) return false;
        }
        if (selectedRating && (product.rating ?? 0) < selectedRating) return false;
        if (selectedMerchants.size > 0 && !selectedMerchants.has(product.merchantName)) return false;
        if (selectedDelivery && (product.deliveryDays ?? 0) > selectedDelivery) return false;
        if (minDiscount > 0 && (product.discount ?? 0) < minDiscount) return false;
        return true;
      });

      const filteredProducts = sortProductsByOption(filterApplied, sortOption);

      return { ...category, filteredProducts };
    });
  }, [query, quickFilter, selectedRating, selectedMerchants, selectedDelivery, minDiscount, sortOption]);

  const activeCategory = activeCategoryKey ? categoriesWithMatches.find((category) => category.key === activeCategoryKey) : null;

  const showSearchResults = query.length > 0;

  const visibleGroups = showSearchResults
    ? categoriesWithMatches.filter((category) => category.filteredProducts.length > 0)
    : activeCategory
      ? [activeCategory]
      : [];

  const totalResults = visibleGroups.reduce((acc, category) => acc + category.filteredProducts.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-amber-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-transparent bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-[-4rem] right-0 h-64 w-64 rounded-full bg-pink-400/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-3 py-0 sm:px-4 sm:py-0 lg:px-6 lg:py-0.5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full max-w-2xl flex-col items-center gap-4 text-center lg:items-start lg:text-left">
              <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left pt-4">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm ring-1 ring-white/30">India ka apna supermarket</span>
                <div className="space-y-1">
                  <h1 className="text-xl font-bold leading-tight sm:text-5xl">Help India grow with every purchase</h1>
                  <p className="text-sm text-white/80 sm:text-base lg:max-w-2xl">Discover authentic Indian brands and support local merchants</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-sm">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="w-full rounded-full border border-white/40 bg-white/90 px-5 py-3 pr-14 text-sm font-medium text-gray-900 placeholder-gray-500 shadow-lg focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-indigo-600 p-2 text-white shadow-lg transition duration-300 hover:bg-indigo-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (firstCategoryKey) {
                      handleCategoryClick(firstCategoryKey);
                    }
                  }}
                  className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-white/20"
                >
                  Browse categories
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-2.5 pb-1 text-[11px] uppercase tracking-wide text-white/70 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-medium">Pan-India shipping</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-medium">Weekly new drops</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-medium">Secure checkout</span>
              </div>
            </div>
            <div className="relative flex w-full justify-center lg:w-auto lg:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-3xl sm:max-w-[24rem] lg:max-w-[25rem]">
                <img
                  src="/11.png"
                  alt="Smiling Indian shopper"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-8 sm:-mt-12 lg:-mt-16 z-10 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-indigo-100">
            <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:px-10">
              <aside className="w-full space-y-8 lg:max-w-xs">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products, merchants..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-900">Quick Filters</p>
                    <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
                      {QUICK_FILTERS.map((filter) => {
                        const isActive = quickFilter === filter.key;
                        return (
                          <button
                            key={filter.key}
                            onClick={() => setQuickFilter(filter.key)}
                            className={`flex min-w-[150px] flex-col gap-1 rounded-lg border px-4 py-3 text-left text-xs transition duration-300 ${isActive ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                              }`}
                          >
                            <span className="text-sm font-semibold uppercase tracking-wide">{filter.label}</span>
                            <span className={isActive ? "text-blue-100" : "text-gray-500"}>{filter.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Rating</p>
                    <div className="mt-3 space-y-2">
                      {[4.0, 4.5, 4.8].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRating === rating}
                            onChange={(e) => setSelectedRating(e.target.checked ? rating : null)}
                            className="rounded border-slate-300"
                          />
                          <span className="text-xs text-slate-600">{rating}★ & above</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Delivery</p>
                    <div className="mt-3 space-y-2">
                      {[1, 2, 3].map((days) => (
                        <label key={days} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedDelivery === days}
                            onChange={(e) => setSelectedDelivery(e.target.checked ? days : null)}
                            className="rounded border-slate-300"
                          />
                          <span className="text-xs text-slate-600">In {days} day{days > 1 ? 's' : ''}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Min Discount</p>
                    <div className="mt-3 space-y-2">
                      {[10, 15, 20].map((discount) => (
                        <label key={discount} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={minDiscount === discount}
                            onChange={(e) => setMinDiscount(e.target.checked ? discount : 0)}
                            className="rounded border-slate-300"
                          />
                          <span className="text-xs text-slate-600">{discount}% & above</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Merchants</p>
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                      {allMerchants.map((merchant) => (
                        <label key={merchant} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMerchants.has(merchant)}
                            onChange={(e) => {
                              const newSet = new Set(selectedMerchants);
                              if (e.target.checked) {
                                newSet.add(merchant);
                              } else {
                                newSet.delete(merchant);
                              }
                              setSelectedMerchants(newSet);
                            }}
                            className="rounded border-slate-300"
                          />
                          <span className="text-xs text-slate-600 truncate">{merchant}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-900">Categories</p>
                    <h2 className="mt-1 text-lg font-semibold text-gray-900">Browse Shops</h2>
                  </div>
                  <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1 sm:max-h-none">
                    <div className="grid gap-3 sm:grid-cols-1">
                      {categoriesWithMatches.map((category) => {
                        const isActive = category.key === activeCategoryKey;
                        const hasMatches = category.filteredProducts.length > 0;
                        return (
                          <button
                            key={category.key}
                            onClick={() => handleCategoryClick(category.key)}
                            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition duration-300 ${isActive ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                              } ${showSearchResults && !hasMatches ? "opacity-50" : ""}`}
                            aria-pressed={isActive}
                            title={category.description}
                          >
                            <div className="flex flex-col gap-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm flex-shrink-0">{category.icon}</span>
                                <p className="text-sm font-semibold text-inherit">{category.label}</p>
                              </div>
                              <p className={`text-[11px] leading-snug ${isActive ? "text-blue-100" : "text-gray-600"
                                }`}>{category.description}</p>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
                              }`}>
                              {showSearchResults ? `${category.filteredProducts.length}` : `${category.products.length}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRating(null);
                    setSelectedMerchants(new Set());
                    setSelectedDelivery(null);
                    setMinDiscount(0);
                    setSearchTerm("");
                    setQuickFilter("all");
                    setSortOption("featured");
                  }}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-gray-700 transition duration-300 hover:bg-slate-50 hover:border-slate-300"
                >
                  Clear All Filters
                </button>

                <Card className="border border-gray-200 bg-white shadow-sm">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-sm font-semibold text-gray-900">Need Help?</CardTitle>
                    <p className="text-xs text-gray-600">Connect with our experts</p>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-2">
                    <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition duration-300 shadow-sm">Chat with Expert</button>
                    <button className="w-full rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 transition duration-300 hover:border-gray-400">Schedule Call</button>
                  </CardFooter>
                </Card>
              </aside>

              <div className="flex-1 space-y-8">
                {!activeCategoryKey && !showSearchResults ? (
                  <div className="space-y-10">
                    <div className="py-6">
                      <h2 className="text-3xl font-bold text-gray-900">Explore by Category</h2>
                      <p className="mt-2 text-sm text-gray-600">Curated collections from India's finest merchants</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {CATEGORY_DEFINITIONS.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => handleCategoryClick(category.key)}
                          className="group relative rounded-xl border border-slate-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-100 p-5 text-left transition-all duration-300 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-200/30 active:scale-95 overflow-hidden"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-4xl">{category.icon}</span>
                            <span className="text-[11px] font-semibold text-white bg-indigo-600 rounded-full px-3 py-1">
                              {category.products.length}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{category.label}</h3>
                          <p className="text-xs text-gray-600">{category.description}</p>

                          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
                            Explore
                            <svg className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Sort By</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SORT_OPTIONS.map((option) => {
                          const isActive = sortOption === option.key;
                          return (
                            <button
                              key={option.key}
                              onClick={() => setSortOption(option.key)}
                              className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition duration-300 ${isActive ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20" : "bg-gray-100 border border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                                }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {visibleGroups.length > 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {showSearchResults
                              ? `Found ${totalResults} item${totalResults !== 1 ? 's' : ''}`
                              : activeCategory?.label}
                          </p>

                        </div>
                        <div className="flex flex-col items-end text-xs text-gray-600">
                          <span className="font-semibold">{quickFilter === "all" ? "All price ranges" : QUICK_FILTERS.find((filter) => filter.key === quickFilter)?.label}</span>
                          {searchTerm.length > 0 && <span className="text-indigo-600 font-medium">Search: “{searchTerm}”</span>}
                        </div>
                      </div>
                    )}

                    {visibleGroups.length === 0 ? (
                      <div className="rounded-lg border border-slate-200 bg-white py-12 text-center shadow-sm">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12h2a2 2 0 100-4h-2M8 12H6a2 2 0 110-4h2m0 8h8m-6-4h4m-4-4h4m-6 8h8" />
                          </svg>
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-gray-900">No items found</h3>
                        <p className="mt-1 text-xs text-gray-600">Try adjusting your filters or search term.</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <button
                            onClick={() => {
                              setQuickFilter("all");
                              setSearchTerm("");
                              setSortOption("featured");
                            }}
                            className="rounded-full bg-indigo-600 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-indigo-700"
                          >
                            Clear filters
                          </button>
                          <button
                            onClick={() => {
                              const firstKey = CATEGORY_DEFINITIONS[0]?.key;
                              if (firstKey) {
                                handleCategoryClick(firstKey);
                              }
                            }}
                            className="rounded-full border-2 border-indigo-300 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-indigo-700 transition duration-300 hover:border-indigo-500 hover:text-indigo-800"
                          >
                            Back to bestsellers
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-12">
                        {visibleGroups.map((category) => (
                          <div key={category.key} className="space-y-6">
                            {showSearchResults && (
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{category.icon}</span>
                                  <div>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{category.label}</p>
                                    <p className="text-xs text-gray-600">{category.description}</p>
                                  </div>
                                </div>
                                <span className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">{category.filteredProducts.length} items</span>
                              </div>
                            )}

                            <div className="grid gap-7 sm:grid-cols-1 lg:grid-cols-2">
                              {category.filteredProducts.map((product) => (
                                <Card
                                  key={product._id}
                                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-200/20"
                                >
                                  <CardHeader className="p-0">
                                    <div className="relative aspect-video overflow-hidden">
                                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800 shadow-md shadow-slate-900/10">
                                        {product.category}
                                      </span>
                                      <button
                                        type="button"
                                        aria-label="Save to wishlist"
                                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm shadow-slate-900/10 transition duration-300 hover:bg-white"
                                      >
                                        ♡
                                      </button>
                                      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-slate-900 shadow-md shadow-slate-900/10">
                                        ₹{product.price}
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="flex flex-1 flex-col gap-4 px-5 py-5">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600">{product.merchantName}</p>
                                      <CardTitle className="text-sm font-semibold text-gray-900 transition duration-300 group-hover:text-indigo-600">{product.name}</CardTitle>
                                      <p className="text-xs text-gray-600">{product.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                                      {product.rating && <span className="flex items-center gap-0.5 rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700">⭐ {product.rating}</span>}
                                      {product.discount && <span className="flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-green-700">{product.discount}% off</span>}
                                      {product.deliveryDays && <span className="flex items-center gap-0.5 rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">{product.deliveryDays}d</span>}
                                    </div>
                                  </CardContent>
                                  <CardFooter className="flex flex-col gap-2 px-5 pb-4 sm:flex-row">
                                    <button
                                      onClick={() => handleAddToCart(product)}
                                      className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition duration-300 shadow-sm shadow-indigo-500/20 hover:shadow-md sm:flex-1"
                                    >
                                      Add to Cart
                                    </button>
                                    <a
                                      href={`/${product.merchantSlug}`}
                                      className="w-full rounded-lg border border-indigo-200 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-center text-xs font-semibold text-indigo-600 transition duration-300 hover:border-indigo-300 sm:w-auto"
                                    >
                                      View Store
                                    </a>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CWStore;
