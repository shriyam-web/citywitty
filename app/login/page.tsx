'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // ✅ use login() from auth-context
      const success = await login(email, password, role);

      if (success) {
        router.push(`/dashboard/${role}`);
      } else {
        setError('Invalid email, password, or account type.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    setIsLoading(false);
  };




  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pt-3 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto h-16 w-16 mb-4 relative">
              <Image
                src="/citywittynew.jpg"
                alt="CityWitty Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your CityWitty account
            </CardDescription>
          </CardHeader>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-center font-medium">
              {error}
            </div>
          )}

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Input
                  id="role"
                  value="User (Default)"
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">User role is default and cannot be changed here.</p>
              </div>



              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>

          </CardContent>

          <div className="flex justify-center mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full max-w-xs flex items-center justify-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/dashboard/user" })}
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </Button>
          </div>

          <br />

        </Card>
      </div>
      <Footer />
    </>
  );
}