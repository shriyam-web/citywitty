import type { Merchant, MerchantProduct } from './types';

type OfflineProduct = {
  productName?: string;
  description?: string;
  imageUrls?: string[];
  brand?: string;
  offerPrice?: number;
  price?: number;
  status?: string;
  availableStock?: number;
};

/**
 * Generate LocalBusiness JSON-LD structured data
 * Helps Google understand merchant info: location, hours, ratings, contact
 * Enhanced with comprehensive fields for better search visibility
 */
export function generateLocalBusinessSchema(merchant: Merchant): Record<string, unknown> {
  const ratingValue = merchant.googleReviews?.rating || merchant.averageRating || null;
  const ratingCount = merchant.googleReviews?.userRatingsTotal || merchant.ratings?.length || 0;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

  // Determine appropriate business type based on category
  const businessType = getBusinessTypeFromCategory(merchant.category);

  const sameAsArray = [];
  if (merchant.website) sameAsArray.push(merchant.website);
  if (merchant.socialLinks?.facebook) sameAsArray.push(merchant.socialLinks.facebook);
  if (merchant.socialLinks?.instagram) sameAsArray.push(merchant.socialLinks.instagram);
  if (merchant.socialLinks?.youtube) sameAsArray.push(merchant.socialLinks.youtube);
  if (merchant.socialLinks?.linkedin) sameAsArray.push(merchant.socialLinks.linkedin);
  if (merchant.socialLinks?.twitter) sameAsArray.push(merchant.socialLinks.twitter);

  // Generate services based on category and offers
  const services = generateServicesFromMerchant(merchant);

  // Determine price range based on merchant data
  const priceRange = determinePriceRange(merchant);

  // Generate comprehensive service types
  const serviceTypes = generateServiceTypes(merchant);

  // Generate area served information
  const areaServed = generateAreaServed(merchant);

  return {
    '@context': 'https://schema.org',
    '@type': businessType,
    '@id': `${baseUrl}/merchants/${merchant.merchantSlug}`,
    name: merchant.displayName,
    alternateName: merchant.displayName.split(' ').join(''),
    description: merchant.description || `${merchant.displayName} - Premium ${merchant.category} in ${merchant.city}${merchant.tags && merchant.tags.length > 0 ? `. Specializing in: ${merchant.tags.slice(0, 3).join(', ')}` : ''}`,
    url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
    parentOrganization: {
      '@type': 'Organization',
      '@id': baseUrl,
      name: 'CityWitty',
      url: baseUrl,
    },
    image: merchant.storeImages?.length ? merchant.storeImages : [merchant.logo || `${baseUrl}/og-image.png`],
    logo: {
      '@type': 'ImageObject',
      url: merchant.logo || `${baseUrl}/logo.png`,
      width: 250,
      height: 250,
    },
    telephone: merchant.phone || undefined,
    email: merchant.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: merchant.streetAddress,
      addressLocality: merchant.city,
      addressRegion: merchant.branchLocations?.[0]?.state || '',
      addressCountry: 'IN',
      postalCode: merchant.branchLocations?.[0]?.pincode || '',
    },
    // Multiple locations if available
    ...(merchant.branchLocations && merchant.branchLocations.length > 1 && {
      hasLocation: merchant.branchLocations.map(branch => ({
        '@type': 'Place',
        name: `${merchant.displayName} - ${branch.branchName || 'Branch'}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: branch.streetAddress,
          addressLocality: branch.city,
          addressRegion: branch.state,
          addressCountry: 'IN',
          postalCode: branch.pincode,
        },
        geo: branch.latitude && branch.longitude ? {
          '@type': 'GeoCoordinates',
          latitude: branch.latitude,
          longitude: branch.longitude,
        } : undefined,
      })),
    }),
    geo: merchant.latitude && merchant.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: merchant.latitude,
      longitude: merchant.longitude,
    } : undefined,
    priceRange,
    // Services offered
    ...(services.length > 0 && { hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: services } }),
    // Social media and external profiles
    ...(sameAsArray.length > 0 && { sameAs: sameAsArray }),
    // Ratings and reviews
    ...(ratingValue && ratingCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Math.min(5, Math.max(1, Number(ratingValue.toFixed(1)))),
        bestRating: 5,
        worstRating: 1,
        ratingCount: Math.max(ratingCount, 1),
        reviewCount: Math.max(ratingCount, 0),
      },
    }),
    // Business hours
    ...(merchant.businessHours && {
      openingHoursSpecification: (merchant.businessHours.days || []).length > 0
        ? (merchant.businessHours.days || []).map((day) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${day}`,
          opens: merchant.businessHours?.open || '09:00',
          closes: merchant.businessHours?.close || '18:00',
        }))
        : [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['https://schema.org/Monday', 'https://schema.org/Tuesday', 'https://schema.org/Wednesday', 'https://schema.org/Thursday', 'https://schema.org/Friday', 'https://schema.org/Saturday', 'https://schema.org/Sunday'],
          opens: merchant.businessHours.open || '09:00',
          closes: merchant.businessHours.close || '18:00',
        }],
    }),
    // Active offers and discounts
    ...(merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && {
      makesOffer: merchant.offlineDiscount
        .filter(offer => offer.status === 'Active' && new Date(offer.validUpto) > new Date())
        .map(offer => ({
          '@type': 'Offer',
          name: offer.offerTitle,
          description: offer.offerDescription,
          priceCurrency: 'INR',
          discount: `${offer.discountPercent}%`,
          validFrom: new Date().toISOString().split('T')[0],
          validThrough: new Date(offer.validUpto).toISOString().split('T')[0],
          url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
          availability: 'https://schema.org/InStock',
        })) || [],
    }),
    // Contact options
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: merchant.phone,
        availableLanguage: 'en',
      },
      ...(merchant.whatsapp ? [{
        '@type': 'ContactPoint',
        contactType: 'WhatsApp',
        telephone: merchant.whatsapp,
        availableLanguage: 'en',
        contactOption: 'https://schema.org/TollFree',
      }] : []),
    ],
    // Search and discovery
    ...(merchant.branchLocations && merchant.branchLocations.length > 0 && {
      hasMap: `https://maps.google.com/maps/search/${encodeURIComponent(merchant.displayName + ' ' + merchant.city)}`,
    }),
    // Action for discovery and engagement
    potentialAction: [
      {
        '@type': 'ViewAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/merchants/${merchant.merchantSlug}`,
          actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
        },
        name: 'View Merchant Details',
      },
      ...(merchant.phone ? [{
        '@type': 'CommunicateAction',
        target: {
          '@type': 'EntryPoint',
          url: `tel:${merchant.phone}`,
        },
        name: 'Call Merchant',
      }] : []),
      ...(merchant.whatsapp ? [{
        '@type': 'CommunicateAction',
        target: {
          '@type': 'EntryPoint',
          url: `https://wa.me/${merchant.whatsapp.replace(/[^0-9]/g, '')}`,
        },
        name: 'WhatsApp Merchant',
      }] : []),
    ],
    // Additional metadata for freshness and updates
    ...(merchant.joinedSince && {
      foundingDate: new Date(merchant.joinedSince).toISOString().split('T')[0],
    }),
    // Keywords for better categorization
    ...(merchant.tags && merchant.tags.length > 0 && {
      keywords: merchant.tags.join(', '),
    }),
    // Payment methods accepted
    ...(merchant.paymentMethodAccepted && merchant.paymentMethodAccepted.length > 0 && {
      paymentAccepted: merchant.paymentMethodAccepted.join(', '),
    }),
    // Area served
    ...(areaServed && { areaServed }),
    // Service types
    ...(serviceTypes.length > 0 && { hasOfferCatalog: serviceTypes }),
  };
}

