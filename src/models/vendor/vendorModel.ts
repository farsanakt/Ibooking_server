import mongoose, { Schema, Document } from 'mongoose';


export interface ITimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  status:string
}


export interface IVendor extends Document {
  name: string;
  address: string;
  vendorUserId:string;
  phone: string;
  altPhone?: string;
  email: string;
  pincode: string;
  cities: string[];
  cancellationPolicy: string;
  startingPrice:string;
  advAmnt:string;
  images: string[];
  timeSlots: ITimeSlot[];
  vendorType:string
  
}


const timeSlotSchema: Schema = new Schema<ITimeSlot>(
  {
    id: { type: String, required: true },
    label: { type: String},
    startTime: { type: String },
    endTime: { type: String },
    status: { 
      type: String, 
      required: true, 
      enum: ['pending', 'booked', 'unavailable'], 
      default: 'pending' 
    }
  },
  { _id: false }
);


const vendorSchema: Schema<IVendor> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    vendorUserId:{type:String,required:true},
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    cities: { type: [String], required: true },
    cancellationPolicy: { type: String},
    startingPrice:{type:String,required:true},
    advAmnt:{type:String,required:true},
    images: { type: [String], default: [] },
    timeSlots: { type: [timeSlotSchema]},
    // auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditoriumUser' }
    vendorType:{type:String,required:true}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IVendor>('Vendor', vendorSchema);
