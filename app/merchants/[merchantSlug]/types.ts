export interface MerchantProductVariant {
  variantId?: string;
  name?: string;
  price?: number;
  stock?: number;
}

export interface MerchantProductFAQ {
  question: string;
  answer: string;
  certifiedBuyer?: boolean;
  isLike?: boolean;
}

export interface MerchantProduct {
  _id?: string;
  productId?: string;
  productName?: string;
  productImages?: string[];
  productDescription?: string;
  productCategory?: string;
  brand?: string;
  productHighlights?: string[];
  productVariants?: MerchantProductVariant[];
  originalPrice?: number;
  discountedPrice?: number;
  offerApplicable?: string;
  deliveryFee?: number;
  orderHandlingFee?: number;
  discountOfferedOnProduct?: number;
  deliverableLocations?: string[];
  eta?: string;
  faq?: MerchantProductFAQ[];
  instore?: boolean;
  cityWittyAssured?: boolean;
  isWalletCompatible?: boolean;
  cashbackPoints?: number;
  isPriority?: boolean;
  sponsored?: boolean;
  bestsellerBadge?: boolean;
  additionalInfo?: string;
  isReplacement?: boolean;
  replacementDays?: number;
  isAvailableStock?: boolean;
  availableStocks?: number;
}

export interface Merchant {
  relatedSearches: any;
  businessName: any;
  _id: string;
  merchantId?: string;
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
    originalPrice: number;
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
  products?: MerchantProduct[];
  offlineProducts?: MerchantProduct[];

  // Google Reviews Integration
  googlePlaceId?: string;
  googleReviews?: {
    rating: number;
    userRatingsTotal: number;
    reviews: any[];
    lastFetched: Date;
  };
}