'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  merchantName: string;
  merchantSlug: string;
  rating?: number;
  discount?: number;
  deliveryDays?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Coupon {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minAmount?: number;
  maxDiscount?: number;
  expiryDate: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  appliedCoupon: Coupon | null;
  applyCoupon: (couponCode: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getDiscountedPrice: () => number;
  getFinalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SAVE10',
    discount: 10,
    discountType: 'percentage',
    minAmount: 500,
    expiryDate: '2025-12-31'
  },
  {
    code: 'FLAT500',
    discount: 500,
    discountType: 'fixed',
    minAmount: 2000,
    maxDiscount: 500,
    expiryDate: '2025-12-31'
  },
  {
    code: 'WELCOME20',
    discount: 20,
    discountType: 'percentage',
    minAmount: 1000,
    maxDiscount: 1000,
    expiryDate: '2025-12-31'
  },
  {
    code: 'CITYWIT15',
    discount: 15,
    discountType: 'percentage',
    minAmount: 1500,
    expiryDate: '2025-12-31'
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('citywitty_cart');
    const storedCoupon = localStorage.getItem('citywitty_coupon');
    
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    
    if (storedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(storedCoupon));
      } catch (error) {
        console.error('Error parsing coupon from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('citywitty_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('citywitty_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('citywitty_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const applyCoupon = (couponCode: string): { success: boolean; message: string } => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    const today = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    
    if (today > expiryDate) {
      return { success: false, message: 'Coupon has expired' };
    }

    const totalPrice = getTotalPrice();
    
    if (coupon.minAmount && totalPrice < coupon.minAmount) {
      return { 
        success: false, 
        message: `Minimum purchase of ₹${coupon.minAmount} required` 
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${couponCode} applied successfully` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getDiscountedPrice = (): number => {
    if (!appliedCoupon) return 0;

    const totalPrice = getTotalPrice();
    let discount = 0;

    if (appliedCoupon.discountType === 'percentage') {
      discount = (totalPrice * appliedCoupon.discount) / 100;
    } else {
      discount = appliedCoupon.discount;
    }

    if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
      discount = appliedCoupon.maxDiscount;
    }

    return Math.round(discount);
  };

  const getFinalPrice = (): number => {
    return Math.max(0, getTotalPrice() - getDiscountedPrice());
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      getDiscountedPrice,
      getFinalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}