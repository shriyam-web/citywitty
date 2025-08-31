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
  Building,
  Users,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  LogOut,
  Eye,
  UserCheck,
  BarChart3,
  DollarSign,
} from "lucide-react";

const franchiseStats = [
  {
    title: "Territory Revenue",
    value: "₹12.4L",
    change: "+15%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Merchants",
    value: "45",
    change: "+8%",
    icon: Building,
    color: "text-blue-600",
  },
  {
    title: "Card Holders",
    value: "5,247",
    change: "+20%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Cities Covered",
    value: "8",
    change: "+2",
    icon: MapPin,
    color: "text-orange-600",
  },
];

const territoryMerchants = [
  {
    id: 1,
    name: "Royal Palace Hotel",
    category: "Hotels",
    city: "Mumbai",
    status: "active",
    revenue: "₹2.4L",
    joinDate: "2024-06-15",
  },
  {
    id: 2,
    name: "Wellness Spa Resort",
    category: "Salon & Spa",
    city: "Mumbai",
    status: "active",
    revenue: "₹1.8L",
    joinDate: "2024-07-20",
  },
  {
    id: 3,
    name: "Fashion Forward",
    category: "Fashion",
    city: "Pune",
    status: "active",
    revenue: "₹1.2L",
    joinDate: "2024-08-10",
  },
];

const pendingApplications = [
  {
    id: 1,
    name: "Luxury Spa Center",
    category: "Salon & Spa",
    city: "Mumbai",
    appliedDate: "2025-01-10",
    documents: "complete",
  },
  {
    id: 2,
    name: "Tech World Electronics",
    category: "Electronics",
    city: "Pune",
    appliedDate: "2025-01-09",
    documents: "pending",
  },
  {
    id: 3,
    name: "Gourmet Restaurant",
    category: "Restaurants",
    city: "Mumbai",
    appliedDate: "2025-01-08",
    documents: "complete",
  },
];

export default function FranchiseDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "franchise") {
      router.push("/login/franchise");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Franchise Dashboard
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
          {franchiseStats.map((stat) => {
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

        <Tabs defaultValue="territory" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="territory">My Territory</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Territory Tab */}
          <TabsContent value="territory">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Territory Merchants</CardTitle>
                <CardDescription>
                  Merchants under your franchise management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territoryMerchants.map((merchant) => (
                    <div
                      key={merchant.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {merchant.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {merchant.category} • {merchant.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            Joined: {merchant.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {merchant.revenue}
                          </p>
                          <p className="text-sm text-gray-600">
                            Monthly Revenue
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {merchant.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <span>Pending Merchant Applications</span>
                </CardTitle>
                <CardDescription>
                  Review and approve merchant applications in your territory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {application.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {application.category} • {application.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            Applied: {application.appliedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            application.documents === "complete"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {application.documents} docs
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <UserCheck className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Territory Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white">
                      <h3 className="text-3xl font-bold">₹12.4L</h3>
                      <p className="text-violet-100">Total Territory Revenue</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">45</p>
                        <p className="text-blue-700 text-sm">
                          Active Merchants
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          5,247
                        </p>
                        <p className="text-green-700 text-sm">Card Holders</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>City Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Mumbai</span>
                      <span className="font-bold text-blue-600">
                        28 merchants
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Pune</span>
                      <span className="font-bold text-green-600">
                        17 merchants
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Total Revenue</span>
                      <span className="font-bold text-purple-600">₹12.4L</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Franchise Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Franchise Name</p>
                      <p className="font-semibold text-lg">
                        Mumbai-Pune Region
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Manager</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Territory</p>
                      <p className="font-semibold">Mumbai, Pune, Thane</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Since</p>
                      <p className="font-semibold">March 2024</p>
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
