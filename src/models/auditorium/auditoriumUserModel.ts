import mongoose, { Document, Schema } from "mongoose";

export interface IAuditoriumUser extends Document {
  email: string;
  password: string;
  role: 'user' | 'auditorium' | 'admin';
  isVerified: boolean;
  isBlocked: boolean;
  auditoriumName?: string;
  ownerName?: string;
  address: string;
  district: string;
  panchayat: string;
  corporation: string;
  municipality: string;
  phone?: string;
  events?: string[];
  locations?: string[];
}

const userSchema: Schema = new Schema(
  {
    role: {
      type: String,
      enum: ['user', 'auditorium', 'admin'],
      default: 'user',
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    auditoriumName: String,
    ownerName: String,
    address: String,
    district: String,
    panchayat: String,
    corporation: String,
    municipality: String,
    phone: String,

    // 👇 Add these new array fields
    events: {
      type: [String],
      default: []
    },
    locations: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model<IAuditoriumUser>('AuditoriumUser', userSchema);
