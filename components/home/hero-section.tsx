
'use client';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect } from 'react';
import { motion, Variants, easeInOut, easeOut } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CreditCard, Sparkles, Zap, Gift, Play, CheckCircle, TrendingUp } from 'lucide-react';


const cityIcons = [
  "/icons/lotus.png",
  "/icons/gateway.png",
  "/icons/imambara.png",
  "/icons/hawa-mahal.png",
  "/icons/charminar.png",
  "/icons/victoria.png",
];

const rotatingOffers = [
  { merchant: 'Royal Palace Hotel', discount: '30% OFF', category: 'Hotels', color: 'from-blue-500 to-cyan-400' },
  { merchant: 'Style Studio Salon', discount: '25% OFF', category: 'Beauty', color: 'from-pink-500 to-rose-400' },
  { merchant: 'Gadget Galaxy', discount: '20% OFF', category: 'Electronics', color: 'from-purple-500 to-indigo-400' },
  { merchant: 'Fashion Forward', discount: '35% OFF', category: 'Fashion', color: 'from-orange-500 to-yellow-400' }
];

const floatingElements = [
  { icon: Gift, delay: '0s', position: 'top-40 left-[30%]' },
  { icon: Zap, delay: '1s', position: 'top-32 right-[15%]' },
  { icon: Sparkles, delay: '2s', position: 'bottom-32 left-[20%]' },
  { icon: Star, delay: '3s', position: 'bottom-20 right-[10%]' }
];

