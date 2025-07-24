import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
 
  email: string;
  password: string;
  role: 'user' | 'auditorium' | 'admin';
  isVerified: boolean;
  isBlocked: boolean;
  auditoriumName?: string;
  ownerName?: string;
  
  phone?: string;
}

const userSchema: Schema = new Schema({
 
  role: {
    type: String,
    enum: ['user', 'auditorium', 'admin'],
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
  auditoriumName: {
    type: String
  },

  ownerName: {
    type: String
  },



  phone: {
    type: String
  }

}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);
