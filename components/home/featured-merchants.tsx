import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const featuredMerchants = [
  {
    id: 1,
    name: 'Royal Palace Hotel',
    category: 'Hotels',
    city: 'Mumbai',
    description: 'Luxury accommodation in the heart of Mumbai with world-class amenities.',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    discount: '30% OFF',
    reviews: 1245
  },
  {
    id: 2,
    name: 'Style Studio Salon',
    category: 'Salon & Spa',
    city: 'Delhi',
    description: 'Premium beauty and wellness services with expert professionals.',
    image: 'https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    discount: '25% OFF',
    reviews: 856
  },
  {
    id: 3,
    name: 'Gadget Galaxy',
    category: 'Electronics',
    city: 'Bangalore',
    description: 'Latest electronics and gadgets at unbeatable prices.',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    discount: '20% OFF',
    reviews: 2130
  }
];

export function FeaturedMerchants() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Merchants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium merchants offering exceptional services and exclusive discounts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredMerchants.map((merchant) => (
            <Card key={merchant.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={merchant.image}
                    alt={merchant.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {merchant.discount}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {merchant.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {merchant.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {merchant.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{merchant.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{merchant.rating}</span>
                      <span className="text-xs text-gray-500">({merchant.reviews})</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/merchants">
              View All Merchants
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}