/**
 * Generate AggregateOffer JSON-LD for products
 * Helps Google understand product offerings, pricing, and availability
 */
export function generateProductsSchema(merchant: Merchant, products: MerchantProduct[] = []): Record<string, unknown>[] {
  const validProducts = (products || []).slice(0, 10); // Limit to 10 products for schema

  return validProducts.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.productName,
    description: product.productDescription,
    image: product.productImages?.[0] || merchant.logo,
    brand: {
      '@type': 'Brand',
      name: product.brand || merchant.displayName,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      highPrice: product.originalPrice?.toString() || '0',
      lowPrice: product.discountedPrice?.toString() || '0',
      ...(product.isAvailableStock && {
        availability: 'https://schema.org/InStock',
      }),
      offerCount: 1,
    },
    ...(product.bestsellerBadge && { bestSeller: true }),
    ...(product.cityWittyAssured && {
      seo_badges: ['Citywittty Assured'],
    }),
  }));
}

export function generateOfflineProductsSchema(merchant: Merchant, products: OfflineProduct[] = []): Record<string, unknown>[] {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

  return (products || []).slice(0, 10).map((product, index) => {
    const priceValue = product.offerPrice ?? product.price ?? 0;
    const availability = product.status === 'out_of_stock' || product.availableStock === 0
      ? 'https://schema.org/OutOfStock'
      : 'https://schema.org/InStoreOnly';

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.productName || `${merchant.displayName} Offline Product ${index + 1}`,
      description: product.description || merchant.description,
      image: product.imageUrls?.[0] || merchant.logo,
      brand: {
        '@type': 'Brand',
        name: product.brand || merchant.displayName,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: priceValue.toString(),
        availability,
        url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'LocalBusiness',
          name: merchant.displayName,
        },
      },
    };
  });
}

