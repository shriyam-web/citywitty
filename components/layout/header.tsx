// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/lib/auth-context';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu, User, LogOut, ChevronDown, Sparkles, Crown } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// const navigation = [
//   { name: 'Home', href: '/' },
//   { name: 'About CityWitty', href: '/about' },
//   { name: 'Activate Card', href: '/activate-track' },
//   { name: 'Merchants', href: '/merchants' },
//   { name: 'Contact', href: '/contact' },
//   { name: 'Merchant Portal', href: '/partner' },
// ];

// export function Header() {
//   const { user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const getDashboardUrl = (role: string) => {
//     switch (role) {
//       case 'admin': return '/dashboard/admin';
//       case 'merchant': return '/dashboard/merchant';
//       case 'franchise': return '/dashboard/franchise';
//       case 'it': return '/dashboard/it';
//       default: return '/dashboard/user';
//     }
//   };

//   return (
//     <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
//       ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
//       : 'bg-transparent'
//       }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">

//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-3 group">

//             <div className="flex flex-col">

//               <img
//                 src="/citywittynew.png"
//                 alt="CityWitty Logo"
//                 className="h-12 w-auto"
//               />
//             </div>



//           </Link>

//           {/* Right Side (Login + Get Card + Burger) */}
//           <div className="flex items-center space-x-3">

//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${isScrolled
//                       ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
//                       : 'text-white hover:bg-white/10'
//                       }`}
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center">
//                       <User className="h-4 w-4 text-white" />
//                     </div>
//                     <span className="hidden sm:inline font-medium">{user.name}</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border-0 shadow-xl">
//                   <DropdownMenuItem asChild>
//                     <Link href={getDashboardUrl(user.role)} className="flex items-center">
//                       <Sparkles className="mr-2 h-4 w-4" />
//                       Dashboard
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={logout}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <>
//                 <div
//                   className={`font-medium transition ${isScrolled
//                     ? 'text-gray-700 hover:text-blue-600'
//                     : 'text-white hover:text-gray-200'
//                     }`}
//                 >
//                   <div className="font-medium text-black transition">
//                     <Link href="/login" className="hover:underline mr-2">
//                       Login
//                     </Link>
//                     /
//                     <Link href="/register" className="hover:underline ml-2">
//                       Register
//                     </Link>
//                   </div>

//                 </div>

//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
//                 >
//                   <Link href="/register">Get Your Card</Link>
//                 </Button>
//               </>
//             )}

//             {/* Burger Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className={`p-2 rounded-xl ${isScrolled
//                     ? 'text-gray-700 hover:bg-blue-50'
//                     : ' hover:bg-white/10'
//                     }`}
//                 >
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="right"
//                 className="w-[300px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-slide-in"
//               >
//                 <div className="flex flex-col space-y-4 mt-10">
//                   {navigation.map((item, idx) => (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       onClick={() => setIsOpen(false)}
//                       className="text-gray-700 hover:text-blue-600 font-medium text-lg px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 opacity-0 animate-fade-in"
//                       style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div >
//       </div >
//     </header >
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Crown,
  LogIn,
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
  { name: 'Merchant Portal', href: '/partner' },
];

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname(); // 👈 current route
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
              src="/citywittynew.png"
              alt="CityWitty Logo"
              className="h-12 w-auto max-w-[160px] flex-shrink-0"
            />
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {user ? (
              // Logged In User Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${isScrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:bg-white/10'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline font-medium">
                      {user.name}
                    </span>
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
            ) : (
              <>
                {/* Desktop Login/Register */}
                <div
                  className={`hidden md:block font-medium transition ${isScrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-white hover:text-gray-200'
                    }`}
                >
                  <div className="font-medium text-black transition">
                    {pathname !== '/login' && (
                      <Link href="/login" className="hover:underline mr-2">
                        Login
                      </Link>
                    )}
                    {pathname !== '/register' && (
                      <>
                        /
                        <Link href="/register" className="hover:underline ml-2">
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Link href="/register">Get Your Card</Link>
                </Button>
              </>
            )}

            {/* Burger Menu (Mobile) */}
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
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-slide-in"
              >
                <div className="flex flex-col space-y-4 mt-10">
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

                  {/* Auth Links for Mobile */}
                  {!user && (
                    <>
                      <hr className="my-4 border-gray-300" />
                      <div className="flex flex-col space-y-3">
                        {pathname !== '/login' && (
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg px-4 py-2 rounded-lg hover:bg-blue-50"
                          >
                            <LogIn className="h-5 w-5 mr-2" />
                            Login
                          </Link>
                        )}
                        {pathname !== '/register' && (
                          <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg px-4 py-2 rounded-lg hover:bg-blue-50"
                          >
                            <Crown className="h-5 w-5 mr-2" />
                            Register
                          </Link>
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
