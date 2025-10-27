import { Schema, Document, model, models } from "mongoose";

export interface IPurchaseRequest extends Document {
    userId: string;
    userName: string;
    merchantId: string;
    merchantSlug: string;
    purchaseAmount: number;
    finalAmount: number;
    discountApplied: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const PurchaseRequestSchema = new Schema<IPurchaseRequest>(
    {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        merchantId: { type: String, required: true },
        merchantSlug: { type: String, required: true },
        purchaseAmount: { type: Number, required: true },
        finalAmount: { type: Number, required: true },
        discountApplied: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: "purchase-requests",
    }
);

export default models.PurchaseRequest ||
    model<IPurchaseRequest>("PurchaseRequest", PurchaseRequestSchema);
