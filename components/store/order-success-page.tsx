"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/store');
    }, 8000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border border-slate-200 bg-white shadow-xl">
        <CardContent className="pt-12">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Order Confirmed!</h1>
            <p className="mt-3 text-lg text-slate-600">Thank you for your purchase</p>
          </div>

          <div className="mt-8 rounded-lg bg-green-50 p-6 border border-green-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-900">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Order confirmed and payment received</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-900">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>We'll send you tracking details via email</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-900">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Your order will be delivered within 2-3 days</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-center text-sm text-slate-600">
              A confirmation email has been sent to your inbox. You can check the status anytime from your account.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/store"
                className="block text-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  const email = prompt('Enter your email to view order details:');
                  if (email) {
                    console.log('Order details for:', email);
                  }
                }}
                className="block text-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                View Order Details
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Redirecting you back to store in 8 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
