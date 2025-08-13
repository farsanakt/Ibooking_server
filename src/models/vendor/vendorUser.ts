import mongoose, { Document, Schema } from "mongoose";

export interface IVendorUser extends Document {
 
  email: string;
  password: string;
  role: 'user' | 'auditorium' | 'admin';
  isVerified: boolean;
  isBlocked: boolean;
  name?: string;
  vendortype?: string;
  
  phone?: string;
}

const vendorSchema: Schema = new Schema({
 
  role: {
    type: String,
    enum: ['user', 'auditorium', 'admin','vendor'],
    default: 'user',
    required: true
  },

  // Common
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

  // Auditorium-specific
  name: {
    type: String
  },

  vendortype: {
    type: String
  },



  phone: {
    type: String
  }

}, {
  timestamps: true
});

export default mongoose.model<IVendorUser>('vendorUser', vendorSchema);
