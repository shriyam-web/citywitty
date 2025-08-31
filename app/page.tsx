import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { MerchantCarousel } from '@/components/home/merchant-carousel';
import { FeaturedMerchants } from '@/components/home/featured-merchants';
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel';
import { CategoriesSection } from '@/components/home/categories-section';
import { CitiesPresence } from '@/components/home/cities-presence';
import { CallToActionSection } from '@/components/home/call-to-action';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      <HeroSection />
      <MerchantCarousel />
      <FeaturedMerchants />
      <TestimonialsCarousel />
      <CategoriesSection />
      <CitiesPresence />
      <CallToActionSection />
      <Footer />
    </main>
  );
}