/**
 * Generate Organization JSON-LD for CityWitty brand
 * Helps search engines understand the platform's identity and contact information
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': baseUrl,
    name: 'CityWitty',
    alternateName: 'City Witty',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 250,
      height: 250,
    },
    description: 'Discover local businesses, merchants, and exclusive deals in your city on CityWitty',
    foundingDate: '2020',
    areaServed: 'IN',
    sameAs: [
      'https://www.facebook.com/citywitty',
      'https://www.instagram.com/citywitty',
      'https://www.twitter.com/citywitty',
      'https://www.linkedin.com/company/citywitty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@citywitty.com',
      availableLanguage: ['en', 'hi'],
    },
  };
}

/**
 * Generate WebSite JSON-LD with search action
 * Enables site search box in Google SERP
 */
export function generateWebsiteSchema(): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': baseUrl,
    name: 'CityWitty',
    url: baseUrl,
    description: 'Find local businesses, merchants, and exclusive deals in your city',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/merchants?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 * Improves navigation clarity and SERP appearance with breadcrumbs
 */
export function generateBreadcrumbSchema(merchant: Merchant): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Merchants',
        item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com'}/merchants`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: merchant.displayName,
        item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com'}/merchants/${merchant.merchantSlug}`,
      },
    ],
  };
}

/**
 * Generate FAQPage schema if merchant has FAQs
 */
export function generateFAQSchema(merchant: Merchant): Record<string, unknown> | null {
  if (!merchant.faqs || merchant.faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: merchant.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Review schema for individual merchant reviews
 * Enhances SERP appearance with review snippets
 */
export function generateReviewSchema(merchant: Merchant): Record<string, unknown>[] | null {
  if (!merchant.ratings || merchant.ratings.length === 0) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';

  // Limit to top 5 reviews for schema.org
  return merchant.ratings.slice(0, 5).map((review: any, index: number) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${baseUrl}/merchants/${merchant.merchantSlug}#review-${index}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating || 5,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.userName || 'Anonymous User',
    },
    reviewBody: review.reviewText || review.comment || '',
    datePublished: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: merchant.displayName,
      url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
    },
  })).filter(r => r.reviewBody); // Only include reviews with text
}

/**
 * Generate AggregateOffer schema for discounts/deals
 * Helps search engines understand promotional offerings
 */
export function generateAggregateOfferSchema(merchant: Merchant): Record<string, unknown> | null {
  if (!merchant.offlineDiscount || merchant.offlineDiscount.length === 0) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
  const activeOffers = merchant.offlineDiscount.filter(
    offer => offer.status === 'Active' && new Date(offer.validUpto) > new Date()
  );

  if (activeOffers.length === 0) return null;

  const discountPercentages = activeOffers.map(o => o.discountPercent || 0);
  const minDiscount = Math.min(...discountPercentages);
  const maxDiscount = Math.max(...discountPercentages);

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    offers: activeOffers.map(offer => ({
      '@type': 'Offer',
      url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
      name: offer.offerTitle,
      description: offer.offerDescription,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      validThrough: new Date(offer.validUpto).toISOString().split('T')[0],
      discount: `${offer.discountPercent}%`,
    })),
    lowPrice: minDiscount,
    highPrice: maxDiscount,
    priceCurrency: 'INR',
    offerCount: activeOffers.length,
    businessFunction: 'Sell',
  };
}

/**
 * Generate Service schema for merchant services
 * Helps search engines understand what services are offered
 */
