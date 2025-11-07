"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, appliedCoupon, applyCoupon, removeCoupon, getTotalPrice, getDiscountedPrice, getFinalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(productId, quantity);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode("");
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success("Coupon removed");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    
    try {
      const finalPrice = getFinalPrice();
      
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          merchantName: item.merchantName
        })),
        subtotal: getTotalPrice(),
        discount: getDiscountedPrice(),
        couponCode: appliedCoupon?.code || null,
        totalAmount: finalPrice,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('pending_order', JSON.stringify(orderData));
      
      router.push('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Failed to proceed to checkout");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-lg shadow-slate-900/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 shadow-inner">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Start adding items from our curated collections</p>
            <Link href="/store" className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 hover:bg-indigo-600">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discount = getDiscountedPrice();
  const total = getFinalPrice();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-lg text-slate-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 border-b border-slate-100 p-6 last:border-0">
                      <div className="flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{item.merchantName}</p>
                            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-slate-400 transition hover:text-red-600"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="px-3 py-2 text-slate-600 transition hover:bg-slate-200"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="px-3 py-2 text-slate-600 transition hover:bg-slate-200"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">₹{item.price} each</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Apply Coupon Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-green-900">Coupon Applied: {appliedCoupon.code}</p>
                      <p className="mt-1 text-xs text-green-700">
                        {appliedCoupon.discountType === 'percentage' 
                          ? `${appliedCoupon.discount}% off` 
                          : `₹${appliedCoupon.discount} off`}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-green-600 transition hover:text-green-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-600"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="space-y-2 rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Available Coupons:</p>
                      <div className="space-y-2 text-xs text-slate-600">
                        <p>• <span className="font-semibold">SAVE10</span> - 10% off (min ₹500)</p>
                        <p>• <span className="font-semibold">FLAT500</span> - ₹500 off (min ₹2000)</p>
                        <p>• <span className="font-semibold">WELCOME20</span> - 20% off (min ₹1000)</p>
                        <p>• <span className="font-semibold">CITYWIT15</span> - 15% off (min ₹1500)</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-slate-200 bg-white shadow-sm sticky top-20">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold">Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold text-green-600">−₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">₹{total}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </button>
                <Link
                  href="/store"
                  className="block text-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  Continue Shopping
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
