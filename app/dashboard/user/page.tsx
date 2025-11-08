'use client';
import type { Metadata } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  Gift,
  History,
  User,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
  LogOut,
  ChevronRight,
  Zap,
  Wallet,
  Award,
  Home,
  Eye,
  EyeOff
} from 'lucide-react';
// export const metadata: Metadata = {
//   title: "User Dashboard - CityWitty",
//   description: "Access your CityWitty card details, offers, and usage history in your personal dashboard.",
//   robots: {
//     index: false,   // ❌ no indexing
//     follow: false,  // ❌ no following
//   },
// };
const cardInfo = {
  cardNumber: '****-****-****-1234',
  status: 'Active',
  validTill: 'Dec 2025',
  totalSavings: '₹15,420',
  usageCount: 23
};

// Check if user has an active card (you can replace this with actual logic)
// Note: hasCardInDatabase will be set inside the component where user is available

const recentOffers = [
  {
    merchant: 'Royal Palace Hotel',
    category: 'Hotels',
    discount: '30% OFF',
    city: 'Mumbai',
    used: false,
    validTill: '2025-02-15'
  },
  {
    merchant: 'Style Studio Salon',
    category: 'Salon & Spa',
    discount: '25% OFF',
    city: 'Delhi',
    used: true,
    usedDate: '2025-01-10',
    savedAmount: '₹850'
  },
  {
    merchant: 'Gadget Galaxy',
    category: 'Electronics',
    discount: '20% OFF',
    city: 'Bangalore',
    used: true,
    usedDate: '2025-01-08',
    savedAmount: '₹2,340'
  }
];