export function generateServiceSchema(merchant: Merchant): Record<string, unknown>[] | null {
  if (!merchant.offlineDiscount || merchant.offlineDiscount.length === 0) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
  const activeOffers = merchant.offlineDiscount.filter(
    offer => offer.status === 'Active' && new Date(offer.validUpto) > new Date()
  );

  if (activeOffers.length === 0) return null;

  return activeOffers.map(offer => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offer.offerTitle,
    description: offer.offerDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: merchant.displayName,
      url: `${baseUrl}/merchants/${merchant.merchantSlug}`,
    },
    areaServed: merchant.city,
    serviceType: merchant.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      validThrough: new Date(offer.validUpto).toISOString().split('T')[0],
    },
  }));
}

/**
 * Generate service types for merchant
 */
function generateServiceTypes(merchant: Merchant): Record<string, unknown>[] {
  const services: Record<string, unknown>[] = [];

  // Add main category as service
  services.push({
    '@type': 'OfferCatalog',
    name: merchant.category,
    itemListElement: [{
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: merchant.category,
        description: merchant.description || `Professional ${merchant.category} services in ${merchant.city}`,
      },
    }],
  });

  // Add specific services from tags
  if (merchant.tags && merchant.tags.length > 0) {
    merchant.tags.slice(0, 5).forEach(tag => {
      services.push({
        '@type': 'OfferCatalog',
        name: tag,
        itemListElement: [{
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: tag,
            description: `${tag} services provided by ${merchant.displayName}`,
          },
        }],
      });
    });
  }

  return services;
}

/**
 * Generate area served information
 */
function generateAreaServed(merchant: Merchant): Record<string, unknown> | null {
  const areas: Record<string, unknown>[] = [];

  // Primary city
  areas.push({
    '@type': 'City',
    name: merchant.city,
    addressCountry: 'IN',
  });

  // Add branch locations if available
  if (merchant.branchLocations && merchant.branchLocations.length > 0) {
    merchant.branchLocations.forEach(branch => {
      if (branch.city && branch.city !== merchant.city) {
        areas.push({
          '@type': 'City',
          name: branch.city,
          addressCountry: 'IN',
        });
      }
    });
  }

  // If only one area, return it directly
  if (areas.length === 1) {
    return areas[0];
  }

  // If multiple areas, return as array
  return areas.length > 0 ? areas : null;
}

/**
 * Determine price range based on merchant data
 */
function determinePriceRange(merchant: Merchant): string {
  // If merchant has premium/premium seller status, assume higher price range
  if (merchant.isPremiumSeller || merchant.isTopMerchant) {
    return '₹₹₹'; // High-end
  }

  // If merchant has many high ratings, assume established business
  if (merchant.averageRating && merchant.averageRating >= 4.5) {
    return '₹₹'; // Moderate to high
  }

  // Default to moderate
  return '₹₹';
}

/**
 * Generate services from merchant data
 */
function generateServicesFromMerchant(merchant: Merchant): Record<string, unknown>[] {
  const services: Record<string, unknown>[] = [];

  // Add main service
  services.push({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: merchant.category,
      description: merchant.description || `${merchant.category} services`,
    },
  });

  // Add services from tags
  if (merchant.tags && merchant.tags.length > 0) {
    merchant.tags.forEach(tag => {
      services.push({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: tag,
          description: `${tag} service offered by ${merchant.displayName}`,
        },
      });
    });
  }

  return services;
}

/**
 * Get business type from category
 */
function getBusinessTypeFromCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'restaurant': 'Restaurant',
    'cafe': 'CafeOrCoffeeShop',
    'hotel': 'Hotel',
    'salon': 'BeautySalon',
    'spa': 'DaySpa',
    'gym': 'ExerciseGym',
    'clinic': 'MedicalClinic',
    'hospital': 'Hospital',
    'school': 'School',
    'store': 'Store',
    'shop': 'Store',
    'retail': 'Store',
    'automotive': 'AutoRepair',
    'repair': 'AutoRepair',
    'plumbing': 'Plumber',
    'electrical': 'Electrician',
    'cleaning': 'CleaningService',
    'laundry': 'DryCleaningOrLaundry',
    'pharmacy': 'Pharmacy',
    'bank': 'BankOrCreditUnion',
    'real estate': 'RealEstateAgent',
    'travel': 'TravelAgency',
    'consulting': 'ProfessionalService',
    'legal': 'LegalService',
    'accounting': 'AccountingService',
  };

  return categoryMap[category.toLowerCase()] || 'LocalBusiness';
}
