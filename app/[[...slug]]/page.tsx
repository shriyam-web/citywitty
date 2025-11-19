import { notFound, redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { MerchantCarousel } from '@/components/home/merchant-carousel';
import { FeaturedMerchantsServer } from '@/components/home/featured-merchants-server';
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel';
import { CategoriesSection } from '@/components/home/categories-section';
import { CitiesPresence } from '@/components/home/cities-presence';
import { CallToActionSection } from '@/components/home/call-to-action';
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner';
import type { IPartner } from '@/models/partner/partner/partner.interface';

const CWStore = dynamic(() => import('@/components/store/page'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
});

export const metadata: Metadata = {
  title: "CityWitty - Premium Discount Card Platform",
  description:
    "Discover exclusive discounts with CityWitty Card. Save on dining, shopping, hotels, salons & entertainment across India.",
  keywords:
    "discount card, exclusive deals, city discounts, restaurant offers, hotel discounts, shopping deals, salon discounts, entertainment offers, premium card, CityWitty",
  authors: [{ name: "CityWitty Team", url: "https://citywitty.com" }],
  openGraph: {
    title: "CityWitty - Premium Discount Card Platform",
    description:
      "Unlock exclusive offers with CityWitty. Partnered with top merchants across categories like restaurants, hotels, shopping, salons, and entertainment.",
    url: "https://www.citywitty.com/",
    siteName: "CityWitty",
    images: [
      {
        url: "https://citywitty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CityWitty Discount Card - Save More with Premium Offers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@citywitty",
    title: "CityWitty - Premium Discount Card Platform",
    description:
      "Exclusive merchant offers across multiple cities. Save big on restaurants, shopping, hotels, salons, and entertainment with CityWitty.",
    images: ["https://citywitty.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const revalidate = 0;

async function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MerchantCarousel />
        <FeaturedMerchantsServer />
        <TestimonialsCarousel />
        <CategoriesSection />
        <CitiesPresence />
        <CallToActionSection />
        <CWStore />
      </main>
      <Footer />
    </>
  );
}

export default async function CatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  // If no slug, show home page
  if (!params.slug || params.slug.length === 0) {
    return <HomePage />;
  }

  // Only handle single-segment paths (potential usernames)
  if (params.slug.length !== 1) {
    notFound();
  }

  const potentialUsername = params.slug[0];

  // Validate username format (alphanumeric, underscore, hyphen, dots)
  if (!/^[a-z0-9._-]+$/i.test(potentialUsername)) {
    notFound();
  }

  try {
    await dbConnect();
    const merchant = await Partner.findOne({
      username: potentialUsername,
      status: 'active',
    }).lean() as unknown as IPartner | null;

    if (merchant && merchant.merchantSlug) {
      redirect(`/merchants/${merchant.merchantSlug}`);
    }

    notFound();
  } catch (error) {
    console.error('[catch-all] Error looking up username:', error);
    notFound();
  }
}
