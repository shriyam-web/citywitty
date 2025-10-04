import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  merchantId: string;
  legalName: string;
  displayName: string;
  merchantSlug?: string;
  email: string;
  emailVerified?: boolean;
  phone: string;
  phoneVerified?: boolean;
  password: string;
  category: string;
  city: string;
  streetAddress: string;
  pincode?: string;
  locality?: string;
  state?: string;
  country?: string;
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
  socialLinks?: {
    linkedin?: string;
    x?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
  };
  agreeToTerms: boolean;

  products: any[];
  logo?: string;
  storeImages?: string[];
  customOffer?: string;
  ribbonTag?: string;
  mapLocation?: string;
  visibility: boolean;
  joinedSince: Date;
  citywittyAssured: boolean;
  premiumSeller?: boolean;
  verified?: boolean;
  trust?: boolean;
  ratings?: {
    userId: string;
    user: string;
    rating: number;
    review?: string;
    reply?: string;
    createdAt?: Date;
  }[];
  averageRating?: number;
  tags?: string[];
  status: "pending" | "active" | "suspended" | "inactive";
  suspensionReason?: string;

  purchasedPackage?: {
    variantName: string;
    purchaseDate: Date;
    expiryDate: Date;
    transactionId: string;
  };

  renewal?: {
    isRenewed: boolean;
    renewalDate?: Date;
    renewalExpiry?: Date;
  };

  onboardingAgent?: {
    agentId: string;
    agentName: string;
  };

  otpCode?: string;
  otpExpiry?: Date;

  paymentMethodAccepted?: string[];
  qrcodeLink?: string;
  businessHours?: {
    open?: string;
    close?: string;
    days?: string[];
  };

  bankDetails?: {
    bankName?: string;
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branchName?: string;
    upiId?: string;
  };

  ListingLimit?: number;
  Addedlistings?: number;
  totalGraphics?: number;
  totalReels?: number;
  isWebsite?: boolean;
  totalEarnings?: number;

  ds_graphics?: {
    graphicId: string;
    requestDate: Date;
    completionDate?: Date;
    status: string;
    requestCategory: string;
    content: string;
    subject: string;
    isSchedules?: boolean;
  }[];

  ds_reel?: {
    reelId: string;
    requestDate: Date;
    completionDate?: Date;
    status: string;
    content: string;
    subject: string;
  }[];

  ds_weblog?: {
    weblog_id: string;
    status: string;
    completionDate?: Date;
    description: string;
  }[];

  totalPodcast?: number;
  completedPodcast?: number;
  podcastLog?: {
    title: string;
    status: string;
    scheduleDate: Date;
    completeDate?: Date;
  }[];

  minimumOrderValue?: number;
  offlineDiscount?: {
    category: string;
    offerTitle: string;
    offerDescription: string;
    discountValue: number;
    discountPercent: number;
    status: "Active" | "Inactive";
    validUpto: Date;
  }[];
  branchLocations?: {
    branchName: string;
    city: string;
    streetAddress: string;
    pincode?: string;
    locality?: string;
    state?: string;
    country?: string;
    mapLocation?: string;
    latitude?: number;
    longitude?: number;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

const PartnerSchema: Schema = new Schema({
  merchantId: { type: String, required: true, unique: true },
  legalName: { type: String },
  displayName: { type: String },
  merchantSlug: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  phone: { type: String },
  phoneVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  category: { type: String },
  city: { type: String },
  streetAddress: { type: String },
  pincode: { type: String },
  locality: { type: String },
  state: { type: String },
  country: { type: String, default: "India" },
  whatsapp: { type: String },
  isWhatsappSame: { type: Boolean, default: true },
  gstNumber: { type: String },
  panNumber: { type: String },
  businessType: { type: String },
  yearsInBusiness: { type: String },
  averageMonthlyRevenue: { type: String },
  discountOffered: { type: String },
  description: { type: String },
  website: { type: String },
  socialLinks: {
    linkedin: { type: String },
    x: { type: String },
    youtube: { type: String },
    instagram: { type: String },
    facebook: { type: String },
  },
  agreeToTerms: { type: Boolean },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  logo: { type: String },
  storeImages: [{ type: String }],
  customOffer: { type: String },
  ribbonTag: { type: String },
  mapLocation: { type: String },
  visibility: { type: Boolean, default: true },
  joinedSince: { type: Date, default: Date.now },
  citywittyAssured: { type: Boolean, default: false },
  premiumSeller: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  trust: { type: Boolean, default: false },
  ratings: [{
    userId: { type: String },
    user: { type: String },
    rating: { type: Number },
    review: { type: String },
    reply: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
  averageRating: { type: Number },
  tags: [{ type: String }],
  status: { type: String, enum: ["pending", "active", "suspended", "inactive"], default: "pending" },
  suspensionReason: { type: String },
  purchasedPackage: {
    variantName: { type: String },
    purchaseDate: { type: Date },
    expiryDate: { type: Date },
    transactionId: { type: String },
  },
  renewal: {
    isRenewed: { type: Boolean, default: false },
    renewalDate: { type: Date },
    renewalExpiry: { type: Date },
  },
  onboardingAgent: {
    agentId: { type: String },
    agentName: { type: String },
  },
  otpCode: { type: String },
  otpExpiry: { type: Date },
  paymentMethodAccepted: [{ type: String }],
  qrcodeLink: { type: String },
  businessHours: {
    open: { type: String },
    close: { type: String },
    days: [{ type: String }],
  },
  bankDetails: {
    bankName: { type: String },
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branchName: { type: String },
    upiId: { type: String },
  },
  ListingLimit: { type: Number },
  Addedlistings: { type: Number },
  totalGraphics: { type: Number },
  totalReels: { type: Number },
  isWebsite: { type: Boolean },
  totalEarnings: { type: Number },
  ds_graphics: [{
    graphicId: { type: String },
    requestDate: { type: Date },
    completionDate: { type: Date },
    status: { type: String },
    requestCategory: { type: String },
    content: { type: String },
    subject: { type: String },
    isSchedules: { type: Boolean },
  }],
  ds_reel: [{
    reelId: { type: String },
    requestDate: { type: Date },
    completionDate: { type: Date },
    status: { type: String },
    content: { type: String },
    subject: { type: String },
  }],
  ds_weblog: [{
    weblog_id: { type: String },
    status: { type: String },
    completionDate: { type: Date },
    description: { type: String },
  }],
  totalPodcast: { type: Number },
  completedPodcast: { type: Number },
  podcastLog: [{
    title: { type: String },
    status: { type: String },
    scheduleDate: { type: Date },
    completeDate: { type: Date },
  }],
  minimumOrderValue: { type: Number },
  offlineDiscount: [{
    category: { type: String, required: true },
    offerTitle: { type: String, required: true },
    offerDescription: { type: String, required: true },
    discountValue: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    validUpto: { type: Date, required: true },
  }],
  branchLocations: [{
    branchName: { type: String, required: true },
    city: { type: String, required: true },
    streetAddress: { type: String, required: true },
    pincode: { type: String },
    locality: { type: String },
    state: { type: String },
    country: { type: String, default: "India" },
    mapLocation: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  }],
});

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);
