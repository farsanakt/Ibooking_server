import { Schema, Document, model } from "mongoose";

export interface IOffer extends Document {
  offerCode: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  userId: string; 
}

const OfferSchema = new Schema<IOffer>(
  {
    offerCode: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["flat", "percentage"], required: true },
    discountValue: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const OfferModel = model<IOffer>("Offer", OfferSchema);
