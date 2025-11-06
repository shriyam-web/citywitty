import mongoose, { Schema, Document } from 'mongoose';

export interface IOfflineProduct extends Document {
    offlineProductId: string;
    merchantId: string;
    productName: string;
    category?: string;
    description?: string;
    price: number;
    offerPrice?: number;
    availableStock: number;
    unit?: string;
    brand?: string;
    tags?: string[];
    imageUrls: string[];
    status: 'active' | 'inactive' | 'out_of_stock';
    createdAt: Date;
    updatedAt: Date;
}

const OfflineProductSchema = new Schema<IOfflineProduct>(
    {
        offlineProductId: { type: String, required: true, unique: true },
        merchantId: { type: String, required: true, index: true },
        productName: { type: String, required: true },
        category: { type: String },
        description: { type: String },
        price: { type: Number, required: true },
        offerPrice: { type: Number },
        availableStock: { type: Number, required: true, default: 0 },
        unit: { type: String, default: 'per unit' },
        brand: { type: String },
        tags: [{ type: String }],
        imageUrls: [{ type: String }],
        status: {
            type: String,
            enum: ['active', 'inactive', 'out_of_stock'],
            default: 'active'
        }
    },
    {
        timestamps: true,
        collection: 'offlineproducts' // Explicitly specify collection name
    }
);

// Index for efficient queries
OfflineProductSchema.index({ merchantId: 1, status: 1 });

export default mongoose.models.OfflineProduct ||
    mongoose.model<IOfflineProduct>('OfflineProduct', OfflineProductSchema);