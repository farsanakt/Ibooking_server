import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  phone: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
  },
});

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;
