'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Hotel,
  Scissors,
  Smartphone,
  ShirtIcon,
  UtensilsCrossed,
  Car,
  Dumbbell,
  GraduationCap,
  Building2,
  Plane,
  Gift,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface CategoryProps {
  name: string;
  iconName: string;
  count: number;
  available: boolean;
  color: string;
  description: string;
}

interface CategoriesCarouselProps {
  categories: CategoryProps[];
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Hotel,
  Scissors,
  Smartphone,
  ShirtIcon,
  UtensilsCrossed,
  Car,
  Dumbbell,
  GraduationCap,
  Building2,
  Plane,
  Gift,
  Heart
};

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!emblaApi) return;
      if (direction === 'left') {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );

  const handleLeftClick = useCallback(() => {
    scroll('left');
  }, [scroll]);

  const handleRightClick = useCallback(() => {
    scroll('right');
  }, [scroll]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {categories.map((category) => {
            const IconComponent = iconMap[category.iconName];
            return (
              <Card
                key={category.name}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-[calc(50%-0.5rem)] ${
                  category.available ? 'hover:bg-blue-50' : 'opacity-60'
                }`}
              >
                <CardContent className="p-3 sm:p-4 md:p-6 text-center space-y-2 sm:space-y-3 md:space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 hidden sm:block">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-center space-x-2">
                      {category.available ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs md:text-sm">
                          {category.count} merchants
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleLeftClick}
        disabled={!canScrollLeft}
        className={`absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full transition-all ${
          canScrollLeft
            ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <button
        onClick={handleRightClick}
        disabled={!canScrollRight}
        className={`absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full transition-all ${
          canScrollRight
            ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
