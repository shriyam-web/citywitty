// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { SupportWidget } from '@/components/support-widget';
// import { Providers } from './providers'; // 👈 yahan import
// import toast from "react-hot-toast";  // ✅ import
// import { Toaster } from "react-hot-toast";
// import Script from "next/script";

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'CityWitty - Premium Discount Card Platform',
//   description: 'Get exclusive offers from partnered merchants across various categories and cities with CityWitty discount card.',
//   keywords: 'discount card, offers, merchants, city deals, exclusive discounts',
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>

//         <link rel="icon" href="/favicon.ico" />
//         {/* ✅ JSON-LD Structured Data */}
//         <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Organization",
//             name: "CityWitty",
//             url: "https://citywitty.com",
//             logo: "https://citywitty.com/logo.png",
//             sameAs: [
//               "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr",
//               "https://twitter.com/citywitty",
//               "https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0",
//               "https://www.linkedin.com/company/citywitty",
//               "https://youtube.com/@citywitty3546",
//               "https://wa.me/916389202030"
//             ],
//             contactPoint: [
//               {
//                 "@type": "ContactPoint",
//                 telephone: "+91-6389202030",
//                 contactType: "customer support",
//                 email: "contact@citywitty.com",
//                 areaServed: "IN",
//                 availableLanguage: ["English", "Hindi"]
//               }
//             ],
//             address: {
//               "@type": "PostalAddress",
//               streetAddress:
//                 "Unit 316 & 317, P-3, 3rd Floor, Paramount Golf Foreste",
//               addressLocality: "Greater Noida",
//               postalCode: "201311",
//               addressCountry: "IN"
//             }
//           })}
//         </Script>

//       </head>
//       <body className={inter.className}>
//         <Providers>
//           {children}
//           <SupportWidget />
//           <Toaster position="top-right" reverseOrder={false} />
//         </Providers>
//       </body>
//     </html>
//   );
// }

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SupportWidget } from '@/components/support-widget';
import { Providers } from './providers';
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CityWitty - Premium Discount Card Platform',
  description: 'Get exclusive offers from partnered merchants across various categories and cities with CityWitty discount card.',
  keywords: 'discount card, offers, merchants, city deals, exclusive discounts',
  icons: { icon: '/favicon.ico' },
  viewport: 'width=device-width, initial-scale=1', // ✅ viewport meta
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bootstrap CSS CDN */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
        />

        {/* JSON-LD Structured Data */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CityWitty",
            url: "https://citywitty.com",
            logo: "https://citywitty.com/logo.png",
            sameAs: [
              "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr",
              "https://twitter.com/citywitty",
              "https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0",
              "https://www.linkedin.com/company/citywitty",
              "https://youtube.com/@citywitty3546",
              "https://wa.me/916389202030"
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-6389202030",
                contactType: "customer support",
                email: "contact@citywitty.com",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"]
              }
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Unit 316 & 317, P-3, 3rd Floor, Paramount Golf Foreste",
              addressLocality: "Greater Noida",
              postalCode: "201311",
              addressCountry: "IN"
            }
          })}
        </Script>

        <Providers>
          {children}
          <SupportWidget />
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
