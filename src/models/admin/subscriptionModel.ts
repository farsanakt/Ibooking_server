import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  planName: string;
  price: number;
  duration: number;
  durationUnits: "days" | "months" | "years";
  description: string;
  features: string[];
  userType: "vendorside" | "userside" | "both";
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    planName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    durationUnits: { 
      type: String, 
      enum: ["days", "months", "years"], 
      required: true 
    },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    userType: { 
      type: String, 
      enum: ["vendorside", "auditoriumside", "both"], 
      required: true 
    },
  },
  { timestamps: true }
);

const SubscriptionModel = mongoose.model<ISubscription>("Subscription", subscriptionSchema);

export default SubscriptionModel;
