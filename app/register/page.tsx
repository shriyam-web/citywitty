'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <>
      <Header />
      <br /> <br /> <br />

      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200"
        >
          {/* LEFT - Benefits */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex w-1/2 flex-col justify-center bg-gradient-to-br from-blue-700 to-purple-800 text-white p-10 space-y-6"
          >
            <h1 className="text-3xl font-bold leading-snug">
              Unlock Premium Benefits with <span className="text-yellow-300">CityWitty</span>
            </h1>
            <ul className="space-y-3 text-sm">
              <li>✨ Get exclusive discounts from premium merchants</li>
              <li>⚡ Fast & secure checkout for a smooth experience</li>
              <li>🎁 Access early-bird offers & loyalty rewards</li>
              <li>📊 Track your savings & manage your profile easily</li>
            </ul>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://illustrations.popsy.co/blue/shopping.svg"
              alt="Benefits"
              className="w-64 mx-auto mt-6 drop-shadow-lg"
            />
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
