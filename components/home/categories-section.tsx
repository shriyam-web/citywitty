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

const categories = [
  { 
    name: 'Hotels & Resorts', 
    icon: Hotel, 
    count: 245, 
    available: true,
    color: 'bg-blue-100 text-blue-700',
    description: 'Luxury stays & accommodations'
  },
  { 
    name: 'Salon & Spa', 
    icon: Scissors, 
    count: 189, 
    available: true,
    color: 'bg-pink-100 text-pink-700',
    description: 'Beauty & wellness services'
  },
  { 
    name: 'Electronics', 
    icon: Smartphone, 
    count: 156, 
    available: true,
    color: 'bg-purple-100 text-purple-700',
    description: 'Latest gadgets & devices'
  },
  { 
    name: 'Fashion & Apparel', 
    icon: ShirtIcon, 
    count: 201, 
    available: true,
    color: 'bg-orange-100 text-orange-700',
    description: 'Trendy clothing & accessories'
  },
  { 
    name: 'Restaurants & Dining', 
    icon: UtensilsCrossed, 
    count: 167, 
    available: true,
    color: 'bg-green-100 text-green-700',
    description: 'Fine dining experiences'
  },
  { 
    name: 'Automotive', 
    icon: Car, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Car services & accessories'
  },
  { 
    name: 'Fitness & Gym', 
    icon: Dumbbell, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Health & fitness centers'
  },
  { 
    name: 'Education', 
    icon: GraduationCap, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Learning & skill development'
  },
  { 
    name: 'Real Estate', 
    icon: Building2, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Property & rentals'
  },
  { 
    name: 'Travel & Tourism', 
    icon: Plane, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Tours & travel packages'
  },
  { 
    name: 'Gifts & Events', 
    icon: Gift, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Event planning & gifts'
  },
  { 
    name: 'Healthcare', 
    icon: Heart, 
    count: 0, 
    available: false,
    color: 'bg-gray-100 text-gray-500',
    description: 'Medical & healthcare services'
  }
];

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals across various categories. More categories coming soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.name} 
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  category.available ? 'hover:bg-blue-50' : 'opacity-60'
                }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2">
                      {category.available ? (
                        <>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {category.count} merchants
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            More categories launching every month. Stay tuned for updates!
          </p>
        </div>
      </div>
    </section>
  );
}