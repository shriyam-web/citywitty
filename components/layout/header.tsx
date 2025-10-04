'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogIn, UserPlus, Menu, User, LogOut, ChevronDown, Sparkles, MapPin, RefreshCcw } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import useAccurateLocation from '@/lib/useAccurateLocation';
import citiesData from '@/data/allCities.json';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About CityWitty', href: '/about' },
  { name: 'Activate Card', href: '/activate-track' },
  { name: 'Merchants', href: '/merchants' },
  { name: 'Contact', href: '/contact' },
  { name: 'Career', href: '/careers' },
  { name: 'Merchant Portal', href: 'https://partner.citywitty.com/' },
];

// --------------------- LocationDropdown Component ---------------------
interface LocationDropdownProps {
  manualLocation: string | null;
  setManualLocation: (city: string) => void;
  location: any;
  loading: boolean;
  refetchLocation: () => void;
}

function LocationDropdown({ manualLocation, setManualLocation, location, loading, refetchLocation }: LocationDropdownProps) {
  const [search, setSearch] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    if (!search) {
      setFilteredCities([]);
    } else {
      const filtered = citiesData
        .filter(city => city.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 10);
      setFilteredCities(filtered);
    }
  }, [search]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-300 hover:border-blue-500 hover:text-blue-600"
        >
          <MapPin className="h-4 w-4 text-blue-500" />
          {loading ? 'Detecting...' : manualLocation || location?.city || 'Choose City'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-xl border-0 shadow-xl p-2">
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search city..."
            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button size="sm" variant="ghost" onClick={refetchLocation} className="ml-2">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        {filteredCities.length > 0 ? (
          filteredCities.map(city => (
            <DropdownMenuItem
              key={city}
              onClick={() => {
                setManualLocation(city);
                setSearch('');
                localStorage.setItem('manualLocation', city);
              }}
            >
              {city}
            </DropdownMenuItem>
          ))
        ) : search ? (
          <p className="text-xs text-gray-400 p-2">No cities found.</p>
        ) : location ? (
          <div className="text-sm text-gray-700 mb-2">
            <p><strong>City:</strong> {manualLocation || location.city}</p>
            <p><strong>Lat:</strong> {location.lat?.toFixed(5)}</p>
            <p><strong>Lng:</strong> {location.lng?.toFixed(5)}</p>
            <p className="text-xs text-gray-400">Source: {location.source}</p>
          </div>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --------------------- Header Component ---------------------
export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Manual location state
  const [manualLocation, setManualLocation] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('manualLocation') : null
  );

  // Accurate location hook
  const { location, loading, refetch } = useAccurateLocation();

  // Cache location after first fetch
  useEffect(() => {
    if (location && !manualLocation) {
      localStorage.setItem('autoLocation', JSON.stringify(location));
    }
  }, [location, manualLocation]);

  const cachedLocation = typeof window !== 'undefined' ? localStorage.getItem('autoLocation') : null;
  const displayLocation = manualLocation || (cachedLocation ? JSON.parse(cachedLocation) : location);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardUrl = (role: string) => {
    switch (role) {
      case 'admin': return '/dashboard/admin';
      case 'merchant': return '/dashboard/merchant';
      case 'franchise': return '/dashboard/franchise';
      case 'it': return '/dashboard/it';
      default: return '/dashboard/user';
    }
  };

  const handleAutoDetect = () => {
    refetch(); // trigger accurate location fetch
    setManualLocation(null);
    localStorage.removeItem('manualLocation');
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between px-1 sm:px-2 md:px-4 lg:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <img src="/citywittynew.png" alt="CityWitty Logo" className="max-w-[150px] sm:max-w-[180px] md:max-w-[210px] lg:max-w-[205px] h-auto mt-1" />
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Desktop Location Dropdown */}
            <div className="hidden sm:flex">
              <LocationDropdown
                manualLocation={manualLocation}
                setManualLocation={setManualLocation}
                location={displayLocation}
                loading={loading}
                refetchLocation={handleAutoDetect}
              />
            </div>

            {/* Desktop Login/Register */}
            {!user && (
              <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
                {pathname !== '/login' && (
                  <Button asChild variant="outline" className="border-gray-300 hover:border-blue-500 hover:text-blue-600 flex items-center gap-2">
                    <Link href="/login"><LogIn className="h-4 w-4" />Login</Link>
                  </Button>
                )}
                {pathname !== '/get-card' && (
                  <Button asChild variant="outline" className="border-gray-300 hover:border-orange-500 hover:text-orange-600 flex items-center gap-2">
                    <Link href="/register"><UserPlus className="h-4 w-4" />Register</Link>
                  </Button>
                )}
              </div>
            )}

            {/* Logged-in User Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-full
                               bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500
                               bg-[length:200%_200%] animate-gradient-move
                               text-white font-medium shadow-lg hover:shadow-xl
                               transform hover:scale-105 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border-0 shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardUrl(user.role)} className="flex items-center text-sm">
                      <Sparkles className="mr-2 h-4 w-4" />Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-sm">
                    <LogOut className="mr-2 h-4 w-4" />Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Get Your Card */}
            {!user && (
              <Button asChild className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-1 sm:px-2 md:px-4 py-1 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-xs sm:text-sm">
                <Link href="/login">Get Your Card</Link>
              </Button>
            )}

            {/* Burger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className={`p-2 rounded-xl ${isScrolled ? 'text-gray-700 hover:bg-blue-50' : 'hover:bg-white/10'}`}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-slide-in">

                {/* Mobile Location Dropdown */}
                <br />
                <div className="flex flex-col sm:hidden mb-4">
                  <LocationDropdown
                    manualLocation={manualLocation}
                    setManualLocation={setManualLocation}
                    location={displayLocation}
                    loading={loading}
                    refetchLocation={handleAutoDetect}
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4 mt-10">
                  {navigation.map((item, idx) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-blue-600 font-medium text-base px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 opacity-0 animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <hr className="my-4 border-gray-300" />

                  {/* Mobile Login/Register or Logged-in */}
                  {!user ? (
                    <div className="flex flex-col space-y-3">
                      {pathname !== '/login' && (
                        <Button asChild variant="outline" className="flex items-center gap-2 text-sm">
                          <Link href="/login"><LogIn className="h-4 w-4" />Login</Link>
                        </Button>
                      )}
                      {pathname !== '/register' && (
                        <Button asChild variant="outline" className="flex items-center gap-2 text-sm">
                          <Link href="/register"><UserPlus className="h-4 w-4" />Register</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg">
                      <Link href="/get-card">Get Your Card</Link>
                    </Button>
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
