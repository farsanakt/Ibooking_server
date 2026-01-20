import mongoose, { Document, Schema } from "mongoose";

export interface IAuditoriumUser extends Document {
  role: "user" | "auditorium" | "admin";
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  isOtp: boolean;
  isBlocked: boolean;
  acceptedBy: string;

  auditoriumName: string;
  ownerName: string;
  address: string;
  district: string;
  events:string[]

  locations: {
    name: string;
    lat: number;
    lon: number;
    district: string;
  }[];

  logo?: string;
  seal?: string;
}

const userSchema = new Schema<IAuditoriumUser>(
  {
    role: {
      type: String,
      enum: ["user", "auditorium", "admin"],
      default: "auditorium",
      required: true,
    },

    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    events:{type:[String]},

    isVerified: { type: Boolean, default: false },
    isOtp: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    acceptedBy: { type: String, default: "" },

    auditoriumName: { type: String, required: true },
    ownerName: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },

    locations: [
      {
        name: String,
        lat: Number,
        lon: Number,
        district: String,
      },
    ],

    logo: String,
    seal: String,
  },
  { timestamps: true }
);

export default mongoose.model<IAuditoriumUser>(
  "AuditoriumUser",
  userSchema
);
