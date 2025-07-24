import mongoose, { Document, Schema } from "mongoose";

export interface IAuditoriumUser extends Document {
 
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

export default mongoose.model<IAuditoriumUser>('AuditoriumUser', userSchema);
