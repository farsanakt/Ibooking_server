
import mongoose, { Schema, Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  email: string;
  role: "Admin" | "Staff";
  password: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const staffSchema: Schema = new Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ["Admin", "Staff"], default: "Staff" },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const StaffModel = mongoose.model<IStaff>("Staff", staffSchema);
