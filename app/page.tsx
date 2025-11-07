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
    url: "https://citywitty.com",
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
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "CityWitty",
  creator: "CityWitty Team",
  publisher: "CityWitty",
  metadataBase: new URL("https://citywitty.com"),
  alternates: {
    canonical: "https://citywitty.com",
  },
  category: "Discount Platform",
  other: {
    "contact:phone": "+91-6389202030",
    "contact:email": "contact@citywitty.com",
    "contact:address":
      "Unit 316 & 317, P-3, 3rd Floor, Paramount Golf Foreste, Greater Noida, 201311, India",
    "contact:whatsapp": "https://wa.me/916389202030",
    "social:facebook":
      "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr",
    "social:twitter": "https://twitter.com/citywitty",
    "social:instagram": "https://www.instagram.com/citywitty.in",
    "social:linkedin": "https://www.linkedin.com/company/citywitty",
    "social:youtube": "https://youtube.com/@citywitty3546",
  },
};


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CWStore />
      {/* <MerchantCarousel /> */}

      <TestimonialsCarousel />
      <CategoriesSection />
      <CitiesPresence />
      <CallToActionSection />
      <FeaturedMerchantsServer />
      <Footer />
    </main>
  );
}
