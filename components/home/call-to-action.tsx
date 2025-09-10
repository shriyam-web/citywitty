// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { ArrowRight, CreditCard, Gift } from 'lucide-react';

// export function CallToActionSection() {
//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-black/20" />
//       <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
//       <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="text-center space-y-8">
//           <div className="space-y-4">
//             <h2 c
// lassName="text-4xl lg:text-5xl font-bold text-white">
//               Ready to Start Saving?
//             </h2>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Join thousands of smart shoppers who are already enjoying exclusive discounts
//               across India with CityWitty premium card.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <div className="flex items-center space-x-2 text-white">
//               <CreditCard className="h-5 w-5" />
//               <span>Instant Activation</span>
//             </div>
//             <div className="flex items-center space-x-2 text-white">
//               <Gift className="h-5 w-5" />
//               <span>Exclusive Offers</span>
//             </div>
//             <div className="flex items-center space-x-2 text-white">
//               <ArrowRight className="h-5 w-5" />
//               <span>Easy Process</span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Button
//               size="lg"
//               className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
//               asChild
//             >
//               <Link href="/get-card">
//                 Get Your Card Now
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-dark hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
//               asChild
//             >
//               <Link href="/merchants">
//                 Explore Merchants
//               </Link>
//             </Button>
//           </div>

//           <div className="pt-8 border-t border-white/20">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-1">1000+</div>
//                 <div className="text-blue-100 text-sm">Partner Merchants</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-1">20+</div>
//                 <div className="text-blue-100 text-sm">Cities Covered</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-1">50K+</div>
//                 <div className="text-blue-100 text-sm">Happy Customers</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CreditCard, Gift, Zap, Star, Crown, CheckCircle } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Floating Icons */}
      <div className="absolute top-20 left-[20%] animate-bounce delay-1000">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          <Gift className="h-6 w-6 text-orange-400" />
        </div>
      </div>
      <div className="absolute top-32 right-[25%] animate-bounce delay-2000">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          <Zap className="h-5 w-5 text-blue-400" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[30%] animate-bounce delay-3000">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          <Crown className="h-7 w-7 text-yellow-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-12">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-orange-400/30">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Join 50,000+ Smart Shoppers</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Start
              <span className="block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Saving Big?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of smart shoppers who are already enjoying exclusive discounts
              across India with CityWitty premium card. Start your savings journey today!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: CreditCard, title: 'Instant Activation', desc: 'Get started in minutes' },
              { icon: Gift, title: 'Exclusive Offers', desc: 'Up to 50% off premium brands' },
              { icon: CheckCircle, title: 'Lifetime Validity', desc: 'No expiry, use anytime' }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-blue-200 text-sm">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-10 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
              asChild
            >
              <Link href="/get-card">
                <CreditCard className="mr-2 h-5 w-5" />
                Get Your Card Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 font-semibold px-10 py-4 text-lg backdrop-blur-sm rounded-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/merchants">
                <Gift className="mr-2 h-5 w-5" />
                Explore Merchants
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { value: '1000+', label: 'Partner Merchants', icon: CheckCircle },
                { value: '20+', label: 'Cities Covered', icon: Star },
                { value: '₹10Cr+', label: 'Total Savings', icon: Gift }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-3">
                      <IconComponent className="h-6 w-6 text-orange-400 mr-2" />
                      <div className="text-3xl lg:text-4xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-blue-200 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Verified Merchants</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}