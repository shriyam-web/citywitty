import mongoose, { Schema, Document, Model } from "mongoose";

interface IAdmin extends Document {
  uniqueId: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: string;
  lastLogin?: Date;
  isSuperAdmin?: boolean;   // 🆕 Added field
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    uniqueId: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    role: { type: String, default: "admin" },
    lastLogin: { type: Date, default: Date.now },

    // 🆕 New field added
    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false }
);

// Cast mongoose.models.Admin to match the type
const Admin =
  (mongoose.models.Admin as Model<IAdmin>) ||
  mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
