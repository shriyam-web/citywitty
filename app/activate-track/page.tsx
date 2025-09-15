"use client";
import Script from "next/script";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

export default function ActivateTrackPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [activationResult, setActivationResult] = useState<any>(null);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate activation process
    setTimeout(() => {
      setActivationResult({
        success: true,
        cardNumber: cardNumber,
        activatedAt: new Date().toLocaleString(),
        validTill: "2025-12-31",
        status: "Active",
      });
    }, 1500);
  };

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tracking process
    setTimeout(() => {
      setTrackingResult({
        orderId: trackingId,
        status: "In Transit",
        estimatedDelivery: "2025-01-15",
        currentLocation: "Mumbai Distribution Center",
        timeline: [
          { status: "Order Placed", date: "2025-01-10", completed: true },
          { status: "Payment Confirmed", date: "2025-01-10", completed: true },
          { status: "Processing", date: "2025-01-11", completed: true },
          { status: "Shipped", date: "2025-01-12", completed: true },
          { status: "In Transit", date: "2025-01-13", completed: true },
          { status: "Out for Delivery", date: "2025-01-15", completed: false },
          { status: "Delivered", date: "2025-01-15", completed: false },
        ],
      });
    }, 1500);
  };

  return (
    <>
      <Script
        id="activate-track-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Activate & Track Your CityWitty Card",
            url: "https://citywitty.com/activate-track",
            description:
              "Activate your CityWitty discount card or track your order delivery in real-time.",
            publisher: {
              "@type": "Organization",
              name: "CityWitty",
              url: "https://citywitty.com",
              logo: "https://citywitty.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-6389202030",
                contactType: "customer service",
                email: "contact@citywitty.com",
                areaServed: "IN",
                availableLanguage: "English",
              },
            },
          }),
        }}
      />

      <Script
        id="activate-track-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I activate my CityWitty discount card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Simply enter your 16-digit card number, email, and phone number on the activation form and click 'Activate Card'.",
                },
              },
              {
                "@type": "Question",
                name: "How can I track my CityWitty order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enter your order ID and email address in the tracking form to see the real-time delivery status of your card.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to deliver a CityWitty card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CityWitty cards are usually delivered within 5-7 business days depending on your location.",
                },
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <br /><br />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Activate & Track Your Card
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Activate your CityWitty card or track your order status in real-time
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="activate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="activate" className="text-lg py-3">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Activate Card
                </TabsTrigger>
                <TabsTrigger value="track" className="text-lg py-3">
                  <Search className="mr-2 h-5 w-5" />
                  Track Order
                </TabsTrigger>
              </TabsList>

              {/* Activate Card Tab */}
              <TabsContent value="activate">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <span>Card Activation</span>
                      </CardTitle>
                      <CardDescription>
                        Enter your card details to activate your CityWitty
                        discount card
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleActivation} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Enter your 16-digit card number"
                            maxLength={16}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 6389202030"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Activate Card
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Activation Result */}
                  {activationResult && (
                    <Card className="border-0 shadow-lg bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="h-6 w-6" />
                          <span>Card Activated Successfully!</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-green-700">Card Number</Label>
                            <p className="font-mono text-sm">
                              {activationResult.cardNumber}
                            </p>
                          </div>
                          <div>
                            <Label className="text-green-700">Status</Label>
                            <Badge className="bg-green-100 text-green-700">
                              {activationResult.status}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-green-700">Activated On</Label>
                            <p className="text-sm">
                              {activationResult.activatedAt}
                            </p>
                          </div>
                          <div>
                            <Label className="text-green-700">Valid Till</Label>
                            <p className="text-sm">
                              {activationResult.validTill}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Track Order Tab */}
              <TabsContent value="track">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Search className="h-6 w-6 text-blue-600" />
                        <span>Order Tracking</span>
                      </CardTitle>
                      <CardDescription>
                        Enter your order ID to track your card delivery status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleTracking} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="trackingId">
                            Order ID / Tracking Number
                          </Label>
                          <Input
                            id="trackingId"
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            placeholder="Enter your order ID"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Track Order
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Tracking Result */}
                  {trackingResult && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Package className="h-6 w-6 text-blue-600" />
                          <span>Order Status</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-blue-900">
                              Order ID: {trackingResult.orderId}
                            </p>
                            <p className="text-blue-700">
                              Status: {trackingResult.status}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">
                            <Truck className="mr-1 h-3 w-3" />
                            {trackingResult.status}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Current Location: {trackingResult.currentLocation}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Estimated Delivery:{" "}
                              {trackingResult.estimatedDelivery}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Tracking Timeline
                          </h4>
                          {trackingResult.timeline.map(
                            (item: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3"
                              >
                                <div
                                  className={`w-3 h-3 rounded-full ${item.completed
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                    }`}
                                />
                                <div className="flex-1">
                                  <p
                                    className={`text-sm font-medium ${item.completed
                                      ? "text-gray-900"
                                      : "text-gray-500"
                                      }`}
                                  >
                                    {item.status}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {item.date}
                                  </p>
                                </div>
                                {item.completed && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
