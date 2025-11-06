"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";

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
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilterKey>("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMerchants, setSelectedMerchants] = useState<Set<string>>(new Set());
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const loaderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadingMessages = ["understanding your vibe..", "curating experience..", "finalising products.."];

  const handleCategoryClick = (categoryKey: string) => {
    if (loaderIntervalRef.current) {
      clearInterval(loaderIntervalRef.current);
      loaderIntervalRef.current = null;
    }

    setIsLoading(true);
    setLoadingMessage(loadingMessages[0]);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < loadingMessages.length) {
        setLoadingMessage(loadingMessages[step]);
      } else {
        clearInterval(interval);
        loaderIntervalRef.current = null;
        setIsLoading(false);
        setActiveCategoryKey(categoryKey);
      }
    }, 1500);

    loaderIntervalRef.current = interval;
  };

  useEffect(() => {
    return () => {
      if (loaderIntervalRef.current) {
        clearInterval(loaderIntervalRef.current);
      }
    };
  }, []);

  const totalProducts = CATEGORY_DEFINITIONS.reduce((sum, category) => sum + category.products.length, 0);

  const allMerchants = Array.from(
    new Set(CATEGORY_DEFINITIONS.flatMap((cat) => cat.products.map((p) => p.merchantName)))
  ).sort();

  const highlights = [
    { metric: `${CATEGORY_DEFINITIONS.length}+`, subtitle: "Lifestyle categories live now" },
    { metric: `${totalProducts}+`, subtitle: "Curated SKUs from boutique brands" },
    { metric: "4.8★", subtitle: "Customer delight benchmark" },
    { metric: "48h", subtitle: "Average dispatch speed" }
  ];

  const query = searchTerm.trim().toLowerCase();

  const categoriesWithMatches = CATEGORY_DEFINITIONS.map((category) => {
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

  const activeCategory = activeCategoryKey ? categoriesWithMatches.find((category) => category.key === activeCategoryKey) : null;

  const showSearchResults = query.length > 0;

  const visibleGroups = showSearchResults
    ? categoriesWithMatches.filter((category) => category.filteredProducts.length > 0)
    : activeCategory
      ? [activeCategory]
      : [];

  const totalResults = visibleGroups.reduce((acc, category) => acc + category.filteredProducts.length, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.4),_transparent_60%)]" />
        <div className="absolute -top-32 right-10 h-80 w-80 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute -bottom-32 left-6 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100/80">CityWitty Storefront</span>
              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Everything you need, handpicked for your daily wins</h1>
              <p className="mt-6 max-w-2xl text-lg text-indigo-100/80">Browse bestsellers, curate your cart in seconds, and enjoy concierge delivery from verified Indian merchants.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-indigo-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40">Start shopping</button>
                <button className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-white/10">View offers</button>
              </div>
            </div>
            <Card className="border border-white/15 bg-white/10 text-white shadow-2xl shadow-indigo-500/30 backdrop-blur-3xl">
              <CardHeader className="space-y-4">
                <CardTitle className="text-xl font-semibold">Why buyers ❤️ CityWitty</CardTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item.metric} className="rounded-2xl bg-white/10 px-5 py-6">
                      <p className="text-3xl font-bold text-white">{item.metric}</p>
                      <p className="mt-2 text-xs text-indigo-100/70">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col gap-3 text-xs text-indigo-100/70">
                <span>Trusted makers • Assured authenticity • Instant order tracking</span>
                <span>Need help? Call +91-800-800-1212 for concierge checkout</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col gap-10 px-6 py-10 sm:px-10 lg:flex-row">
              <aside className="w-full max-w-xs space-y-8">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products, categories, or merchants"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 text-sm font-medium text-slate-700 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
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
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick filters</p>
                    <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
                      {QUICK_FILTERS.map((filter) => {
                        const isActive = quickFilter === filter.key;
                        return (
                          <button
                            key={filter.key}
                            onClick={() => setQuickFilter(filter.key)}
                            className={`flex min-w-[150px] flex-col gap-1 rounded-2xl border px-4 py-3 text-left text-xs transition duration-300 ${isActive ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
                              }`}
                          >
                            <span className="text-sm font-semibold uppercase tracking-wide">{filter.label}</span>
                            <span className={isActive ? "text-indigo-100" : "text-slate-400"}>{filter.description}</span>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Browse categories</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">Shop by need</h2>
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
                            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition duration-300 ${isActive ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50"
                              } ${showSearchResults && !hasMatches ? "opacity-50" : ""}`}
                            aria-pressed={isActive}
                            title={category.description}
                          >
                            <div className="flex flex-col gap-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-700 flex-shrink-0">{category.icon}</span>
                                <p className="text-sm font-semibold text-inherit">{category.label}</p>
                              </div>
                              <p className={`text-[11px] leading-snug ${isActive ? "text-indigo-100" : "text-slate-500"
                                }`}>{category.description}</p>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0 ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
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
                  className="w-full rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:bg-slate-50"
                >
                  Clear All Filters
                </button>

                <Card className="border border-slate-200 bg-slate-50/70 shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-base font-semibold text-slate-900">Need help checking out?</CardTitle>
                    <p className="text-xs text-slate-500">Get curated bundles, sizing help, or COD assistance within minutes.</p>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-2">
                    <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-indigo-600">Chat with stylist</button>
                    <button className="w-full rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:border-indigo-300 hover:text-indigo-600">Schedule call</button>
                  </CardFooter>
                </Card>
              </aside>

              <div className="flex-1 space-y-8">
                {isLoading ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-10 rounded-3xl border border-slate-200 bg-white px-6 py-16 shadow-lg shadow-slate-900/5">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <span className="rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Curating picks</span>
                      <p className="text-2xl font-semibold text-slate-900">{loadingMessage}</p>
                      <p className="text-sm text-slate-500">Hang tight while we tailor recommendations for you.</p>
                    </div>
                    <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
                      {[0, 1].map((item) => (
                        <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                          <div className="h-24 w-24 rounded-xl bg-slate-200/60 animate-pulse" />
                          <div className="flex-1 space-y-3">
                            <div className="h-3 w-24 rounded-full bg-slate-200/70 animate-pulse" />
                            <div className="h-4 w-32 rounded-full bg-slate-200/70 animate-pulse" />
                            <div className="h-3 w-full rounded-full bg-slate-200/70 animate-pulse" />
                            <div className="flex gap-2 pt-2">
                              {[0, 1, 2].map((badge) => (
                                <span key={badge} className="h-6 flex-1 rounded-full bg-slate-200/60 animate-pulse" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : !activeCategoryKey && !showSearchResults ? (
                  <div className="space-y-10">
                    <div className="py-12">
                      <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Choose your category</h2>
                      <p className="mt-3 text-lg text-slate-600">Select what interests you and start exploring curated collections</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {CATEGORY_DEFINITIONS.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => handleCategoryClick(category.key)}
                          className="group relative rounded-xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/5 active:scale-95"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-4xl">{category.icon}</span>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
                              {category.products.length} items
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-slate-900">{category.label}</h3>
                          <p className="mt-2 text-sm text-slate-600">{category.description}</p>

                          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:gap-3 transition-all">
                            Explore
                            <svg className="h-4 w-4 transition duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sort and organise</p>
                        <p className="text-xs text-slate-400">Find the right fit faster with curated sorting</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SORT_OPTIONS.map((option) => {
                          const isActive = sortOption === option.key;
                          return (
                            <button
                              key={option.key}
                              onClick={() => setSortOption(option.key)}
                              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition duration-300 ${isActive ? "bg-slate-900 text-white shadow shadow-slate-900/20" : "bg-white text-slate-600 hover:bg-indigo-50"
                                }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {visibleGroups.length > 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm shadow-slate-900/5">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {showSearchResults
                              ? `Showing ${totalResults} ${totalResults === 1 ? "match" : "matches"}`
                              : activeCategory?.label}
                          </p>
                          <p className="text-sm text-slate-500">
                            {showSearchResults
                              ? `Across ${visibleGroups.length} ${visibleGroups.length === 1 ? "category" : "categories"}`
                              : activeCategory?.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end text-xs text-slate-500">
                          <span>{quickFilter === "all" ? "All price ranges" : QUICK_FILTERS.find((filter) => filter.key === quickFilter)?.label}</span>
                          {searchTerm.length > 0 && <span className="text-slate-400">Search: “{searchTerm}”</span>}
                        </div>
                      </div>
                    )}

                    {visibleGroups.length === 0 ? (
                      <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-lg shadow-slate-900/5">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 shadow-inner">
                          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12h2a2 2 0 100-4h-2M8 12H6a2 2 0 110-4h2m0 8h8m-6-4h4m-4-4h4m-6 8h8" />
                          </svg>
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold text-slate-900">Nothing matches your filters yet</h3>
                        <p className="mt-2 text-sm text-slate-500">Reset filters or explore categories curated by our stylists.</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <button
                            onClick={() => {
                              setQuickFilter("all");
                              setSearchTerm("");
                              setSortOption("featured");
                            }}
                            className="rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-indigo-600"
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
                            className="rounded-full border border-slate-300 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:border-indigo-300 hover:text-indigo-600"
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
                                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{category.label}</p>
                                    <p className="text-xs text-slate-400">{category.description}</p>
                                  </div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{category.filteredProducts.length} items</span>
                              </div>
                            )}

                            <div className="grid gap-7 sm:grid-cols-1 lg:grid-cols-2">
                              {category.filteredProducts.map((product) => (
                                <Card
                                  key={product._id}
                                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100"
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
                                    <div className="space-y-2">
                                      <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">{product.merchantName}</p>
                                      <CardTitle className="text-lg font-semibold text-slate-900 transition duration-300 group-hover:text-indigo-600">{product.name}</CardTitle>
                                      <p className="text-sm text-slate-600">{product.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                                      {product.rating && <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">⭐ {product.rating}</span>}
                                      {product.discount && <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">{product.discount}% off</span>}
                                      {product.deliveryDays && <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-700">In {product.deliveryDays}d</span>}
                                      <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">Free returns</span>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="flex flex-col gap-3 px-5 pb-5 sm:flex-row">
                                    <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-indigo-600 sm:flex-1">Add to cart</button>
                                    <a
                                      href={`/${product.merchantSlug}`}
                                      className="w-full rounded-2xl border border-slate-300 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition duration-300 hover:border-indigo-300 hover:text-indigo-600 sm:w-auto"
                                    >
                                      Visit merchant
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
