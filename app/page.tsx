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
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MerchantCarousel />
      {/* <FeaturedMerchants /> */}
      <TestimonialsCarousel />
      <CategoriesSection />
      <CitiesPresence />
      <CallToActionSection />
      <Footer />
    </main>
  );
}