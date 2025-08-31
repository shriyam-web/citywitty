'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  LogOut
} from 'lucide-react';

const cardInfo = {
  cardNumber: '****-****-****-1234',
  status: 'Active',
  validTill: 'Dec 2025',
  totalSavings: '₹15,420',
  usageCount: 23
};

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

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Card Status</p>
                  <p className="text-2xl font-bold">{cardInfo.status}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Savings</p>
                  <p className="text-2xl font-bold">{cardInfo.totalSavings}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Offers Used</p>
                  <p className="text-2xl font-bold">{cardInfo.usageCount}</p>
                </div>
                <Gift className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Valid Till</p>
                  <p className="text-2xl font-bold">{cardInfo.validTill}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="card">My Card</TabsTrigger>
            <TabsTrigger value="offers">Available Offers</TabsTrigger>
            <TabsTrigger value="history">Usage History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Card Tab */}
          <TabsContent value="card">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <span>My CityWitty Card</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-blue-100 text-sm">CityWitty Premium</p>
                        <p className="text-2xl font-bold">{user.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-100 text-sm">Valid Till</p>
                        <p className="font-semibold">{cardInfo.validTill}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-blue-100 text-sm">Card Number</p>
                      <p className="font-mono text-lg">{cardInfo.cardNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{cardInfo.totalSavings}</p>
                      <p className="text-green-700 text-sm">Total Savings</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{cardInfo.usageCount}</p>
                      <p className="text-blue-700 text-sm">Times Used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Gift className="mr-2 h-4 w-4" />
                    Browse New Offers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Nearby Merchants
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <History className="mr-2 h-4 w-4" />
                    Download Usage Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Available Offers Tab */}
          <TabsContent value="offers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentOffers.map((offer, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{offer.merchant}</h3>
                        <p className="text-sm text-gray-600">{offer.category}</p>
                      </div>
                      <Badge className={offer.used ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'}>
                        {offer.discount}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{offer.city}</span>
                    </div>

                    {offer.used ? (
                      <div className="space-y-2">
                        <p className="text-sm text-green-600 font-medium">Used on {offer.usedDate}</p>
                        <p className="text-sm text-gray-600">Saved: {offer.savedAmount}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Valid till: {offer.validTill}</p>
                        <Button size="sm" className="w-full">
                          Use Offer
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Usage History Tab */}
          <TabsContent value="history">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>
                  Track all your discount card usage and savings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usageHistory.map((usage, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Gift className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{usage.merchant}</p>
                          <p className="text-sm text-gray-600">{usage.city} • {usage.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{usage.amount}</p>
                        <p className="text-sm text-green-600">Saved {usage.saved}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-6 w-6 text-blue-600" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-semibold">Jan 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Card Type</p>
                      <p className="font-semibold">Premium</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Favorite Category</span>
                    <span className="font-semibold text-blue-600">Hotels</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Most Visited City</span>
                    <span className="font-semibold text-green-600">Mumbai</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Average Monthly Savings</span>
                    <span className="font-semibold text-orange-600">₹3,200</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}