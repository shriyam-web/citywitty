import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, MessageCircle, Star, Clock, Shield, Gift } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
  { icon: Gift, title: "Exclusive Discounts", description: "Up to 50% off on premium merchants" },
  { icon: Shield, title: "Lifetime Validity", description: "No expiry date, use whenever you want" },
  { icon: Clock, title: "Instant Activation", description: "Start using within 24 hours" },
  { icon: Star, title: "Premium Support", description: "24/7 customer support assistance" },
];

const steps = [
  { step: 1, title: "Contact Us", description: "Click the WhatsApp button to initiate your purchase", icon: MessageCircle },
  { step: 2, title: "Choose Plan", description: "Select your preferred card plan and make payment", icon: CreditCard },
  { step: 3, title: "Get Activated", description: "Receive your digital card within 24 hours", icon: Check },
  { step: 4, title: "Start Saving", description: "Begin enjoying exclusive discounts immediately", icon: Gift },
];

const plans = [
  {
    name: "Basic",
    price: 999,
    originalPrice: 1499,
    features: ["Access to 500+ merchants", "Up to 30% discount", "6 months validity", "Basic customer support"],
    popular: false,
  },
  {
    name: "Premium",
    price: 1999,
    originalPrice: 2999,
    features: [
      "Access to 1000+ merchants",
      "Up to 50% discount",
      "1 year validity",
      "Priority customer support",
      "Exclusive merchant previews",
    ],
    popular: true,
  },
  {
    name: "Lifetime",
    price: 4999,
    originalPrice: 7499,
    features: [
      "Access to all merchants",
      "Up to 50% discount",
      "Lifetime validity",
      "24/7 premium support",
      "Early access to new merchants",
      "Family sharing (up to 4 members)",
    ],
    popular: false,
  },
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
          <div className="text-center space-y-8">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose CityWitty Card?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience premium benefits and exclusive privileges with every purchase
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan that suits your lifestyle and saving goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${plan.popular ? "ring-2 ring-blue-500" : ""
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-blue-600">₹{plan.price}</span>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 line-through">₹{plan.originalPrice}</div>
                        <div className="text-sm text-green-600">Save ₹{plan.originalPrice - plan.price}</div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <WhatsAppButton text={whatsAppMessage} label={`Get ${plan.name} Card`} fullWidth variant={plan.popular ? "primary" : "default"} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                      {step.step}
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
