'use client';

import {
  generateLocalBusinessSchema,
  generateProductsSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateAggregateOfferSchema,
  generateOfflineProductsSchema,
} from './seo-helpers';
import type { Merchant } from './types';

type ExternalOfflineProduct = {
  productName?: string;
  description?: string;
  imageUrls?: string[];
  brand?: string;
  offerPrice?: number;
  price?: number;
  status?: string;
  availableStock?: number;
};

export function MerchantStructuredData({ merchant, offlineProducts }: { merchant: Merchant; offlineProducts?: ExternalOfflineProduct[] }) {
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateLocalBusinessSchema(merchant),
    generateBreadcrumbSchema(merchant),
  ];

  // Add FAQ schema if available
  const faqSchema = generateFAQSchema(merchant);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  // Add Review schemas if available
  const reviewSchemas = generateReviewSchema(merchant);
  if (reviewSchemas && reviewSchemas.length > 0) {
    schemas.push(...reviewSchemas);
  }

  // Add AggregateOffer schema if available
  const aggregateOfferSchema = generateAggregateOfferSchema(merchant);
  if (aggregateOfferSchema) {
    schemas.push(aggregateOfferSchema);
  }

  // Add Product schemas if available
  if (merchant.products && merchant.products.length > 0) {
    schemas.push(...generateProductsSchema(merchant, merchant.products));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
}