import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userEmail: string;
  venueId: string;
  auditoriumId:string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: string;
  venueName: string;
  bookeddate: string;
  timeSlot: string;
  paidAmount: string;
  balanceAmount: string;
  address:string;
  eventType:string
}

const BookingSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  venueId: { type: String, required: true },
  auditoriumId:{type:String,required:true},
  totalAmount: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentStatus: { type: String, required: true },
  venueName: { type: String, required: true },
  bookeddate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  paidAmount: { type: String, required: true },
  balanceAmount: { type: String, required: true },
  address:{type:String,required:true},
  eventType:{type:String,required:true}
});
export default mongoose.model<IBooking>('Booking',BookingSchema)