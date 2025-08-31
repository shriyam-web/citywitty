'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const merchants = [
  {
    id: 1,
    name: 'Luxe Hotels & Resorts',
    category: 'Hotels',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '25% OFF',
    rating: 4.8,
    city: 'Mumbai'
  },
  {
    id: 2,
    name: 'TechZone Electronics',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '15% OFF',
    rating: 4.6,
    city: 'Delhi'
  },
  {
    id: 3,
    name: 'Bliss Spa & Wellness',
    category: 'Salon & Spa',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '30% OFF',
    rating: 4.9,
    city: 'Bangalore'
  },
  {
    id: 4,
    name: 'Fashion Forward',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '20% OFF',
    rating: 4.7,
    city: 'Chennai'
  },
  {
    id: 5,
    name: 'Gourmet Delights',
    category: 'Restaurants',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '35% OFF',
    rating: 4.8,
    city: 'Pune'
  }
];

export function MerchantCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Merchants
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing deals from our top-rated partners
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {merchants.map((merchant) => (
              <div key={merchant.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
                <Card className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 bg-white shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={merchant.image}
                        alt={merchant.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {merchant.discount}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {merchant.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {merchant.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{merchant.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{merchant.city}</span>
                        <Button size="sm" variant="outline" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}