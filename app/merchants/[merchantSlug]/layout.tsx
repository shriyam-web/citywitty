import { Metadata, ResolvingMetadata } from 'next';
import {
  generateLocalBusinessSchema,
  generateProductsSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './seo-helpers';
import type { Merchant } from './types';

interface Props {
  params: { merchantSlug: string };
  children: React.ReactNode;
}

/**
 * Fetch merchant data server-side for metadata generation
 * This ensures SEO data is available during build/on-demand ISR
 */
async function getMerchantData(merchantSlug: string): Promise<Merchant | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/merchants/${merchantSlug}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // ISR - revalidate every 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch merchant for metadata:', error);
    return null;
  }
}

/**
 * Generate dynamic metadata for each merchant page
 * This is critical for SEO - each merchant gets unique meta tags
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const merchant = await getMerchantData(params.merchantSlug);

  if (!merchant) {
    return {
      title: 'Merchant Not Found | CityWitty',
      description: 'The merchant you are looking for does not exist.',
      robots: 'noindex, nofollow',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://citywitty.com';
  const canonicalUrl = `${baseUrl}/merchants/${merchant.merchantSlug}`;
  const ratingValue = merchant.averageRating ? merchant.averageRating.toFixed(1) : null;
  const ratingCount = merchant.ratings?.length ?? 0;

  // Construct compelling meta description
  const metaDescription =
    `${merchant.displayName} in ${merchant.city} - ${merchant.category}. `
    + (ratingValue ? `${ratingValue}/5 stars (${ratingCount} reviews). ` : '')
    + (merchant.offlineDiscount?.length ? `${merchant.offlineDiscount.length} exclusive deals. ` : '')
    + `Contact: ${merchant.phone}. ${merchant.description?.substring(0, 80)}...`;

  // Construct title with SEO-friendly format
  const metaTitle =
    `${merchant.displayName} - ${merchant.category} in ${merchant.city} | CityWitty`
    + (merchant.topRated ? ' | Top Rated' : '')
    + (merchant.verified ? ' | Verified' : '');

  return {
    // Basic Meta Tags
    title: metaTitle,
    description: metaDescription.substring(0, 160), // Google's recommended length
    keywords: [
      merchant.displayName,
      merchant.category,
      merchant.city,
      'local business',
      ...(merchant.tags || []),
    ].join(', '),

    // Canonical URL - prevent duplicate content issues
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph - for social media sharing
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription.substring(0, 160),
      url: canonicalUrl,
      siteName: 'CityWitty',
      images: merchant.storeImages?.[0] || merchant.logo
        ? [
          {
            url: merchant.storeImages?.[0] || merchant.logo || '',
            width: 1200,
            height: 630,
            alt: `${merchant.displayName} storefront`,
            type: 'image/jpeg',
          },
        ]
        : undefined,
      locale: 'en_IN',
    },

    // Twitter Card - for Twitter/X sharing
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription.substring(0, 160),
      images: merchant.storeImages?.[0] || merchant.logo ? [merchant.storeImages?.[0] || merchant.logo || ''] : undefined,
      creator: '@CityWitty',
    },

    // Robots directives
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },

    // Mobile and viewport optimizations
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',

    // Additional SEO
    authors: [{ name: 'CityWitty' }],
    creator: 'CityWitty',
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },

    // Verification and tracking
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

/**
 * Static parameters generation for dynamic routes
 * This helps Next.js optimize build time for popular merchants
 */
export async function generateStaticParams() {
  // You can fetch popular merchants from your API
  // This is optional but recommended for better SEO
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/merchants?limit=50`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const merchants = (await response.json()) as Array<{ merchantSlug: string }>;
    return merchants.map((merchant) => ({
      merchantSlug: merchant.merchantSlug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default function MerchantLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}