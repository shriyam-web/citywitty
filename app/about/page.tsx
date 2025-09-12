// "use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CityWitty - India's Leading Premium Discount Platform",
  description:
    "Learn about CityWitty's mission, vision, and journey. Meet our passionate team and discover how we are revolutionizing discounts across India with 1,000+ merchants and 50,000+ happy customers.",
  keywords: [
    "About CityWitty",
    "CityWitty team",
    "discount platform India",
    "premium merchant offers",
    "CityWitty mission vision",
    "CityWitty journey",
    "CityWitty founders",
    "India best discount card",
    "exclusive deals India",
  ],
  openGraph: {
    title: "About Us | CityWitty",
    description:
      "Discover CityWitty's story, core values, leadership team, and our mission to make premium discounts accessible across India.",
    url: "https://citywitty.com/about",
    siteName: "CityWitty",
    images: [
      {
        url: "https://citywitty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About CityWitty - India's Leading Discount Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CityWitty",
    description:
      "Meet the team and learn about CityWitty's mission to revolutionize premium discounts in India.",
    images: ["https://citywitty.com/og-image.png"],
  },
  alternates: {
    canonical: "https://citywitty.com/about",
  },
};


const values = [
  {
    icon: Target,
    title: "Customer First",
    description:
      "Every decision we make is centered around providing maximum value to our customers.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We maintain complete transparency in our partnerships and pricing with no hidden fees.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Continuously evolving our platform to deliver cutting-edge discount solutions.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Making premium discounts accessible to everyone across India.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Foundation",
    description:
      "CityWitty was founded with a vision to democratize premium discounts across India.",
  },
  {
    year: "2021",
    title: "First Partnerships",
    description:
      "Established partnerships with 100+ premium merchants in Mumbai and Delhi.",
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Expanded to 10 major cities with 500+ merchant partners.",
  },
  {
    year: "2023",
    title: "Digital Revolution",
    description:
      "Launched digital card platform and mobile app for seamless user experience.",
  },
  {
    year: "2024",
    title: "National Presence",
    description:
      "Reached 20+ cities with 1000+ merchants and 50,000+ satisfied customers.",
  },
  {
    year: "2025",
    title: "Future Vision",
    description:
      "Expanding to 50+ cities with AI-powered personalized offers and recommendations.",
  },
];

const team = [
  {
    name: "Arjun Patel",
    role: "Founder & CEO",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Visionary leader with 15+ years in fintech and e-commerce.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Technology Officer",
    image:
      "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Tech innovator specializing in scalable platform architecture.",
  },
  {
    name: "Rajesh Kumar",
    role: "Head of Partnerships",
    image:
      "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Expert in building strategic merchant relationships across India.",
  },
  {
    name: "Anita Desai",
    role: "Customer Success Director",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
    description:
      "Passionate about delivering exceptional customer experiences.",
  },
];

const stats = [
  { icon: Users, label: "Happy Customers", value: "50,000+" },
  { icon: Award, label: "Partner Merchants", value: "1,000+" },
  { icon: Globe, label: "Cities Covered", value: "20+" },
  { icon: TrendingUp, label: "Total Savings", value: "₹10 Cr+" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ✅ JSON-LD Schema */}
      <Script id="about-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "CityWitty",
            "url": "https://citywitty.com",
            "logo": "https://citywitty.com/logo.png",
            "foundingDate": "2020",
            "founders": [
              {
                "@type": "Person",
                "name": "Arjun Patel",
                "jobTitle": "Founder & CEO"
              },
              {
                "@type": "Person",
                "name": "Priya Sharma",
                "jobTitle": "Chief Technology Officer"
              }
            ],
            "numberOfEmployees": "50+",
            "sameAs": [
              "https://www.facebook.com/citywitty",
              "https://www.instagram.com/citywitty",
              "https://www.linkedin.com/company/citywitty"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9876543210",
              "contactType": "customer support",
              "email": "support@citywitty.com",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            }
          }
        })}
      </Script>
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">About CityWitty</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing the way India shops with premium discount cards
              that unlock exclusive deals from trusted merchants nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To democratize access to premium discounts and exclusive
                  offers, making luxury experiences affordable for every Indian
                  family while supporting local businesses and fostering
                  economic growth.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become India's most trusted discount platform, connecting
                  millions of customers with thousands of premium merchants,
                  creating a win-win ecosystem that benefits everyone.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team collaboration"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at CityWitty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={value.title}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              See how we're making a difference across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a simple idea to India's leading discount platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200" />

              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"
                    } mb-12`}
                >
                  <div
                    className={`w-full max-w-md ${index % 2 === 0 ? "pr-8" : "pl-8"
                      }`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-blue-100 text-blue-700">
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals driving CityWitty's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card
                key={member.name}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of India's fastest-growing discount platform and start
            saving today
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Your Card
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-purple-600"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
