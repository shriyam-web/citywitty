import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // 🔹 ab optional
  role: { type: String, default: "user" },
  provider: { type: String, enum: ["credentials", "google"], default: "credentials" }, // 🔹 add provider field
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
