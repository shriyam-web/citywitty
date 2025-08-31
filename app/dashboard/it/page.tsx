'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Database,
  Shield,
  Settings,
  LogOut,
  RefreshCw,
  Monitor,
  Zap,
  HardDrive
} from 'lucide-react';

const systemStats = [
  { title: 'System Uptime', value: '99.9%', change: 'Excellent', icon: Server, color: 'text-green-600' },
  { title: 'Active Users', value: '12,847', change: 'Online', icon: Activity, color: 'text-blue-600' },
  { title: 'Database Health', value: 'Optimal', change: 'Good', icon: Database, color: 'text-purple-600' },
  { title: 'Security Status', value: 'Secure', change: 'Protected', icon: Shield, color: 'text-orange-600' }
];

const systemAlerts = [
  { id: 1, type: 'warning', message: 'High memory usage on Server 2', time: '2 minutes ago', severity: 'medium' },
  { id: 2, type: 'info', message: 'Database backup completed successfully', time: '1 hour ago', severity: 'low' },
  { id: 3, type: 'error', message: 'Payment gateway timeout resolved', time: '3 hours ago', severity: 'high' }
];

const serverStatus = [
  { name: 'Web Server 1', status: 'online', cpu: '45%', memory: '62%', uptime: '15 days' },
  { name: 'Web Server 2', status: 'online', cpu: '78%', memory: '84%', uptime: '15 days' },
  { name: 'Database Server', status: 'online', cpu: '32%', memory: '56%', uptime: '30 days' },
  { name: 'Payment Server', status: 'online', cpu: '23%', memory: '41%', uptime: '7 days' }
];

const recentLogs = [
  { timestamp: '2025-01-13 14:30:25', level: 'INFO', service: 'Auth Service', message: 'User login successful' },
  { timestamp: '2025-01-13 14:28:15', level: 'ERROR', service: 'Payment Gateway', message: 'Transaction timeout - retrying' },
  { timestamp: '2025-01-13 14:25:10', level: 'INFO', service: 'Database', message: 'Backup process completed' },
  { timestamp: '2025-01-13 14:20:05', level: 'WARN', service: 'Web Server', message: 'High memory usage detected' }
];

export default function ITDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'it') {
      router.push('/login/it');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IT Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
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
          {systemStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-green-600 text-sm font-medium">{stat.change}</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="monitoring">System Monitoring</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                      <h3 className="text-3xl font-bold">99.9%</h3>
                      <p className="text-green-100">System Uptime</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">12,847</p>
                        <p className="text-blue-700 text-sm">Active Sessions</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">2.3GB</p>
                        <p className="text-purple-700 text-sm">Memory Usage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Response Time</span>
                      <span className="font-bold text-green-600">245ms</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Requests/min</span>
                      <span className="font-bold text-blue-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Error Rate</span>
                      <span className="font-bold text-purple-600">0.02%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-700">CPU Usage</span>
                      <span className="font-bold text-orange-600">45%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Monitor system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                      alert.type === 'error' ? 'bg-red-50 border-red-200' :
                      alert.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        {alert.type === 'error' ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : alert.type === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{alert.message}</p>
                          <p className="text-sm text-gray-600">{alert.time}</p>
                        </div>
                      </div>
                      <Badge className={
                        alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Servers Tab */}
          <TabsContent value="servers">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
                <CardDescription>Monitor all server instances and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serverStatus.map((server, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <HardDrive className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{server.name}</h3>
                          <p className="text-sm text-gray-600">Uptime: {server.uptime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">CPU</p>
                          <p className="font-semibold">{server.cpu}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Memory</p>
                          <p className="font-semibold">{server.memory}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {server.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Recent system activity and error logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentLogs.map((log, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded font-mono text-sm hover:bg-gray-100 transition-colors">
                      <span className="text-gray-500">{log.timestamp}</span>
                      <Badge className={
                        log.level === 'ERROR' ? 'bg-red-100 text-red-700' :
                        log.level === 'WARN' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {log.level}
                      </Badge>
                      <span className="text-purple-600">{log.service}</span>
                      <span className="text-gray-700">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}