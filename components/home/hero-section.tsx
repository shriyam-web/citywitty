
'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CreditCard, Sparkles, Zap, Gift, Play, CheckCircle, TrendingUp } from 'lucide-react';
// import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import PremiumCard from "@/components/PremiumCard";


const cityIcons = [
  "/icons/lotus.png",
  "/icons/gateway.png",
  "/icons/imambara.png",
  "/icons/hawa-mahal.png",
  "/icons/charminar.png",
  "/icons/victoria.png",
  // "/icons/india-gate.png",
  // "/icons/mysore-palace.png",
  // "/icons/statue-unity.png",
  // "/icons/marina.png",
];
// Rotating live offers


const rotatingOffers = [
  { merchant: 'Royal Palace Hotel', discount: '30% OFF', category: 'Hotels', color: 'from-blue-500 to-cyan-400' },
  { merchant: 'Style Studio Salon', discount: '25% OFF', category: 'Beauty', color: 'from-pink-500 to-rose-400' },
  { merchant: 'Gadget Galaxy', discount: '20% OFF', category: 'Electronics', color: 'from-purple-500 to-indigo-400' },
  { merchant: 'Fashion Forward', discount: '35% OFF', category: 'Fashion', color: 'from-orange-500 to-yellow-400' }
];

// Floating background icons
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

  // --- Desktop Mouse Drag ---
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

  // --- Mobile Touch Drag ---
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

          {/* FRONT */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden 
          bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 border border-gray-600
          [backface-visibility:hidden]">

            {/* Metallic Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-15 mix-blend-overlay" />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center text-[5rem] sm:text-[7rem] font-extrabold text-gray-700/10 tracking-widest rotate-[-20deg]">
              SAVINGS
            </div>

            {/* Content */}
            {/* <div className="relative p-6 flex flex-col justify-between h-full text-white"> change 1 */}
            <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between h-full text-white">

              <div className="flex justify-between items-center">
                {/* <div className="text-2xl sm:text-3xl font-extrabold tracking-wide">
                  City<span className="text-orange-400">Witty</span>
                </div> */}
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

              {/* <div className="font-mono text-xl sm:text-2xl md:text-3xl tracking-widest">
                **** **** **** 1234
              </div>

              <div className="flex justify-between items-end text-sm sm:text-base"> change 2 */}
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

          {/* BACK */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden 
          bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-600 
          [transform:rotateY(180deg)] [backface-visibility:hidden]">

            {/* Metallic Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metallic-fabric.png')] opacity-10 mix-blend-overlay" />

            {/* Content */}
            <div className="relative p-6 flex flex-col justify-between h-full text-white">
              {/* Chip */}
              <div className="w-16 h-12 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 
              rounded-md mx-auto shadow-md border border-yellow-400" />

              {/* Branding */}
              <div className="flex flex-col items-center space-y-2">
                {/* <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide 
                bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  City<span className="text-orange-500">Witty</span> Privilege Card
                </h2> */}
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

              {/* Strip */}
              <div className="w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 rounded-full opacity-80" />
            </div>
          </div>



        </motion.div >

      </div >
      {/* Controls under the card */}
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


// Hero Section Page



export function HeroSection() {
  const [currentCity, setCurrentCity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCity((prev) => (prev + 1) % cityIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden px-4 sm:px-10 lg:px-20">
      {/* Background Glow */}
      <div className="absolute top-20 left-5 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-tr from-orange-300/40 to-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-0 w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-gradient-to-tr from-blue-300/40 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* ✅ Adjusted grid for tablets */}
      <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-[1fr_minmax(340px,520px)] gap-8 sm:gap-12 lg:gap-20 items-start">





        {/* LEFT CONTENT */}
        <motion.div
          className="space-y-5 sm:space-y-7 md:space-y-8 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-orange-100 to-blue-100 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold border border-gray-200 shadow-sm mt-3 sm:mt-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-gray-700">India's #1 Premium Discount Platform</span>
          </motion.div>


          {/* Headings */}
          <div className="space-y-2 sm:space-y-4 max-w-2xl mx-auto md:mx-0">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-orange-500 via-blue-600 to-orange-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
                Your City,
              </span>
              <span className="block text-gray-900 dark:text-white">
                Your Lifestyle.
              </span>
            </motion.h1>

            <motion.h2
              className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Unlock <span className="text-orange-500">exclusive deals</span> with every transaction.
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              A <span className="font-semibold text-blue-600">premium advantage</span> that makes
              living smarter, simpler & more rewarding.
            </motion.p>
          </div>

          {/* Trust Line */}
          <motion.p
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 font-medium text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            Trusted by <span className="text-orange-500 font-semibold">25,000+ members</span> across India – saving on food, fashion & travel every day.
          </motion.p>


          {/* ✅ CTA Buttons center aligned on md */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg shadow-xl rounded-xl transition-transform hover:scale-105">
              🚀 Get Your Card Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl transition-transform hover:scale-105"
            >
              🔍 Explore Merchants
            </Button>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT - Premium Card */}
        {/* RIGHT CONTENT - Premium Card */}
        {/* RIGHT CONTENT - Premium Card */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <motion.div
            className="w-full max-w-[520px]"  // ⬅️ increased size
            whileHover={{ rotate: -2, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <PremiumCard />
          </motion.div>
        </motion.div>


      </div>

      {/* ✅ Rotating City Skyline - adjusted heights */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <img
              key={i}
              src="/cities1.png"
              alt="City Skyline"
              className="h-12 sm:h-16 md:h-20 lg:h-24 object-cover flex-shrink-0"

            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}





