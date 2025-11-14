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
import { CategoriesCarousel } from './categories-carousel';

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

const categories = [
  {
    name: 'Hotels & Resorts',
    iconName: 'Hotel',
    count: 245,
    available: true,
    color: 'bg-blue-100 text-blue-700',
    description: 'Luxury stays & accommodations'
  },
  {
    name: 'Salon & Spa',
    iconName: 'Scissors',
    count: 189,
    available: true,
    color: 'bg-pink-100 text-pink-700',
    description: 'Beauty & wellness services'
  },
  {
    name: 'Electronics',
    iconName: 'Smartphone',
    count: 156,
    available: true,
    color: 'bg-purple-100 text-purple-700',
    description: 'Latest gadgets & devices'
  },
  {
    name: 'Fashion & Apparel',
    iconName: 'ShirtIcon',
    count: 201,
    available: true,
    color: 'bg-orange-100 text-orange-700',
    description: 'Trendy clothing & accessories'
  },
  {
    name: 'Restaurants & Dining',
    iconName: 'UtensilsCrossed',
    count: 167,
    available: true,
    color: 'bg-green-100 text-green-700',
    description: 'Fine dining experiences'
  },
  {
    name: 'Automotive',
    iconName: 'Car',
    count: 170,
    available: true,
    color: 'bg-red-100 text-red-600',
    description: 'Car services & accessories'
  },
  {
    name: 'Fitness & Gym',
    iconName: 'Dumbbell',
    count: 862,
    available: true,
    color: 'bg-green-100 text-green-600',
    description: 'Health & fitness centers'
  },
  {
    name: 'Education',
    iconName: 'GraduationCap',
    count: 1253,
    available: true,
    color: 'bg-blue-100 text-blue-600',
    description: 'Learning & skill development'
  },
  {
    name: 'Real Estate',
    iconName: 'Building2',
    count: 147,
    available: true,
    color: 'bg-yellow-100 text-yellow-600',
    description: 'Property & rentals'
  },
  {
    name: 'Travel & Tourism',
    iconName: 'Plane',
    count: 63,
    available: true,
    color: 'bg-purple-100 text-purple-600',
    description: 'Tours & travel packages'
  },
  {
    name: 'Gifts & Events',
    iconName: 'Gift',
    count: 86,
    available: true,
    color: 'bg-pink-100 text-pink-600',
    description: 'Event planning & gifts'
  },
  {
    name: 'Healthcare',
    iconName: 'Heart',
    count: 670,
    available: true,
    color: 'bg-teal-100 text-teal-600',
    description: 'Medical & healthcare services'
  }

];

export function CategoriesSection() {
  const renderCategoryCard = (category: typeof categories[0]) => {
    const IconComponent = iconMap[category.iconName];
    return (
      <Card
        key={category.name}
        className={`group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${category.available ? 'hover:bg-blue-50' : 'opacity-60'
          }`}
      >
        <CardContent className="p-3 sm:p-4 md:p-6 text-center space-y-2 sm:space-y-3 md:space-y-4">
          <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-300`}>
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
                <>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs md:text-sm">
                    {category.count} merchants
                  </Badge>
                </>
              ) : (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {/* Coming Soon */}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals across various categories.
          </p>
        </div>

        <CategoriesCarousel categories={categories} />

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            More categories launching every month. Stay tuned for updates!
          </p>
        </div>
      </div>
    </section>
  );
}