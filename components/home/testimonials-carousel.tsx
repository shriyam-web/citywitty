'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    city: 'Mumbai',
    rating: 5,
    text: 'CityWitty has completely transformed my shopping experience. The discounts are genuine and the merchants are top-quality. I\'ve saved thousands of rupees!',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    city: 'Delhi',
    rating: 5,
    text: 'As a frequent traveler, CityWitty has been my go-to for hotel bookings and dining. The premium card pays for itself with just a few uses.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Anita Desai',
    city: 'Bangalore',
    rating: 5,
    text: 'The spa and wellness deals are incredible! I regularly book appointments through CityWitty and the service quality is always exceptional.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    city: 'Chennai',
    rating: 5,
    text: 'CityWitty\'s electronics deals helped me upgrade my entire home setup at amazing prices. The partner merchants are reliable and authentic.',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who are saving money and enjoying premium services
          </p>
        </div>

        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] px-4">
                  <Card className="h-full bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <Quote className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="space-y-4">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            "{testimonial.text}"
                          </p>
                          
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold text-gray-900">{testimonial.name}</div>
                              <div className="text-sm text-gray-600">{testimonial.city}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button variant="outline" size="sm" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}