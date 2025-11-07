# CityWitty Store - Cart & Checkout System

Complete implementation of cart, coupon, and payment gateway integration for the CityWitty store.

## Features Implemented

### 1. Shopping Cart (`/cart`)
- **Cart Page** (`components/store/cart-page.tsx`)
  - Display cart items with product details
  - Quantity controls (increase/decrease/remove)
  - Real-time price calculation
  - Empty cart handling with redirect to store
  - Coupon application section
  - Order summary sidebar

### 2. Coupon System
- **Coupon Management** (`lib/cart-context.tsx`)
  - Percentage-based discounts (e.g., 10%, 15%, 20%)
  - Fixed amount discounts (e.g., ₹500 off)
  - Minimum purchase requirements
  - Maximum discount caps
  - Expiry date validation
  
- **Available Coupons** (Sample):
  - `SAVE10`: 10% off (min ₹500)
  - `FLAT500`: ₹500 off (min ₹2000, max ₹500)
  - `WELCOME20`: 20% off (min ₹1000, max ₹1000)
  - `CITYWIT15`: 15% off (min ₹1500)

### 3. Checkout Flow (`/checkout`)
- **Checkout Page** (`components/store/checkout-page.tsx`)
  - Delivery address form with validation
  - Multiple payment methods (Card, UPI, Net Banking, Wallet)
  - Real-time form validation
  - Order summary with itemized breakdown
  - Discount display and calculation

### 4. Payment Gateway Integration
- **Razorpay Integration** (`app/api/create-order/route.ts`, `app/api/verify-payment/route.ts`)
  - Secure payment processing
  - Order creation
  - Payment verification with signature validation
  - SSL encryption for payment data
  - Support for multiple payment methods

### 5. Order Success
- **Order Success Page** (`/order-success`)
  - Order confirmation display
  - Auto-redirect to store after 8 seconds
  - Delivery status information

## File Structure

```
components/
├── store/
│   ├── cart-page.tsx              # Cart page component
│   ├── checkout-page.tsx          # Checkout page component
│   ├── order-success-page.tsx     # Order success page component
│   └── page.tsx                   # Store listing page

app/
├── cart/
│   └── page.tsx                   # Cart route
├── checkout/
│   └── page.tsx                   # Checkout route
├── order-success/
│   └── page.tsx                   # Order success route
└── api/
    ├── create-order/
    │   └── route.ts               # Create Razorpay order
    └── verify-payment/
        └── route.ts               # Verify payment signature

lib/
└── cart-context.tsx               # Cart state management with coupons
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install razorpay
```

### 2. Configure Environment Variables
Add these to `.env.local`:

```env
# Razorpay Keys
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET_KEY=your_api_secret_key
```

### 3. Get Razorpay Keys
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up and create an account
3. Navigate to Settings → API Keys
4. Copy your Key ID and Key Secret
5. Add them to `.env.local`

## Usage Flow

### Customer Flow

1. **Browse Store** → `/store`
   - User browses products from different categories
   - Clicks "Add to cart" for products

2. **View Cart** → `/cart`
   - User reviews cart items
   - Adjusts quantities
   - Applies coupon code (optional)
   - Clicks "Proceed to Checkout"

3. **Checkout** → `/checkout`
   - User enters delivery address
   - Selects payment method (Card/UPI)
   - Reviews order summary
   - Clicks "Pay Now"

4. **Payment** → Razorpay Modal
   - Razorpay payment gateway opens
   - User completes payment
   - Payment verified and order confirmed

5. **Order Success** → `/order-success`
   - Order confirmation displayed
   - Auto-redirect to store

### Developer API

#### Cart Context Methods

```typescript
// Add product to cart
addToCart(product: Product): void

// Remove product from cart
removeFromCart(productId: string): void

// Update quantity
updateQuantity(productId: string, quantity: number): void

// Apply coupon
applyCoupon(couponCode: string): { success: boolean; message: string }

// Remove coupon
removeCoupon(): void

// Get cart totals
getTotalItems(): number
getTotalPrice(): number
getDiscountedPrice(): number  // Returns discount amount
getFinalPrice(): number       // Returns final price after discount

// Clear entire cart
clearCart(): void
```

#### API Endpoints

**POST /api/create-order**
Request:
```json
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "order_123",
  "notes": {
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }
}
```

Response:
```json
{
  "id": "order_1234567890",
  "amount": 50000,
  "currency": "INR",
  "status": "created"
}
```

**POST /api/verify-payment**
Request:
```json
{
  "orderId": "order_1234567890",
  "paymentId": "pay_1234567890",
  "signature": "signature_hash",
  "customerData": {...},
  "orderData": {...}
}
```

Response:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "orderId": "order_1234567890",
  "paymentId": "pay_1234567890"
}
```

## Coupon Management

### Adding New Coupons

Edit `lib/cart-context.tsx` and add to `AVAILABLE_COUPONS` array:

```typescript
{
  code: 'NEWCOUP',
  discount: 25,
  discountType: 'percentage',  // or 'fixed'
  minAmount: 2000,             // optional
  maxDiscount: 1000,           // optional, for percentage discounts
  expiryDate: '2025-12-31'
}
```

### Coupon Validation Logic

1. Check if coupon code exists
2. Validate expiry date
3. Check minimum purchase amount
4. Apply discount:
   - Percentage: `(totalAmount * discount) / 100`
   - Fixed: Direct amount deduction
5. Cap at maxDiscount if specified

## Testing Checklist

- [ ] Add product to cart from store
- [ ] View cart with correct totals
- [ ] Remove product from cart
- [ ] Increase/decrease product quantity
- [ ] Apply valid coupon code
- [ ] Apply invalid coupon code (should show error)
- [ ] Remove applied coupon
- [ ] Proceed to checkout
- [ ] Fill delivery address with validation
- [ ] Select payment method
- [ ] Process payment with Razorpay test card:
  - Card: 4111111111111111
  - Expiry: Any future date
  - CVV: Any 3 digits
- [ ] Verify payment success
- [ ] Check order success page
- [ ] Verify cart clears after successful payment

## Error Handling

### Cart Errors
- Empty cart handling
- Invalid product ID handling
- Quantity validation (minimum 1)

### Coupon Errors
- Invalid coupon code
- Expired coupon
- Minimum amount not met
- Coupon already applied

### Payment Errors
- Payment gateway unavailable
- Payment verification failed
- Invalid signature
- Network errors

## Security Considerations

1. **Payment Verification**: Signature validation on server-side
2. **HTTPS Only**: Payment methods disabled for non-HTTPS in production
3. **Sensitive Data**: Never log or expose payment details
4. **Environment Variables**: Keep API keys secure
5. **CORS**: Configure appropriately for payment gateway

## Performance Optimizations

1. **LocalStorage Persistence**: Cart and coupon saved to localStorage
2. **Lazy Loading**: Cart components loaded on demand
3. **Memoization**: useCart hook cached with useMemo
4. **Optimistic Updates**: Cart updates immediately

## Future Enhancements

1. **Order History**: User dashboard with past orders
2. **Saved Addresses**: Multiple delivery addresses
3. **Wallet Integration**: In-app wallet for payments
4. **Subscription Discounts**: Recurring purchase coupons
5. **Gift Cards**: Digital gift card support
6. **Returns**: Refund processing
7. **Order Tracking**: Real-time delivery tracking
8. **Reviews**: Post-purchase product reviews

## Support

For issues or feature requests, contact the development team or create an issue in the repository.
