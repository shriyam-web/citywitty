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
//             </p>a
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
import { Youtube } from "lucide-react";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    role="img"
  >
    <path
      fill="#25D366"
      d="M16 .4C7.2.4.1 7.6.1 16.5c0 2.9.8 5.7 2.3 8.2L0 32l7.5-2.4c2.3 1.2 4.9 1.8 7.5 1.8h.1c8.9 0 16.1-7.2 16.1-16.1S24.9.4 16 .4z"
    />
    <path
      fill="#FFF"
      d="M24.2 21.7c-.4-1-2.2-2-2.2-2s-1.2-.6-1.6-.8-.9-.1-1.2.4c-.4.5-.7 1-1.1 1.1-.4.1-.7 0-1.1-.2-.3-.2-1.9-.7-3.6-2.4-1.3-1.3-2.2-2.9-2.5-3.4-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8s-1.2-2.9-1.7-3.9c-.4-1-1-1-1.3-1s-.7 0-1 .1c-.3.1-.9.3-1.3.9-.5.6-1.7 1.6-1.7 4s1.8 4.6 2.1 5c.3.4 3.6 5.5 8.6 7.6 1.2.5 2.1.8 2.8 1 .9.3 1.7.3 2.3.2.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.8z"
    />
  </svg>
);



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

                <img
                  src="/logo.png"
                  alt="CityWitty Logo"
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  CityWitty
                </span>
                <div className="text-xs text-gray-400">Privilage Cards</div>
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
            {/* Social Media */}


            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr" },
                { icon: Twitter, href: "https://x.com/CityWitty_India" },
                { icon: Instagram, href: "https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/citywitty-digital-ventures-pvt-ltd/" },
                { icon: Youtube, href: "https://youtube.com/@citywitty3546?si=IfcAhXmKq9vmIfA8" }, // 👈 YouTube
                {
                  icon: WhatsappIcon, href: "https://wa.me/916389202030"
                }, // WhatsApp (replace with actual number)
                { icon: MapPin, href: "https://share.google/BYU7k1Knf0p4WshcS" }, // 👈 Location (Google Maps link)
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-600/20 flex items-center justify-center border border-white/10 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </a>
                );
              })}
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
                {
                  icon: Phone, text: '+91 6389202030', href: 'tel:+916389202030'
                },
                { icon: Mail, text: 'contact@citywitty.com', href: 'mailto:contact@citywitty.com' }
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
                  <div>Unit 316 & 317, P-3, 3rd Floor, Paramount Golf Foreste <br />Greater Noida, 201311</div>
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