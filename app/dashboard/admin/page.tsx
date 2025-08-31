'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Building2, 
  CreditCard, 
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  LogOut,
  Settings,
  BarChart3,
  DollarSign
} from 'lucide-react';

const stats = [
  { title: 'Total Users', value: '50,247', change: '+12%', icon: Users, color: 'text-blue-600' },
  { title: 'Active Merchants', value: '1,234', change: '+8%', icon: Building2, color: 'text-green-600' },
  { title: 'Active Cards', value: '45,892', change: '+15%', icon: CreditCard, color: 'text-purple-600' },
  { title: 'Revenue', value: '₹2.4Cr', change: '+22%', icon: DollarSign, color: 'text-orange-600' }
];

const pendingMerchants = [
  { id: 1, name: 'Luxury Spa Center', category: 'Salon & Spa', city: 'Mumbai', appliedDate: '2025-01-10', status: 'pending' },
  { id: 2, name: 'Tech World Electronics', category: 'Electronics', city: 'Delhi', appliedDate: '2025-01-09', status: 'pending' },
  { id: 3, name: 'Fashion Hub', category: 'Fashion', city: 'Bangalore', appliedDate: '2025-01-08', status: 'pending' }
];

const activeMerchants = [
  { id: 1, name: 'Royal Palace Hotel', category: 'Hotels', city: 'Mumbai', joinDate: '2024-06-15', status: 'active', revenue: '₹2.4L' },
  { id: 2, name: 'Style Studio Salon', category: 'Salon & Spa', city: 'Delhi', joinDate: '2024-08-20', status: 'active', revenue: '₹1.8L' },
  { id: 3, name: 'Gadget Galaxy', category: 'Electronics', city: 'Bangalore', joinDate: '2024-09-10', status: 'active', revenue: '₹3.2L' }
];

const recentCards = [
  { id: 1, cardNumber: '****-****-****-1234', holder: 'Priya Sharma', activatedDate: '2025-01-10', status: 'active', plan: 'Premium' },
  { id: 2, cardNumber: '****-****-****-5678', holder: 'Rajesh Kumar', activatedDate: '2025-01-09', status: 'active', plan: 'Basic' },
  { id: 3, cardNumber: '****-****-****-9012', holder: 'Anita Desai', activatedDate: '2025-01-08', status: 'pending', plan: 'Lifetime' }
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login/admin');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
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
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-green-600 text-sm font-medium">{stat.change} from last month</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">New merchant approved</p>
                        <p className="text-sm text-gray-600">Luxury Spa Center - Mumbai</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">125 new cards activated</p>
                        <p className="text-sm text-gray-600">Today's activations</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">3 pending approvals</p>
                        <p className="text-sm text-gray-600">Merchant applications</p>
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
                    <Building2 className="mr-2 h-4 w-4" />
                    Add New Merchant
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Activate Card
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Merchants Tab */}
          <TabsContent value="merchants">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Merchants</CardTitle>
                    <CardDescription>Manage all active merchant partners</CardDescription>
                  </div>
                  <Button>Add Merchant</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search merchants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {activeMerchants.map((merchant) => (
                    <div key={merchant.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{merchant.name}</h3>
                          <p className="text-sm text-gray-600">{merchant.category} • {merchant.city}</p>
                          <p className="text-xs text-gray-500">Joined: {merchant.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{merchant.revenue}</p>
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {merchant.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Card Management</CardTitle>
                <CardDescription>Monitor and manage all CityWitty cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{card.cardNumber}</h3>
                          <p className="text-sm text-gray-600">{card.holder}</p>
                          <p className="text-xs text-gray-500">Activated: {card.activatedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-blue-100 text-blue-700">
                          {card.plan}
                        </Badge>
                        <Badge className={card.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                          {card.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
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
                  <span>Pending Approvals</span>
                </CardTitle>
                <CardDescription>Review and approve merchant applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingMerchants.map((merchant) => (
                    <div key={merchant.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{merchant.name}</h3>
                          <p className="text-sm text-gray-600">{merchant.category} • {merchant.city}</p>
                          <p className="text-xs text-gray-500">Applied: {merchant.appliedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject
                        </Button>
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
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
                      <h3 className="text-3xl font-bold">₹2.4 Cr</h3>
                      <p className="text-green-100">Total Revenue This Month</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">₹45L</p>
                        <p className="text-blue-700 text-sm">Merchant Revenue</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">₹1.95Cr</p>
                        <p className="text-purple-700 text-sm">Customer Savings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">New Users This Month</span>
                      <span className="font-bold text-blue-600">2,847</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Cards Activated</span>
                      <span className="font-bold text-green-600">1,923</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">New Merchants</span>
                      <span className="font-bold text-purple-600">45</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-700">Customer Satisfaction</span>
                      <span className="font-bold text-orange-600">4.8/5</span>
                    </div>
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