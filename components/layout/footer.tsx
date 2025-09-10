// import Link from "next/link";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <img
//               src="/citywittynew.png"
//               alt="CityWitty Logo"
//               className="h-12 w-auto"
//             />
//             <p className="text-gray-400 text-sm">
//               Premium discount card platform offering exclusive deals from
//               partnered merchants across India.
//             </p>
//             {/* <div className="flex space-x-4">
//               <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//             </div> */}
//             <div className="flex space-x-4">
//               <a
//                 href="https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               </a>
//               <a
//                 href="https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               </a>
//               <a
//                 href="https://youtube.com/@citywitty3546?si=IfcAhXmKq9vmIfA8"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {/* YouTube ka icon lucide-react me nahi hota, tumhe koi aur import karna padega */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M23.498 6.186a2.987 2.987 0 0 0-2.103-2.115C19.477 3.5 12 3.5 12 3.5s-7.477 0-9.395.571A2.987 2.987 0 0 0 .502 6.186 31.44 31.44 0 0 0 0 12a31.44 31.44 0 0 0 .502 5.814 2.987 2.987 0 0 0 2.103 2.115C4.523 20.5 12 20.5 12 20.5s7.477 0 9.395-.571a2.987 2.987 0 0 0 2.103-2.115A31.44 31.44 0 0 0 24 12a31.44 31.44 0 0 0-.502-5.814ZM9.75 15.02V8.98l6.5 3.02-6.5 3.02Z" />
//                 </svg>
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/citywitty" // agar LinkedIn bhi add karna ho
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Quick Links</h3>
//             <div className="space-y-2">
//               <Link
//                 href="/"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/merchants"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Merchants
//               </Link>
//               <Link
//                 href="/get-card"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Get Card
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 About Us
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>

//           {/* Support */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Support</h3>
//             <div className="space-y-2">
//               <Link
//                 href="/activate-track"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Activate & Track
//               </Link>
//               <Link
//                 href="/help"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Help Center
//               </Link>
//               <Link
//                 href="/privacy"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href="/terms"
//                 className="text-gray-400 hover:text-white transition-colors text-sm block"
//               >
//                 Terms & Conditions
//               </Link>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Contact Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-400 text-sm">+91 6389202030</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-400 text-sm">
//                   contact@citywitty.com
//                 </span>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
//                 <span className="text-gray-400 text-sm">
//                   Explore our offices across India
//                   <br />
//                   {/* Mumbai, Maharashtra 400001 */}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <p className="text-gray-400 text-sm">
//             © 2025 CityWitty. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Crown, Heart, Shield, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 flex items-center justify-center">
                  <Crown className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  CityWitty
                </span>
                <div className="text-xs text-gray-400">Premium Discounts</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's premier discount card platform offering exclusive deals from verified merchants across the nation. Experience luxury for less.
            </p>

            {/* Premium Features */}
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'Verified Merchants' },
                { icon: Zap, text: 'Instant Activation' },
                { icon: Heart, text: '24/7 Support' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <IconComponent className="h-4 w-4 text-blue-400" />
                    <span>{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-600/20 flex items-center justify-center border border-white/10 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Merchants', href: '/merchants' },
                { name: 'Get Card', href: '/get-card' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-sm group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-orange-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Support
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Activate & Track', href: '/activate-track' },
                { name: 'Help Center', href: '/help' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms & Conditions', href: '/terms' },
                { name: 'Partner With Us', href: '/partner' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-sm group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-orange-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {[
                { icon: Phone, text: '+91 9876543210', href: 'tel:+919876543210' },
                { icon: Mail, text: 'support@citywitty.com', href: 'mailto:support@citywitty.com' }
              ].map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-600/20 flex items-center justify-center border border-white/10 group-hover:border-blue-400 transition-all duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-sm">{contact.text}</span>
                  </a>
                );
              })}

              <div className="flex items-start space-x-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-600/20 flex items-center justify-center border border-white/10 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white mb-1">Head Office</div>
                  <div>123 Business District<br />Mumbai, Maharashtra 400001</div>
                </div>
              </div>
            </div>

            {/* 24/7 Support Badge */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 text-center">
              <div className="text-green-400 font-bold text-sm">24/7 Support Available</div>
              <div className="text-green-300 text-xs mt-1">We're here to help you anytime</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 CityWitty. All rights reserved. Made with ❤️ in India.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}