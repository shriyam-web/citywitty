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
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "CityWitty",
  creator: "CityWitty Team",
  publisher: "CityWitty",
  metadataBase: new URL("https://citywitty.com"),
  alternates: {
    canonical: "https://www.citywitty.com/",
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
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">CityWitty - Premium Discount Card Platform</h1>

          <p className="text-lg text-gray-700 mb-6">
            Welcome to CityWitty, India's premier premium discount card platform. Our mission is to help you save money on everyday purchases by providing exclusive discounts and special offers from thousands of verified merchants across the country.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Exclusive Deals & Discounts</h2>
          <p className="text-gray-700 mb-6">
            CityWitty offers unbeatable deals up to 70% off across multiple categories. Browse our <a href="/merchants" className="text-blue-600 hover:underline">merchant partners</a> for exclusive offers in fashion, dining, restaurants, travel, hotels, wellness, salons, and entertainment. Find <a href="/merchants" className="text-blue-600 hover:underline">restaurant offers</a>, hotel discounts, shopping deals, salon services, and entertainment packages tailored for you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Choose CityWitty?</h2>
          <p className="text-gray-700 mb-6">
            Our premium discount card is designed for savvy shoppers who want to maximize their savings. With CityWitty Card, you <a href="/get-card" className="text-blue-600 hover:underline">get instant access</a> to exclusive deals from partner brands across India's major cities. Join thousands of active members who are already enjoying incredible savings with our discount card platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Strategic Merchant Partnerships</h2>
          <p className="text-gray-700 mb-6">
            CityWitty combines cutting-edge technology with strategic merchant partnerships to bring you the best discount card experience. We work with top merchants in hotels, restaurants, shopping centers, beauty salons, travel agencies, and entertainment venues to ensure you get premium offers that matter. Check out our <a href="/merchants" className="text-blue-600 hover:underline">merchant listings</a> to explore opportunities in your city.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Start Saving Today</h2>
          <p className="text-gray-700">
            Experience the power of the CityWitty premium card. <a href="/register" className="text-blue-600 hover:underline">Get started today</a> and enjoy instant access to exclusive offers, partner deals, and member-only discounts. Whether you're interested in dining discounts, shopping offers, hotel deals, salon services, or entertainment packages, CityWitty delivers value at every transaction. Learn more about <a href="/about" className="text-blue-600 hover:underline">how CityWitty works</a> and unlock a world of premium discounts.
          </p>
        </div>
      </section>
      <CWStore />
      {/* <MerchantCarousel /> */}


      <CategoriesSection />
      <CitiesPresence />
      <CallToActionSection />
      <FeaturedMerchantsServer />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
}
