// // import mongoose, { Schema, models, model } from "mongoose";

// // const UserSchema = new Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: false }, // 🔹 ab optional
// //   role: { type: String, default: "user" },
// //   provider: { type: String, enum: ["credentials", "google"], default: "credentials" }, // 🔹 add provider field
// // }, { timestamps: true });

// // const User = models.User || model("User", UserSchema);
// // export default User;

// import mongoose, { Schema, models, model } from "mongoose";

// // 🔹 Renewal History
// const RenewalSchema = new Schema({
//   renewedOn: { type: Date, required: true },
//   validUpto: { type: Date, required: true },
// });

// // 🔹 Order Items inside an order
// const OrderItemSchema = new Schema({
//   productName: { type: String, required: true },
//   productId: { type: String }, // optional if mapped with DB
//   quantity: { type: Number, default: 1 },
//   price: { type: Number, required: true },
//   discount: { type: Number, default: 0 },
//   finalPrice: { type: Number, required: true },
// });

// // 🔹 Reviews on an order
// const ReviewSchema = new Schema({
//   rating: { type: Number, min: 1, max: 5 },
//   comment: { type: String },
//   merchantReply: { type: String },
//   reviewedOn: { type: Date, default: Date.now },
// });

// // 🔹 Orders
// const OrderSchema = new Schema({
//   orderId: { type: String, required: true },
//   merchant: { type: String, required: true },
//   amount: { type: Number, required: true }, // total amount before discount
//   discountApplied: { type: Number, default: 0 },
//   savings: { type: Number, default: 0 }, // how much user saved
//   finalAmount: { type: Number }, // amount after discount
//   items: [OrderItemSchema], // purchased products
//   review: ReviewSchema, // user’s review on order
//   date: { type: Date, default: Date.now },
//   status: { type: String, enum: ["completed", "pending", "cancelled"], default: "completed" },
// });

// // 🔹 Support Tickets
// const SupportTicketSchema = new Schema({
//   ticketId: { type: String, required: true },
//   subject: { type: String, required: true },
//   message: { type: String, required: true },
//   status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
//   createdAt: { type: Date, default: Date.now },
//   resolvedAt: { type: Date },
//   replies: [
//     {
//       sender: { type: String, enum: ["user", "support", "merchant"], required: true },
//       message: { type: String, required: true },
//       sentAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// // 🔹 User Schema
// const UserSchema = new Schema(
//   {
//     // Basic Auth
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: false }, // optional if Google login
//     role: { type: String, default: "user" },
//     provider: { type: String, enum: ["credentials", "google"], default: "credentials" },

//     // Card Information
//     isCardExist: { type: Boolean, default: false },
//     cardVariantName: { type: String }, // e.g., "Gold", "Platinum"
//     cardNumber: { type: String, unique: true, sparse: true },
//     purchasedOn: { type: Date },
//     validUpto: { type: Date },
//     renewed: [RenewalSchema],
//     cardStatus: { type: String, enum: ["active", "expired", "blocked", "pending"], default: "active" },
//     statusReason: { type: String }, // why blocked/pending

//     // Contact & Location
//     mobileNumber: { type: String },
//     whatsappNumber: { type: String },
//     address: { type: String },
//     city: { type: String },
//     pincode: { type: String },
//     state: { type: String },
//     country: { type: String },

//     // Profile & Preferences
//     profilePicture: { type: String }, // URL of image
//     dateOfBirth: { type: Date },
//     lastLogin: { type: Date },
//     preferences: {
//       notifications: { type: Boolean, default: true },
//       language: { type: String, default: "en" },
//     },
//     referralCode: { type: String, unique: true, sparse: true },

//     // Wallet & Savings
//     walletBalance: { type: Number, default: 0 },
//     totalPurchases: { type: Number, default: 0 },
//     totalSavings: { type: Number, default: 0 },

//     // Orders & History
//     orderHistory: [OrderSchema],

//     // Support
//     supportTickets: [SupportTicketSchema],
//   },
//   { timestamps: true }
// );

// const User = models.User || model("User", UserSchema);
// export default User;

import mongoose, { Schema, models, model } from "mongoose";

// 🔹 Renewal History
const RenewalSchema = new Schema({
  renewedOn: { type: Date, default: null },
  validUpto: { type: Date, default: null },
});

// 🔹 Order Items inside an order
const OrderItemSchema = new Schema({
  productName: { type: String, default: "" },
  productId: { type: String, default: "" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, default: 0 },
});

// 🔹 Reviews on an order
const ReviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, default: 0 },
  comment: { type: String, default: "" },
  merchantReply: { type: String, default: "" },
  reviewedOn: { type: Date, default: null },
});

// 🔹 Orders
const OrderSchema = new Schema({
  orderId: { type: String, default: "" },
  merchant: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  discountApplied: { type: Number, default: 0 },
  savings: { type: Number, default: 0 },
  finalAmount: { type: Number, default: 0 },
  items: { type: [OrderItemSchema], default: [] },
  review: { type: ReviewSchema, default: {} },
  date: { type: Date, default: null },
  status: {
    type: String,
    enum: ["completed", "pending", "cancelled"],
    default: "pending",
  },
});

// 🔹 Support Tickets
const SupportTicketSchema = new Schema({
  ticketId: { type: String, default: "" },
  subject: { type: String, default: "" },
  message: { type: String, default: "" },
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved", "closed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null },
  replies: {
    type: [
      {
        sender: {
          type: String,
          enum: ["user", "support", "merchant"],
          default: "user",
        },
        message: { type: String, default: "" },
        sentAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

// 🔹 User Schema
const UserSchema = new Schema(
  {
    // Basic Auth
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" }, // optional if Google login
    role: { type: String, default: "user" },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    // Card Information
    isCardExist: { type: Boolean, default: false },
    cardVariantName: { type: String, default: "" },
    // cardNumber: { type: String, unique: true, sparse: true, default: null },
    cardNumber: { type: String, unique: true, sparse: true},
    
    purchasedOn: { type: Date, default: null },
    validUpto: { type: Date, default: null },
    renewed: { type: [RenewalSchema], default: [] },
    cardStatus: {
      type: String,
      enum: ["active", "expired", "blocked", "pending"],
      default: "active",
    },
    statusReason: { type: String, default: "" },

    // Contact & Location
    mobileNumber: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },

    // Profile & Preferences
    profilePicture: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
    lastLogin: { type: Date, default: null },
    preferences: {
      notifications: { type: Boolean, default: true },
      language: { type: String, default: "en" },
    },
    // referralCode: { type: String, unique: true, sparse: true, default: null }, 
referralCode: { type: String, unique: true, sparse: true},
    // Wallet & Savings
    walletBalance: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 },
    totalSavings: { type: Number, default: 0 },

    // Orders & History
    orderHistory: { type: [OrderSchema], default: [] },

    // Support
    supportTickets: { type: [SupportTicketSchema], default: [] },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
