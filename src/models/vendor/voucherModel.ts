import { Schema, Document, model } from "mongoose";

export interface IVoucher extends Document {
  voucherCode: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  limit: number;
  validFrom: Date;
  validTo: Date;
  audiName: string;
  auditoriumId: string;
  isActive: boolean;
  userId: string;
  termsAndConditions?: string[]; 
}

const VoucherSchema = new Schema<IVoucher>(
  {
    voucherCode: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["flat", "percentage"], required: true },
    discountValue: { type: Number, required: true },
    limit: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    audiName: { type: String, required: true },
    auditoriumId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    userId: { type: String, required: true },
    termsAndConditions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const VoucherModel = model<IVoucher>("Voucher", VoucherSchema);