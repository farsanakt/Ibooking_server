import { Schema, model, Document } from "mongoose";

export interface IAdminStaff extends Document {
  staffid: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isLogged: boolean;
  lastLogin: Date;
  lastLogout:Date;
}

const adminStaffSchema = new Schema<IAdminStaff>(
  {
    staffid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "staff", "superadmin", "vendormanager", "venuemanager"],
    },
    isActive: { type: Boolean, default: false },
    isLogged: { type: Boolean, default: false },
    lastLogin: { type: Date },
    lastLogout:{type:Date},
  },
  { timestamps: true }
);

export const AdminStaffModel = model<IAdminStaff>("AdminStaff", adminStaffSchema);
