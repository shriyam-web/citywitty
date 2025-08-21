'use client';

import React from 'react';
import HeroCarousel from '@/components/Home/HeroCarousel';
import HeroSection from '@/components/Home/HeroSection';
import CitySelector from '@/components/Home/CitySelector';
import CategoriesGrid from '@/components/Home/CategoriesGrid';
import MerchantsCarousel from '@/components/Home/MerchantsCarousel';
import HowItWorks from '@/components/Home/HowItWorks';
import TestimonialsSlider from '@/components/Home/TestimonialsSlider';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroCarousel />
      <HeroSection />
      <div className="container py-5">
        <CitySelector />
        <CategoriesGrid />
        <MerchantsCarousel />
      </div>
      <HowItWorks />
      <div className="container py-5">
        <TestimonialsSlider />
      </div>
    </>
  );
};

export default HomePage;