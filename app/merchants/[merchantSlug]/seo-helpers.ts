import type { Merchant, MerchantProduct } from './types';

/**
 * Generate LocalBusiness JSON-LD structured data
 * Helps Google understand merchant info: location, hours, ratings, contact
 */
export function generateLocalBusinessSchema(merchant: Merchant): Record<string, unknown> {
  const ratingValue = merchant.averageRating ?? null;
  const ratingCount = merchant.ratings?.length ?? 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: merchant.displayName,
    description: merchant.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com'}/merchants/${merchant.merchantSlug}`,
    image: merchant.logo || `${process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com'}/og-image.png`,
    telephone: merchant.phone,
    email: merchant.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: merchant.streetAddress,
      addressLocality: merchant.city,
      addressCountry: 'IN',
      postalCode: merchant.branchLocations?.[0]?.pincode || '',
    },
    geo: merchant.latitude && merchant.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: merchant.latitude,
      longitude: merchant.longitude,
    } : undefined,
    ...(merchant.website && { sameAs: merchant.website }),
    ...(ratingValue && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratingValue.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: ratingCount,
      },
    }),
    ...(merchant.businessHours && {
      openingHoursSpecification: merchant.businessHours.days?.map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day,
        opens: merchant.businessHours?.open || '09:00',
        closes: merchant.businessHours?.close || '18:00',
      })) || [],
    }),
    priceRange: '$',
    ...(merchant.offlineDiscount && merchant.offlineDiscount.length > 0 && {
      makesOffer: merchant.offlineDiscount
        .filter(offer => offer.status === 'Active' && new Date(offer.validUpto) > new Date())
        .map(offer => ({
          '@type': 'Offer',
          name: offer.offerTitle,
          description: offer.offerDescription,
          priceCurrency: 'INR',
          discount: `${offer.discountPercent}%`,
          validFrom: new Date().toISOString(),
          validThrough: new Date(offer.validUpto).toISOString(),
        })) || [],
    }),
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

/**
 * Generate Organization JSON-LD for CityWitty brand
 * Helps search engines understand the platform's identity
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CityWitty',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com'}/logo.png`,
    description: 'Discover local businesses, merchants, and exclusive deals in your city',
    sameAs: [
      'https://www.facebook.com/citywitty',
      'https://www.instagram.com/citywitty',
      'https://www.twitter.com/citywitty',
    ],
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