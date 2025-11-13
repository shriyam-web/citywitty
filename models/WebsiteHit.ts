import mongoose, { Schema, Document, Model } from "mongoose";

interface IWebsiteHit extends Document {
  count: number;
}

const WebsiteHitSchema: Schema<IWebsiteHit> = new Schema(
  {
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const WebsiteHit =
  (mongoose.models.WebsiteHit as Model<IWebsiteHit>) ||
  mongoose.model<IWebsiteHit>("WebsiteHit", WebsiteHitSchema);

export default WebsiteHit;