const usageHistory = [
  {
    date: '2025-01-10',
    merchant: 'Style Studio Salon',
    amount: '₹4,250',
    saved: '₹850',
    city: 'Delhi'
  },
  {
    date: '2025-01-08',
    merchant: 'Gadget Galaxy',
    amount: '₹11,700',
    saved: '₹2,340',
    city: 'Bangalore'
  },
  {
    date: '2025-01-05',
    merchant: 'Gourmet Delights',
    amount: '₹3,200',
    saved: '₹640',
    city: 'Pune'
  }
];

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showName, setShowName] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  // Check if user has an active card (you can replace this with actual logic)
  const hasActiveCard = cardInfo.status === 'Active';
  const hasCardInDatabase = user.isCardExist; // Use the isCardExist field from database

  const maskText = (text: string) => '•'.repeat(text.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
              <div className="h-10 w-10 relative">
                <Image
                  src="/logo.png"
                  alt="CityWitty Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">CityWitty</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild className="hidden sm:flex gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
              <div className="hidden sm:block text-right border-l border-gray-200 pl-4">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Premium Card Display */}
        <div className="mb-8 grid lg:grid-cols-3 gap-6">
          {/* Main Card Display - Premium 3D Style */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 border border-gray-600">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-15 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl font-extrabold text-gray-700/10 tracking-widest rotate-[-20deg]">
                  SAVINGS
                </div>
              </div>
              <div className="relative h-full flex flex-col gap-6 p-5 sm:p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                      <Image
                        src="/logo.png"
                        alt="CityWitty Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                        CityWitty
                      </span>
                      <div className="text-xs text-gray-400">Privilege Card</div>
                    </div>
                  </div>
                  <Badge className="bg-white/10 text-white border border-white/20">
                    {cardInfo.status === 'Active' ? cardInfo.status : 'Preview'}
                  </Badge>
                </div>
                <div className="flex-1 flex flex-col justify-end p-4 space-y-3">
                  {hasCardInDatabase ? (
                    hasActiveCard ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs uppercase text-gray-300 mb-1">Member Name</p>
                            <p className="text-lg font-semibold">
                              {showName ? user.name : maskText(user.name)}
                            </p>
                          </div>
                          <button
                            onClick={() => setShowName(!showName)}
                            className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            {showName ? <EyeOff className="h-4 w-4 text-gray-300" /> : <Eye className="h-4 w-4 text-gray-300" />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs uppercase text-gray-300 mb-1">Card Number</p>
                            <p className="text-lg font-semibold">
                              {showCardNumber ? cardInfo.cardNumber : maskText(cardInfo.cardNumber)}
                            </p>
                          </div>
                          <button
                            onClick={() => setShowCardNumber(!showCardNumber)}
                            className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            {showCardNumber ? <EyeOff className="h-4 w-4 text-gray-300" /> : <Eye className="h-4 w-4 text-gray-300" />}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Inactive Card</p>
                        <p className="text-lg font-semibold text-gray-300">Card Not Active</p>
                        <p className="text-xs text-gray-400">Contact support to activate</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">No Card Found</p>
                        <p className="text-lg font-semibold text-gray-300">Get Your CityWitty Card</p>
                        <p className="text-xs text-gray-400">Exclusive discounts await</p>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                        Buy Card Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 text-xs uppercase font-semibold">Membership</p>
                    <p className="text-2xl font-bold text-emerald-700">Premium</p>
                  </div>
                  <Award className="h-8 w-8 text-emerald-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-xs uppercase font-semibold">Member Since</p>
                    <p className="text-2xl font-bold text-blue-700">Jan 2024</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-md">
              <Zap className="h-4 w-4 mr-2" />
              Explore Offers
            </Button>
          </div>
        </div>

        <Tabs defaultValue="offers" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border border-gray-200">
            <TabsTrigger value="offers" className="text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              <Gift className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Offers</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              <History className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="card" className="text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-gray-700 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Available Offers Tab - Now First */}
          <TabsContent value="offers">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Offers</h2>
                <p className="text-gray-600">Exclusive deals tailored for you</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentOffers.map((offer, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-4 border-b border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{offer.merchant}</h3>
                          <p className="text-xs text-gray-500 mt-1">{offer.category}</p>
                        </div>
                        <Badge className={offer.used ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700 font-bold'}>
                          {offer.discount}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{offer.city}</span>
                      </div>

                      {offer.used ? (
                        <div className="space-y-2">
                          <Badge className="bg-green-100 text-green-700 text-xs">Used</Badge>
                          <p className="text-sm text-gray-600">Used on {offer.usedDate}</p>
                          <p className="text-sm font-semibold text-green-600">You saved {offer.savedAmount}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-500">Valid until {offer.validTill}</p>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            Use Offer
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>



          {/* Usage History Tab */}
          <TabsContent value="history">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Usage History</h2>
                <p className="text-gray-600">Track all your discount card usage and savings</p>
              </div>
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {usageHistory.map((usage, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                            <Gift className="h-7 w-7 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{usage.merchant}</p>
                            <div className="flex space-x-2 text-gray-500 text-sm mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{usage.city}</span>
                              <span>•</span>
                              <Calendar className="h-4 w-4" />
                              <span>{usage.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{usage.amount}</p>
                          <p className="text-green-600 font-semibold text-sm mt-1">+{usage.saved} saved</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Quick Actions Tab */}
          <TabsContent value="card">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-gray-600">Manage your account and explore more</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition">
                        <Gift className="h-6 w-6 text-orange-600" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Offers</h3>
                    <p className="text-gray-600 text-sm">Discover new exclusive deals and offers tailored for you</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-purple-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Find Merchants</h3>
                    <p className="text-gray-600 text-sm">Locate nearby merchants accepting your CityWitty card</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Download Report</h3>
                    <p className="text-gray-600 text-sm">Get a detailed report of your usage and savings</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                        <Wallet className="h-6 w-6 text-blue-600" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Update Profile</h3>
                    <p className="text-gray-600 text-sm">Manage your personal information and preferences</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md">
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-6 w-6 text-blue-600" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Full Name</p>
                        <p className="text-lg font-bold text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Email</p>
                        <p className="text-lg font-bold text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Member Since</p>
                        <p className="text-lg font-bold text-gray-900">January 2024</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Card Type</p>
                        <Badge className="bg-blue-100 text-blue-700 font-bold">Premium</Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-8 h-11 bg-blue-600 hover:bg-blue-700">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-md">
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Favorite</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">Hotels</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">Top City</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">Mumbai</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">Monthly Avg</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">₹3,200</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}