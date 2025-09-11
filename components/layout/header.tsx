'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogIn, UserPlus } from "lucide-react";

import {
  Menu,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About CityWitty', href: '/about' },
  { name: 'Activate Card', href: '/activate-track' },
  { name: 'Merchants', href: '/merchants' },
  { name: 'Contact', href: '/contact' },
  { name: 'Merchant Portal', href: 'https://partner.citywitty.com/' },
];

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardUrl = (role: string) => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'merchant':
        return '/dashboard/merchant';
      case 'franchise':
        return '/dashboard/franchise';
      case 'it':
        return '/dashboard/it';
      default:
        return '/dashboard/user';
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="CityWitty Logo"
              className="h-12 w-auto"
            />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                CityWitty
              </span>
              <div className="text-xs text-gray-400">Privilege Cards</div>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Desktop: Login + Register */}
            {!user && (
              <div className="hidden md:flex items-center space-x-3">
                {pathname !== "/login" && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-300 hover:border-blue-500 hover:text-blue-600 flex items-center gap-2"
                  >
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                )}
                {pathname !== "/register" && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-300 hover:border-orange-500 hover:text-orange-600 flex items-center gap-2"
                  >
                    <Link href="/register">
                      <UserPlus className="h-4 w-4" />
                      Register
                    </Link>
                  </Button>
                )}
              </div>
            )}


            {/* Logged In User Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="
                      flex items-center space-x-2 px-4 py-2 rounded-full
                      bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500
                      bg-[length:200%_200%] animate-gradient-move
                      text-white font-medium shadow-lg hover:shadow-xl
                      transform hover:scale-105 transition-all
                    "
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white/95 backdrop-blur-xl border-0 shadow-xl"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={getDashboardUrl(user.role)}
                      className="flex items-center"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}


            {/* Get Your Card (Always visible) */}
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/register">Get Your Card</Link>
            </Button>

            {/* Burger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 rounded-xl ${isScrolled
                    ? 'text-gray-700 hover:bg-blue-50'
                    : ' hover:bg-white/10'
                    }`}
                >
                  <Menu className="h-6 w-6" />
                  {/* &nbsp; Menu */}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-slide-in"
              >
                <div className="flex flex-col space-y-4 mt-10">
                  {/* Navigation */}
                  {navigation.map((item, idx) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-blue-600 font-medium text-lg px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile Auth Links */}
                  {/* Mobile Auth Links */}
                  {!user && (
                    <>
                      <hr className="my-4 border-gray-300" />
                      <div className="flex flex-col space-y-3">
                        {pathname !== "/login" && (
                          <Button asChild variant="outline" className="flex items-center gap-2">
                            <Link href="/login">
                              <LogIn className="h-4 w-4" />
                              Login
                            </Link>
                          </Button>
                        )}
                        {pathname !== "/register" && (
                          <Button asChild variant="outline" className="flex items-center gap-2">
                            <Link href="/register">
                              <UserPlus className="h-4 w-4" />
                              Register
                            </Link>
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