export default function PremiumCard() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setLastPos({ x: e.clientX, y: e.clientY });

    setRotation((prev) => ({
      x: prev.x + dy * 0.6,
      y: prev.y + dx * 0.6,
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setLastPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - lastPos.x;
    const dy = touch.clientY - lastPos.y;
    setLastPos({ x: touch.clientX, y: touch.clientY });

    setRotation((prev) => ({
      x: prev.x + dy * 0.6,
      y: prev.y + dx * 0.6,
    }));
  };
  const { user } = useAuth();
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <>
      <div
        className="flex justify-center items-center p-6 select-none"
        style={{ perspective: "1200px" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="relative w-[90vw] max-w-[640px] aspect-[16/9] 
    rounded-3xl shadow-2xl border border-gray-700 cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >

          <div className="absolute inset-0 rounded-3xl overflow-hidden 
          bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 border border-gray-600
          [backface-visibility:hidden]">

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-15 mix-blend-overlay" />

            <div className="absolute inset-0 flex items-center justify-center text-[5rem] sm:text-[7rem] font-extrabold text-gray-700/10 tracking-widest rotate-[-20deg]">
              SAVINGS
            </div>

            <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between h-full text-white">

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <img
                      src="/logo.png"
                      alt="CityWitty Logo"
                      className="h-8 sm:h-10 md:h-12 w-auto"
                    />
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                      CityWitty
                    </span>
                    <div className="text-[0.65rem] sm:text-xs md:text-sm text-gray-400">
                      Privilege Cards
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-green-400">Active</span>
                </div>
              </div>

              <div className="font-mono text-base sm:text-xl md:text-2xl tracking-widest">
                **** **** **** 1234
              </div>
              <div className="flex justify-between items-end text-[0.6rem] sm:text-sm md:text-base">
                <div>
                  <div className="font-semibold">Your Name Here</div>
                  <div className="text-xs text-gray-400">Premium Member</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Valid Upto</div>
                  <div className="font-semibold">12/2030</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl overflow-hidden 
          bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-600 
          [transform:rotateY(180deg)] [backface-visibility:hidden]">

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metallic-fabric.png')] opacity-10 mix-blend-overlay" />

            <div className="relative p-6 flex flex-col justify-between h-full text-white">
              <div className="w-16 h-12 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 
              rounded-md mx-auto shadow-md border border-yellow-400" />

              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">

                    <img
                      src="/logo.png"
                      alt="CityWitty Logo"
                      className="h-12 w-auto"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                      CityWitty
                    </span>
                    <div className="text-xs text-gray-400">Privilage Cards</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 italic">
                  Enjoy Unlimited Savings
                </p>
              </div>

              <div className="w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 rounded-full opacity-80" />
            </div>
          </div>

        </motion.div >

      </div >
      <div className="mt-4 flex justify-center gap-3">
        <Button
          size="sm"
          onClick={() => setRotation({ x: 0, y: rotation.y + 180 })}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded-lg shadow-sm border border-gray-300"
        >
          👁 View in 360°
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setRotation({ x: 0, y: 0 })}
          className="bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-lg border border-gray-300"
        >
          Reset View
        </Button>
      </div>

    </>
  );
}


export function HeroSection() {
  const [currentCity, setCurrentCity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [memberCount, setMemberCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCity((prev) => (prev + 1) % cityIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (memberCount >= 25000) return;
    const interval = setInterval(() => {
      setMemberCount((prev) => {
        const newCount = prev + Math.floor(Math.random() * 50) + 10;
        return newCount > 25000 ? 25000 : newCount;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [memberCount]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: easeInOut }
    }
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: easeInOut }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 opacity-60" />

      <motion.div
        className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-200/30 via-blue-100/15 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-orange-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-200/15 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-8 lg:pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
              {/* Left Content */}
              <motion.div className="space-y-3 flex flex-col justify-center order-1 lg:order-1">
                {/* Main Heading - Clean */}
                <motion.div variants={itemVariants} className="pt-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
                    Earn Rewards &amp; Save More
                  </h1>
                </motion.div>

                {/* Description - Focused */}
                <motion.div variants={itemVariants} className="max-w-2xl">
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    Get up to 35% discounts, cashback rewards, and exclusive deals on 500+ premium brands across fashion, dining, travel, and more.
                  </p>
                </motion.div>

                {/* Stats - Minimal */}
                <motion.div variants={itemVariants} className="flex gap-6 pt-2">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">500+</div>
                    <div className="text-xs text-gray-600 font-medium">Partner Brands</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">35%</div>
                    <div className="text-xs text-gray-600 font-medium">Max Discount</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">25k+</div>
                    <div className="text-xs text-gray-600 font-medium">Active Users</div>
                  </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-2">
                  <Button
                    asChild
                    className="w-full sm:w-auto px-8 sm:px-12 py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Link href={user ? "/get-card" : "/register"} className="flex items-center gap-2 justify-center">
                      <span>Get Card Now</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full sm:w-auto px-8 sm:px-12 py-3 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all duration-300"
                  >
                    <Link href="/merchants" className="flex items-center gap-2 justify-center">
                      <span>Browse Deals</span>
                      <Sparkles size={18} />
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust Section - Simple */}
                <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        👤
                      </div>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-gray-900">Trusted by {memberCount.toLocaleString()}+</div>
                    <div className="text-xs text-gray-600">Active members</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Enhanced Card */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-end items-center order-2 lg:order-2"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                  className="relative w-full max-w-lg"
                >
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-br from-white/60 via-white/30 to-transparent rounded-3xl blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-tr from-white/50 to-transparent rounded-3xl blur-2xl"
                    animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -inset-10 bg-gradient-to-b from-white/40 to-transparent rounded-3xl blur-3xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10">
                    <PremiumCard />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 h-20 sm:h-24 md:h-32">
        <motion.div
          className="flex w-max gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: isMobile ? 200 : 150, ease: "linear" }}
        >
          {/* Reduce number of elements on mobile for better performance */}
          {[...Array(isMobile ? 12 : 30)].map((_, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 h-full flex items-end justify-center group"
            >
              <motion.img
                src="/cities1.png"
                alt="City Skyline"
                className="h-full object-cover opacity-10 group-hover:opacity-20 grayscale transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
