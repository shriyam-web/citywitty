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
  Heart
} from 'lucide-react';
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
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' });

  return (
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
  );
}
