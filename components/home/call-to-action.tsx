import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CreditCard, Gift } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of smart shoppers who are already enjoying exclusive discounts 
              across India with CityWitty premium card.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2 text-white">
              <CreditCard className="h-5 w-5" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Gift className="h-5 w-5" />
              <span>Exclusive Offers</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <ArrowRight className="h-5 w-5" />
              <span>Easy Process</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link href="/get-card">
                Get Your Card Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link href="/merchants">
                Explore Merchants
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-blue-100 text-sm">Partner Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">20+</div>
                <div className="text-blue-100 text-sm">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-blue-100 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}