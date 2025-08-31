"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Store,
  Users,
  TrendingUp,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Edit,
  Plus,
  Calendar,
  DollarSign,
} from "lucide-react";

const businessStats = [
  {
    title: "Monthly Revenue",
    value: "₹2.4L",
    change: "+18%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Card Users",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Offers Redeemed",
    value: "892",
    change: "+25%",
    icon: CreditCard,
    color: "text-purple-600",
  },
  {
    title: "Rating",
    value: "4.8/5",
    change: "+0.2",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

const recentCustomers = [
  {
    name: "Priya Sharma",
    cardNumber: "****1234",
    visitDate: "2025-01-10",
    amount: "₹4,250",
    saved: "₹850",
  },
  {
    name: "Rajesh Kumar",
    cardNumber: "****5678",
    visitDate: "2025-01-09",
    amount: "₹2,100",
    saved: "₹420",
  },
  {
    name: "Anita Desai",
    cardNumber: "****9012",
    visitDate: "2025-01-08",
    amount: "₹6,800",
    saved: "₹1,360",
  },
];

const activeOffers = [
  {
    id: 1,
    title: "25% Off All Services",
    validTill: "2025-02-15",
    used: 234,
    status: "active",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    validTill: "2025-01-31",
    used: 156,
    status: "active",
  },
  {
    id: 3,
    title: "Weekend Special 30% Off",
    validTill: "2025-01-20",
    used: 89,
    status: "expiring",
  },
];

export default function MerchantDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "merchant") {
      router.push("/login/merchant");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Merchant Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user.name}!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {businessStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-green-600 text-sm font-medium">
                        {stat.change} from last month
                      </p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="offers">My Offers</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Business Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
                      <h3 className="text-3xl font-bold">₹2.4L</h3>
                      <p className="text-emerald-100">This Month's Revenue</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">892</p>
                        <p className="text-blue-700 text-sm">Offers Used</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          1,247
                        </p>
                        <p className="text-purple-700 text-sm">
                          Unique Customers
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Offer
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Promotion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Offers</CardTitle>
                    <CardDescription>
                      Manage your discount offers and promotions
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Offer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {offer.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Valid till: {offer.validTill}
                        </p>
                        <p className="text-xs text-gray-500">
                          Used {offer.used} times
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            offer.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {offer.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Customers</CardTitle>
                <CardDescription>
                  Track customer visits and card usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCustomers.map((customer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {customer.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Card: {customer.cardNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            Visit: {customer.visitDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {customer.amount}
                        </p>
                        <p className="text-sm text-green-600">
                          Saved: {customer.saved}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>
                  Manage your business information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Business Name</p>
                      <p className="font-semibold text-lg">
                        Style Studio Salon
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold">Salon & Spa</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="font-semibold">Delhi</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-semibold">August 2024</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Contact Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">+91 6389202030</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    </div>
                    <Button className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
