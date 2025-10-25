'use client';

import {
  generateLocalBusinessSchema,
  generateProductsSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './seo-helpers';
import type { Merchant } from './types';

export function MerchantStructuredData({ merchant }: { merchant: Merchant }) {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(merchant),
    generateBreadcrumbSchema(merchant),
  ];

  const faqSchema = generateFAQSchema(merchant);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

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