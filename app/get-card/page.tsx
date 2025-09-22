import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, MessageCircle, Star, Clock, Shield, Gift } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

type Plan = {
  name: string;
  duration: string;
  perYearValue?: number;   // ✅ now optional  // Display value per year
  launchPrice: number;    // Checkout price
  originalPrice: number;  // Total MRP for strikethrough
  features: string[];
  popular: boolean;
  isAssuredGift?: boolean;
};
export const metadata: Metadata = {
  title: "Get CityWitty Card - Unlock Exclusive Discounts & Premium Offers",
  description:
    "Purchase your CityWitty Discount Card today. Choose from Basic, Premium, or Lifetime plans and enjoy exclusive offers on 1000+ merchants across restaurants, shopping, hotels, salons, and entertainment.",
  keywords:
    "buy discount card, CityWitty card, premium offers, exclusive deals, merchant discounts, restaurant offers, shopping deals, hotel discounts, lifetime discount card",
  openGraph: {
    title: "Get CityWitty Card - Unlock Exclusive Discounts & Premium Offers",
    description:
      "Choose from Basic, Premium, or Lifetime CityWitty Cards and enjoy unmatched discounts across 1000+ premium merchants.",
    url: "https://citywitty.com/get-card",
    siteName: "CityWitty",
    images: [
      {
        url: "https://citywitty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CityWitty Card - Unlock Exclusive Discounts",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@citywitty",
    title: "Get CityWitty Card - Unlock Exclusive Discounts & Premium Offers",
    description:
      "Buy your CityWitty Discount Card today. Enjoy exclusive offers across restaurants, hotels, shopping, salons, and entertainment.",
    images: ["https://citywitty.com/og-image.png"],
  },
  alternates: {
    canonical: "https://citywitty.com/get-card",
  },
};

const features = [
  {
    icon: Gift,
    title: "Exclusive Discounts",
    description: "Get up to 50% off on 1000+ restaurants, hotels, salons, and shopping outlets."
  },
  {
    icon: Shield,
    title: "Flexible Validity Plans",
    description: "Choose from 1 Year, 2 Years, or 3 Years validity options as per your needs."
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description: "Your CityWitty card gets activated within 24 hours of purchase."
  },
  {
    icon: Star,
    title: "Premium Support",
    description: "Enjoy priority customer support to resolve your queries quickly."
  },
];


const steps = [
  { step: 1, title: "Contact Us", description: "Click the WhatsApp button to initiate your purchase", icon: MessageCircle },
  { step: 2, title: "Choose Plan", description: "Select your preferred card plan and make payment", icon: CreditCard },
  { step: 3, title: "Get Activated", description: "Receive your digital card within 24 hours", icon: Check },
  { step: 4, title: "Start Saving", description: "Begin enjoying exclusive discounts immediately", icon: Gift },
];

const plans: Plan[] = [
  {
    name: "1 Year",
    duration: "1 Year",
    launchPrice: 1499,
    originalPrice: 2499, // strike-through shows 2-year anchor for discount
    features: [
      "CW Wallet Points on every purchase",
      "Exclusive CW merchant discounts",
      "Priority support for card queries",
      "Get upto 70% off accross CW Verified Merchants"
    ],
    popular: false,
    isAssuredGift: false
  },
  {
    name: "2 Year",
    duration: "2 Years",
    perYearValue: 1249,
    launchPrice: 2499,
    originalPrice: 2499 * 2, // ₹4998
    features: [
      "CW Wallet Points on every purchase",
      "Exclusive CW merchant discounts",
      "Priority support for card queries",
      "Get upto 70% off accross CW Verified Merchants",
      "Highest savings locked for 24 months"
    ],
    popular: true,
    isAssuredGift: true
  },
  {
    name: "3 Year",
    duration: "3 Years",
    perYearValue: 1099,
    launchPrice: 3299,
    originalPrice: 2499 * 3, // ₹7497
    features: [
      "CW Wallet Points on every purchase",
      "Exclusive CW merchant discounts",
      "Priority support for card queries",
      "Get upto 70% off accross CW Verified Merchants",
      "Highest savings locked for 36 months"
    ],
    popular: true,
    isAssuredGift: true
  }
];



export default function GetCardPage() {




  const whatsAppMessage =
    "Hi! I want to purchase a CityWitty discount card. Please provide me with more details and help me with the process.";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ JSON-LD Structured Data */}
      <Script
        id="jsonld-getcard"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                url: "https://citywitty.com",
                name: "CityWitty",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://citywitty.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                name: "CityWitty",
                url: "https://citywitty.com",
                logo: "https://citywitty.com/logo.png",
                sameAs: [
                  "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr",
                  "https://twitter.com/citywitty",
                  "https://www.instagram.com/citywitty.in",
                  "https://www.linkedin.com/company/citywitty",
                  "https://youtube.com/@citywitty3546",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-6389202030",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: "en",
                },
              },
              {
                "@type": "Product",
                name: "CityWitty Discount Card",
                image: "https://citywitty.com/og-image.png",
                description:
                  "Unlock exclusive discounts at 1000+ premium merchants with CityWitty Discount Card. Available in Basic, Premium, and Lifetime plans.",
                brand: { "@type": "Brand", name: "CityWitty" },
                offers: [
                  { "@type": "Offer", url: "https://citywitty.com/get-card", priceCurrency: "INR", price: "999", priceValidUntil: "2025-12-31", availability: "https://schema.org/InStock" },
                  { "@type": "Offer", url: "https://citywitty.com/get-card", priceCurrency: "INR", price: "1999", priceValidUntil: "2025-12-31", availability: "https://schema.org/InStock" },
                  { "@type": "Offer", url: "https://citywitty.com/get-card", priceCurrency: "INR", price: "4999", priceValidUntil: "2025-12-31", availability: "https://schema.org/InStock" },
                ],
              },
            ],
          }),
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8"> <br />
            <h1 className="text-4xl lg:text-6xl font-bold">Get Your CityWitty Card</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Unlock exclusive discounts across 1000+ premium merchants and start saving money on every purchase
            </p>
            <WhatsAppButton text={whatsAppMessage} label="Get Card via WhatsApp" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CityWitty Card?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience premium benefits and exclusive privileges with every purchase
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="p-6 shadow-lg rounded-xl">
                  <CardContent className="text-center">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mx-auto">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}

          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <details className="p-4 border rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer">
                  CityWitty Card ki validity kitni hoti hai?
                </summary>
                <p className="mt-2 text-gray-600">
                  Aap apni zaroorat ke hisaab se 1 Year, 2 Years, ya 3 Years ka plan choose kar sakte hain.
                </p>
              </details>
              <details className="p-4 border rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer">
                  Card expire hone ke baad kya renewal option hai?
                </summary>
                <p className="mt-2 text-gray-600">
                  Haan, validity ke khatam hone par aap apna card easily renew kar sakte hain aur naye benefits le sakte hain.
                </p>
              </details>
              <details className="p-4 border rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer">
                  CityWitty Card kaha use kar sakte hain?
                </summary>
                <p className="mt-2 text-gray-600">
                  Yeh card 1000+ partner restaurants, hotels, salons, aur shopping outlets me accept kiya jata hai.
                </p>
              </details>
              <details className="p-4 border rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer">
                  Agar koi issue ho to support kaise milega?
                </summary>
                <p className="mt-2 text-gray-600">
                  Aapko priority customer support provide kiya jata hai – call, email, aur WhatsApp ke through.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              CityWitty Card Plans
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Pick a plan that matches your lifestyle and unlock maximum savings.
            </p>
          </div>

          {/* Main Plans */}
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const savings = plan.originalPrice - plan.launchPrice;
              const isMultiYear = plan.duration !== "1 Year";

              // Card styling: white bg, shadow, rounded, gray outline
              const cardClasses =
                "relative flex flex-col rounded-3xl overflow-hidden shadow-xl border border-gray-200 transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] bg-white text-gray-900 h-full";

              // Member badge
              let memberBadge = null;
              let memberBadgeClasses = "";
              if (plan.duration === "1 Year") {
                memberBadge = "Economy Member";
                memberBadgeClasses =
                  "bg-white text-gray-700 border border-gray-300"; // white bg
              } else if (plan.duration === "2 Years") {
                memberBadge = "Silver Member";
                memberBadgeClasses = "bg-gray-300 text-gray-900"; // silver bg
              } else if (plan.duration === "3 Years") {
                memberBadge = "Golden Member";
                memberBadgeClasses = "bg-yellow-500 text-white"; // gold bg
              }

              return (
                <div key={plan.name} className="relative flex flex-col h-full">
                  {/* Existing Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {plan.duration === "2 Years" && (
                      <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Most Popular
                      </span>
                    )}
                    {plan.duration === "3 Years" && (
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Smart Buyer's Choice
                      </span>
                    )}
                  </div>

                  {/* Member Badge */}
                  {memberBadge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className={`inline-block text-xs font-bold px-3 py-1 rounded-full shadow ${memberBadgeClasses}`}
                      >
                        {memberBadge}
                      </span>
                    </div>
                  )}

                  {/* Card */}
                  <div className={cardClasses}>
                    {/* Content with shine effect */}
                    <div className="relative flex flex-col justify-between h-full p-8 text-center mt-6 overflow-hidden">
                      {/* Shine overlay inside content only */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 pointer-events-none animate-shine"></div>

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">{plan.name} Plan</h3>

                          {/* Pricing */}
                          <div className="mb-4">
                            <p className="text-sm line-through text-red-500">₹{plan.originalPrice}</p>
                            <p className="text-4xl font-extrabold text-green-600">₹{plan.launchPrice}</p>
                            {isMultiYear && (
                              <p className="text-base font-semibold text-gray-700">₹{plan.perYearValue}/year</p>
                            )}
                            {/* Festive50 below price */}
                            <p className="inline-block mt-1 px-3 py-1 rounded-full bg-red-600 text-white font-medium text-sm animate-pulse">
                              🎉 Festive50 Applied!
                            </p>
                            <p className="text-sm font-medium text-green-500 mt-1">
                              You save ₹{savings}
                            </p>
                          </div>

                          {/* Features */}
                          <ul className="space-y-3 text-left mb-6">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <WhatsAppButton
                          text={whatsAppMessage}
                          label={`Get ${plan.name} Card`}
                          fullWidth
                          variant="primary"
                        />

                        {/* Gift / No Gift */}
                        <div className="mt-4 flex justify-center">
                          {plan.isAssuredGift ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow bg-yellow-100 text-yellow-800">
                              <Gift className="w-4 h-4" />
                              {plan.duration === "3 Years" ? "Premium Assured Gift!" : "Assured Gift!"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow bg-red-100 text-red-600">
                              <span className="font-bold">✕</span> No Gift Included
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student Plan */}
          <div className="mt-16 max-w-3xl mx-auto relative">
            <div className="relative flex flex-col rounded-3xl bg-[#f4e5ff] border border-purple-400 shadow-xl p-8 text-center hover:-translate-y-2 hover:scale-[1.02] transition-transform h-full overflow-hidden">
              {/* Shine overlay inside content only */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 pointer-events-none animate-shine"></div>

              {/* Festive33% Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-purple-600 text-white px-5 py-1.5 text-sm font-bold rounded-full shadow animate-pulse">
                  🎉 Festive33% Off
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Plan (Valid Student ID)</h3>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 line-through">₹1499</p>
                  <p className="text-4xl font-extrabold text-green-600">₹999</p>
                  <p className="text-sm text-green-600 font-medium">33% Off – Limited Time!</p>
                </div>

                <ul className="text-left space-y-3 mb-8 text-gray-700">
                  <li>Exclusive student tie-ups: cafes, gyms, clothing stores, arcades & salons</li>
                  <li>“Study & Chill” bundles with libraries & co-working spaces</li>
                  <li>Referral rewards: invite 3 friends for 1 month free or a special coupon</li>
                </ul>

                <WhatsAppButton
                  text={whatsAppMessage}
                  label="Get Student Card"
                  fullWidth
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tailwind shine animation */}
        <style>
          {`
      @keyframes shine {
        0% { transform: translateX(-100%) rotate(25deg); opacity: 0; }
        50% { transform: translateX(100%) rotate(25deg); opacity: 0.3; }
        100% { transform: translateX(200%) rotate(25deg); opacity: 0; }
      }
      .animate-shine {
        animation: shine 2s infinite;
      }
    `}
        </style>
      </section>


















      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Getting your CityWitty card is simple and straightforward</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                      {/* {step.step} */}
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who are already saving money with CityWitty
          </p>
          <WhatsAppButton text={whatsAppMessage} label="Get Your Card Now" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
