import mongoose, { Schema, Document } from "mongoose";

export interface IVendorBooking extends Document {
  userEmail: string;
  vendorId: string;
  vendorName: string;
  totalAmount: number;
  advanceAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: string;
  paymentMethod: string;
  paymentType: 'full' | 'advance';
  bookeddate: string;
  timeSlot: string;
  address: string;
}

const BookingSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  vendorId: { type: String, required: true },
  vendorName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  advanceAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  balanceAmount: { 
    type: Number, 
    required: true, 
    default: 0, 
    min: 0 // Allow 0 for full payment
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    required: true, 
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['credit', 'debit', 'upi', 'netbanking'], 
    default: 'upi' 
  },
  paymentType: { 
    type: String, 
    required: true, 
    enum: ['full', 'advance'], 
    default: 'advance' 
  },
  bookeddate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  address: { type: String, required: true }
});

export default mongoose.model<IVendorBooking>('vendorBooking', BookingSchema);