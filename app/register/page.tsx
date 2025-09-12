'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from '@/components/layout/footer';
import { useMemo } from 'react';
import Script from "next/script";
export const metadata: Metadata = {
  title: "Register | Create Your CityWitty Privilege Card Account",
  description:
    "Sign up for CityWitty Privilege Card to unlock exclusive lifestyle discounts, premium merchant offers, and smarter shopping rewards.",
  keywords: [
    "CityWitty Register",
    "CityWitty Sign Up",
    "Privilege Card Registration",
    "Exclusive Lifestyle Deals",
    "Discount Card Membership"
  ],
  openGraph: {
    title: "Register | CityWitty Privilege Card",
    description:
      "Create your CityWitty account today and access premium lifestyle offers, discounts, and loyalty rewards.",
    url: "https://citywitty.com/register",
    siteName: "CityWitty",
    images: [
      {
        url: "https://citywitty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CityWitty Register Page"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | CityWitty Privilege Card",
    description: "Join CityWitty and unlock premium lifestyle discounts and merchant deals.",
    images: ["https://citywitty.com/og-image.png"]
  },
  alternates: {
    canonical: "https://citywitty.com/register"
  }
};



export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();
  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "protonmail.com"];
  const validatePassword = (pwd: string) => ({
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[@$!%*?&]/.test(pwd),
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordChecks(validatePassword(newPassword));
  };

  const strength = Object.values(passwordChecks).filter(Boolean).length * 25;

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const success = await register(email, password, name, 'user');

    if (success) {
      router.push('/dashboard/user');
    } else {
      setError('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  const floatingEmojis = useMemo(() => {
    const emojis = ["💸", "🎉", "😍", "❤️", "🛍️", "✨", "😁", "💖"];
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 90, // random horizontal %
      delay: Math.random() * 5, // random delay
      duration: 4 + Math.random() * 4, // 4–8s
      size: 24 + Math.random() * 20, // 24–44px
    }));
  }, []);

  return (
    <>
      <Header />
      <Script id="org-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CityWitty",
            url: "https://citywitty.com",
            logo: "https://citywitty.com/logo.png",
            description:
              "India's premier discount card platform offering exclusive deals from verified merchants across the nation. Experience luxury for less.",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-6389202030",
                contactType: "customer support",
                email: "contact@citywitty.com",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"]
              }
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Unit 316 & 317, P-3, 3rd Floor, Paramount Golf Foreste",
              addressLocality: "Greater Noida",
              postalCode: "201311",
              addressCountry: "IN"
            },
            sameAs: [
              "https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr",
              "https://twitter.com/citywitty",
              "https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0",
              "https://www.linkedin.com/company/citywitty",
              "https://youtube.com/@citywitty3546?si=IfcAhXmKq9vmIfA8",
              "https://wa.me/916389202030",
              "https://share.google/BYU7k1Knf0p4WshcS"
            ]
          })
        }}
      />

      <Script id="website-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CityWitty",
            url: "https://citywitty.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://citywitty.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      {/* <br /> <br /> */}

      <div className="pt-20  min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full max-w-6xl bg-white  rounded-2xl overflow-hidden border border-gray-200"
        >
          {/* LEFT - Benefits */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex relative w-1/2 flex-col justify-between
             bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 
             text-white p-10 rounded-r-3xl overflow-hidden"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {/* Random Floating Emojis */}
            {floatingEmojis.map((item) => (
              <motion.span
                key={item.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: -250,
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 1.2],
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  delay: item.delay,
                }}
                className="absolute"
                style={{
                  left: `${item.left}%`,
                  bottom: "-40px",
                  fontSize: `${item.size}px`,
                }}
              >
                {item.emoji}
              </motion.span>
            ))}

            {/* TOP content */}
            <div className="relative z-10 space-y-6">
              <h1 className="text-4xl font-extrabold leading-snug">
                Feel the <span className="text-yellow-300">Joy of Savings</span> with CityWitty 🎊
              </h1>

              <p className="text-lg text-gray-100">
                Your <span className="font-semibold text-yellow-300">premium lifestyle card </span>
                that makes shopping happier, smarter & full of rewards! 💃✨
              </p>

              <ul className="space-y-3 text-base font-medium">
                <li>💎 Unlock <span className="text-yellow-300">exclusive deals</span> from top merchants</li>
                <li>⚡ Enjoy <span className="text-yellow-300">super-fast checkout</span> hassle-free</li>
                <li>🎁 Grab <span className="text-yellow-300">early-bird offers</span> & loyalty rewards</li>
                <li>📊 Track <span className="text-yellow-300">your savings</span> like never before</li>
              </ul>
            </div>

            {/* BOTTOM illustration */}
            <div className="flex justify-center mt-8">
              <motion.img
                // whileHover={{ scale: 1.05 }}
                src="/register.png"
                alt="Happy Savings"
                className="w-[80%] h-auto  bottom-0"
                style={{ maxHeight: "350px" }}
              />
            </div>
          </motion.div>





          {/* RIGHT - Registration Form */}
          <div className="w-full md:w-1/2 p-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Sign up today and start saving smarter
                </CardDescription>
              </CardHeader>

              <CardContent>
                {error && (
                  <div className="mb-3 p-2 rounded-md bg-red-100 text-red-700 text-center text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        // Show dropdown only if user typed @
                        setShowDropdown(e.target.value.includes("@"));
                      }}
                      placeholder="Enter your email"
                      required
                    />

                    {/* Suggestions dropdown */}
                    {showDropdown && (
                      <ul className="absolute bg-white border rounded shadow-md w-full mt-1 text-sm z-10">
                        {emailDomains.map((domain) => {
                          const [localPart, typedDomain] = email.split("@");
                          if (!domain.startsWith(typedDomain)) return null;

                          return (
                            <li
                              key={domain}
                              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setEmail(`${localPart}@${domain}`);
                                setShowDropdown(false); // <-- hide dropdown after selecting
                              }}
                            >
                              {localPart}@{domain}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Label
                      htmlFor="password"
                      className="block mb-1 text-sm font-medium"
                    >
                      Password
                    </Label>

                    {/* Input + Eye Button */}
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        placeholder="Enter your password"
                        required
                        className="pr-12"
                      />

                      {/* Eye / EyeOff Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Bar */}
                    {password && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${strength}%` }}
                        transition={{ duration: 0.4 }}
                        className={`h-1.5 mt-2 rounded-full ${strength < 50
                          ? "bg-red-500"
                          : strength < 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          }`}
                      />
                    )}

                    {/* Tooltip checks */}
                    <AnimatePresence>
                      {isPasswordFocused && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-3 text-xs space-y-1 z-20"
                        >
                          {/* Intro line added */}
                          <p className="font-medium text-gray-700 mb-2">
                            To help <span className="text-blue-600 font-semibold">CityWitty</span> keep your account safe from attacks, please include:
                          </p>

                          <p
                            className={
                              passwordChecks.length ? "text-green-600" : "text-red-600"
                            }
                          >
                            {passwordChecks.length ? "✔" : "✘"} Length : 8 to 12 characters atleast
                          </p>
                          <p
                            className={
                              passwordChecks.uppercase ? "text-green-600" : "text-red-600"
                            }
                          >
                            {passwordChecks.uppercase ? "✔" : "✘"} One uppercase character
                          </p>
                          <p
                            className={
                              passwordChecks.number ? "text-green-600" : "text-red-600"
                            }
                          >
                            {passwordChecks.number ? "✔" : "✘"} One number
                          </p>
                          <p
                            className={
                              passwordChecks.special ? "text-green-600" : "text-red-600"
                            }
                          >
                            {passwordChecks.special ? "✔" : "✘"} One special character i.e. !@#$%^&*
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>


                  {/* Confirm Password */}
                  <div className="mt-4">
                    <Label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className="pr-12"
                      />

                      {/* Eye / EyeOff Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>


                  {/* Submit */}
                  <Button type="submit" className="w-full text-sm hover:scale-[1.02] transition-all" disabled={isLoading}>
                    {isLoading ? "Creating account..." : (<><UserPlus className="mr-1 h-4 w-4" /> Create Account</>)}
                  </Button>
                </form>

                {/* OR */}
                <div className="flex items-center my-4">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="px-2 text-gray-500 text-xs">OR</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Google Signup */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-sm hover:scale-[1.02] transition-all"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard/user" })}
                >
                  <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-4 w-4" />
                  Sign up with Google
                </Button>

                {/* Login link */}
                <div className="mt-4 text-center text-xs">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    Sign in
                  </Link>

                </div>

              </CardContent>

            </Card>

          </div>

        </motion.div>

      </div>

      <Footer />
    </>
  );
}
