import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPartner extends Document {
  applicationId: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  address: string;
  whatsapp: string;
  isWhatsappSame: boolean;
  gstNumber: string;
  panNumber: string;
  businessType: string;
  yearsInBusiness: string;
  averageMonthlyRevenue: string;
  discountOffered: string;
  description: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  agreeToTerms: boolean;
}

const PartnerSchema = new Schema<IPartner>({
  applicationId: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  whatsapp: { type: String, required: true },
  isWhatsappSame: { type: Boolean, default: false },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  businessType: { type: String, required: true },
  yearsInBusiness: { type: String, required: true },
  averageMonthlyRevenue: { type: String, required: true },
  discountOffered: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  agreeToTerms: { type: Boolean, required: true }
}, { timestamps: true });

export default models.Partner || model<IPartner>("Partner", PartnerSchema);
