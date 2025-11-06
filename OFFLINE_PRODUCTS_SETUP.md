# Offline Products - Separate Collection Setup

## Overview
Offline products are now stored in a **separate MongoDB collection** called `offlineproducts`, independent from the Partner (merchant) collection.

## Database Schema

### OfflineProduct Model
Collection: `offlineproducts`

```javascript
{
  offlineProductId: String (unique),     // e.g., "OFF-1761913370454-3IS4"
  merchantId: String (indexed),          // Links to Partner.merchantId
  productName: String,                   // Product name
  category: String,                      // Product category
  description: String,                   // Product description
  price: Number,                         // Regular price
  offerPrice: Number,                    // Discounted price (optional)
  availableStock: Number,                // Stock quantity
  unit: String,                          // Unit (e.g., "per unit")
  brand: String,                         // Brand name
  tags: [String],                        // Product tags
  imageUrls: [String],                   // Product images
  status: String,                        // "active" | "inactive" | "out_of_stock"
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Fetch Offline Products for a Merchant
```
GET /api/merchants/[merchantSlug]/offline-products
```

**Response:**
```json
{
  "success": true,
  "products": [...],
  "count": 1
}
```

## How It Works

1. **Merchant Page Load**: 
   - First fetches merchant data from `/api/merchants/[merchantSlug]`
   - Then fetches offline products from `/api/merchants/[merchantSlug]/offline-products`

2. **Product Display**:
   - Products are displayed in the "Available In-Store" section
   - Shows product images, name, brand, description, pricing
   - Displays stock status and discount information

3. **Field Mapping**:
   ```
   Separate Collection     →    Display
   -------------------------------------------
   imageUrls              →    Product images
   price                  →    Original price
   offerPrice             →    Discounted price
   availableStock         →    Stock quantity
   description            →    Product description
   ```

## Adding Products to Database

Your product document should follow this structure:

```javascript
{
  "offlineProductId": "OFF-XXXXXXXXXXXXX-XXXX",
  "merchantId": "6901a50940ab36fff5c64615",
  "productName": "Product Name",
  "category": "Category Name",
  "description": "Product description",
  "price": 100,
  "offerPrice": 80,
  "availableStock": 50,
  "unit": "per unit",
  "brand": "Brand Name",
  "tags": ["tag1", "tag2"],
  "imageUrls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "status": "active"
}
```

## Important Notes

1. **merchantId** must match the `merchantId` field in the Partner collection
2. Products with `status: "active"` and `availableStock > 0` will be displayed
3. Images in `imageUrls` array will be displayed in the product card
4. If `offerPrice` is set and less than `price`, discount pricing is shown
5. The collection is indexed on `merchantId` and `status` for efficient queries

## Files Modified

- ✅ `models/OfflineProduct.ts` - New model for offline products
- ✅ `app/api/merchants/[merchantSlug]/offline-products/route.ts` - API to fetch products
- ✅ `app/merchants/[merchantSlug]/page.tsx` - Updated to fetch and display products separately

## Testing

1. Add a product to the `offlineproducts` collection with your merchant's `merchantId`
2. Visit the merchant page: `http://localhost:3000/merchants/[merchantSlug]`
3. Products should appear in the "Available In-Store" section
4. Check browser console for: `Fetched offline products: X`