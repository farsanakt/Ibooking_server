import { Schema, model, Document } from "mongoose";

export interface IAdminStaff extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const adminStaffSchema = new Schema<IAdminStaff>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "staff", "superadmin"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AdminStaffModel = model<IAdminStaff>("AdminStaff", adminStaffSchema);
