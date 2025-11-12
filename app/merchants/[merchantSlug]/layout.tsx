import { Metadata, ResolvingMetadata } from 'next';
import {
  generateLocalBusinessSchema,
  generateProductsSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './seo-helpers';
import type { Merchant } from './types';
import { Nothing_You_Could_Do } from 'next/font/google';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

interface Props {
  params: { merchantSlug: string };
  children: React.ReactNode;
}

/**
 * Fetch merchant data server-side for metadata generation
 * This ensures SEO data is available during build/on-demand ISR
 */
function resolveBaseUrl(): string {
  const explicitUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitUrl) {
    if (explicitUrl.startsWith('http://') || explicitUrl.startsWith('https://')) {
      return explicitUrl;
    }
    return `https://${explicitUrl}`;
  }
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    if (vercelUrl.startsWith('http://') || vercelUrl.startsWith('https://')) {
      return vercelUrl;
    }
    return `https://${vercelUrl}`;
  }
  return 'http://localhost:3000';
}

async function getMerchantData(merchantSlug: string): Promise<Merchant | null> {
  try {
    // Try direct database query first (more reliable for metadata generation)
    console.log(`[Metadata] Fetching merchant data from database for slug: ${merchantSlug}`);

    await dbConnect();
    const merchant = await Partner.findOne({
      merchantSlug,
      status: "active"
    }).lean() as unknown as IPartner | null;

    if (merchant) {
      console.log(`[Metadata] Successfully fetched merchant from DB: ${merchant.displayName}`);
      return JSON.parse(JSON.stringify(merchant)) as Merchant;
    }

    // Fallback to API fetch if database query fails
    console.log(`[Metadata] Merchant not found in DB, trying API fallback`);
    const baseUrl = resolveBaseUrl();
    const apiUrl = new URL(`/api/merchants/${merchantSlug}`, baseUrl).toString();

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[Metadata] Merchant API returned ${response.status} for slug: ${merchantSlug}`);
      return null;
    }

    const data = await response.json();
    console.log(`[Metadata] Successfully fetched merchant from API: ${data.displayName}`);
    return data;
  } catch (error) {
    console.error('[Metadata] Failed to fetch merchant for metadata:', error);
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
    // Create a more user-friendly title using the slug
    const formattedSlug = params.merchantSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${formattedSlug} | CityWitty`,
      description: `Discover ${formattedSlug} on CityWitty - Your local business directory with exclusive deals and discounts.`,
      robots: 'noindex, nofollow',
    };
  }

  const baseUrl = resolveBaseUrl();
  const slug = merchant.merchantSlug || params.merchantSlug;
  const canonicalUrl = new URL(`/merchants/${slug}`, baseUrl).toString();
  const ratingValue = merchant.averageRating ? merchant.averageRating.toFixed(1) : null;
  const ratingCount = merchant.ratings?.length ?? 0;
  const metaDescription =
    `${merchant.displayName} in ${merchant.city} - ${merchant.category}. `
    + (ratingValue ? `${ratingValue}/5 stars (${ratingCount} reviews). ` : '')
    + (merchant.offlineDiscount?.length ? `${merchant.offlineDiscount.length} exclusive deals. ` : '')
    + `Contact: ${merchant.phone}. ${merchant.description?.substring(0, 80)}...`;
  const metaTitle =
    `${merchant.displayName} - ${merchant.category} in ${merchant.city} | CityWitty`
    + (merchant.topRated ? ' | Top Rated' : '')
    + (merchant.isVerified ? ' | Verified' : '');
  const primaryImage = merchant.storeImages?.[0] || merchant.logo || '';
  const resolvedImage = primaryImage ? new URL(primaryImage, baseUrl).toString() : undefined;
  const tags = merchant.tags?.map((tag) => tag?.trim()).filter((tag): tag is string => Boolean(tag)) ?? [];
  const relatedTerms = Array.isArray(merchant.relatedSearches)
    ? merchant.relatedSearches.map((term: unknown) => typeof term === 'string' ? term.trim() : '').filter((term): term is string => Boolean(term))
    : [];
  const keywordSet = new Set<string>([
    merchant.displayName,
    merchant.category,
    merchant.city,
    'local business',
    ...tags,
    ...relatedTerms,
  ]);
  const keywords = Array.from(keywordSet);
  const primaryBranch = merchant.branchLocations?.[0];
  const countryName = primaryBranch?.country;

  return {
    metadataBase: new URL(baseUrl),
    title: metaTitle,
    description: metaDescription.substring(0, 160),
    keywords,
    applicationName: 'CityWitty',
    category: merchant.category,
    classification: merchant.category,
    publisher: 'CityWitty',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        'en': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      type: 'profile',
      title: metaTitle,
      description: metaDescription.substring(0, 160),
      url: canonicalUrl,
      siteName: 'CityWitty',
      images: resolvedImage
        ? [
          {
            url: resolvedImage,
            width: 1200,
            height: 630,
            alt: `${merchant.displayName} storefront`,
            type: 'image/jpeg',
          },
        ]
        : undefined,
      locale: 'en_IN',
      alternateLocale: ['en_US'],
      emails: merchant.email ? [merchant.email] : undefined,
      phoneNumbers: merchant.phone ? [merchant.phone] : undefined,
      firstName: merchant.displayName,
      lastName: merchant.businessName || merchant.displayName,
      username: slug,
      countryName,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription.substring(0, 160),
      images: resolvedImage ? [resolvedImage] : undefined,
      site: '@CityWitty',
      creator: '@CityWitty',

    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    authors: [{ name: 'CityWitty' }],
    creator: 'CityWitty',
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}



export default function MerchantLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}