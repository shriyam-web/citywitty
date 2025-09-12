"use client";
import Script from "next/script";
import type { Metadata } from "next";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact CityWitty - Support, Inquiries & Assistance",
  description:
    "Get in touch with CityWitty for customer support, business inquiries, or partnership opportunities. Reach us via phone, WhatsApp, email, or our contact form.",
  keywords:
    "CityWitty contact, customer support, business inquiry, CityWitty phone, CityWitty email, partnership CityWitty, discount card support",
  openGraph: {
    title: "Contact CityWitty - Support, Inquiries & Assistance",
    description:
      "We’re here to help! Contact CityWitty for support, partnership inquiries, or any questions. Reach us by phone, WhatsApp, email, or our contact form.",
    url: "https://citywitty.com/contact",
    siteName: "CityWitty",
    images: [
      {
        url: "https://citywitty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CityWitty Contact Page",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@citywitty",
    title: "Contact CityWitty - Support, Inquiries & Assistance",
    description:
      "Need help or have a question? Reach out to CityWitty’s support team by phone, WhatsApp, email, or contact form.",
    images: ["https://citywitty.com/og-image.png"],
  },
  alternates: {
    canonical: "https://citywitty.com/contact",
  },
  category: "Customer Support",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I need support with CityWitty. Please help me."
    );
    window.open(`https://wa.me/916389202030?text=${message}`, "_blank");
  };

  const openCall = () => {
    window.location.href = "tel:+916389202030";
  };

  const openEmail = () => {
    window.location.href = "mailto:contact@citywitty.com";
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-xl bg-green-50">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Message Sent Successfully!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for contacting us. Our team will get back to you
                  within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://citywitty.com/contact",
                url: "https://citywitty.com/contact",
                name: "Contact CityWitty - Support, Inquiries & Assistance",
                description:
                  "Get in touch with CityWitty for customer support, business inquiries, or partnership opportunities. Reach us via phone, WhatsApp, email, or our contact form.",
                isPartOf: {
                  "@id": "https://citywitty.com/#website",
                },
                about: {
                  "@id": "https://citywitty.com/#organization",
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://citywitty.com/#website",
                url: "https://citywitty.com",
                name: "CityWitty",
                publisher: {
                  "@id": "https://citywitty.com/#organization",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://citywitty.com/#organization",
                name: "CityWitty",
                url: "https://citywitty.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://citywitty.com/og-image.png",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+91-6389202030",
                    contactType: "customer support",
                    areaServed: "IN",
                    availableLanguage: ["English", "Hindi"],
                  },
                ],
                sameAs: [
                  "https://www.facebook.com/CityWitty.in",
                  "https://twitter.com/citywitty",
                  "https://www.instagram.com/citywitty.in",
                  "https://www.linkedin.com/company/citywitty",
                  "https://youtube.com/@citywitty3546",
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're here to help you with any questions about CityWitty discount
              cards
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 6389202030"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
                <CardDescription>
                  Get instant support through these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={openCall}
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50"
                >
                  <Phone className="mr-3 h-4 w-4 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Call Us</div>
                    <div className="text-sm text-gray-500">+91 6389202030</div>
                  </div>
                </Button>

                <Button
                  onClick={openWhatsApp}
                  variant="outline"
                  className="w-full justify-start hover:bg-green-50"
                >
                  <MessageCircle className="mr-3 h-4 w-4 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-500">
                      Instant messaging
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={openEmail}
                  variant="outline"
                  className="w-full justify-start hover:bg-purple-50"
                >
                  <Mail className="mr-3 h-4 w-4 text-purple-600" />
                  <div className="text-left">
                    <div className="font-medium">Email Us</div>
                    <div className="text-sm text-gray-500">
                      contact@citywitty.com
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Office Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Head Office</p>
                    <p className="text-sm text-gray-600">
                      Explore our office in your city.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  24/7 Support Available
                </h3>
                <p className="text-blue-100 text-sm">
                  Our customer support team is available round the clock to
                  assist you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
