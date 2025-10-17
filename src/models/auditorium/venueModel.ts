import mongoose, { Schema, Document } from 'mongoose';

// TimeSlot Interface
export interface ITimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  status:string
}

// Tariff Interface
export interface ITariff {
  wedding: string;
  reception: string;
}

// Venue Interface
export interface IVenue extends Document {
  name: string;
  address: string;
  audiUserId:string;
  phone: string;
  altPhone?: string;
  email: string;
  pincode: string;
  cities: string[];
  acType: 'AC' | 'Non-AC' | 'Both';
  seatingCapacity: string;
  diningCapacity: string;
  parkingSlots: string;
  changingRooms: string;
  amenities: string[];
  foodPolicy: string;
  decorPolicy: string;
  tariff: ITariff;
  cancellationPolicy: string;
  stageSize: string;
  totalamount:string;
  advAmnt:string;
  images: string[];
  timeSlots: ITimeSlot[];
  auditoriumId?: mongoose.Types.ObjectId
  isVerified: boolean;
  guestroom:string
  youtubeLink?: string; 
  
}


const timeSlotSchema: Schema = new Schema<ITimeSlot>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { 
      type: String, 
      required: true, 
      enum: ['pending', 'booked', 'unavailable'], // Optional: restrict to specific values
      default: 'pending' 
    }
  },
  { _id: false }
);


const venueSchema: Schema<IVenue> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    audiUserId:{type:String,required:true},
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    cities: { type: [String], required: true },
    acType: { type: String, enum: ['AC', 'Non-AC', 'Both'], required: true },
    seatingCapacity: { type: String, required: true },
    guestroom:{ type: String, required: true },
    diningCapacity: { type: String, required: true },
    parkingSlots: { type: String, required: true },
    changingRooms: { type: String, required: true },
    amenities: { type: [String], default: [] },
    foodPolicy: { type: String, required: true },
    decorPolicy: { type: String, required: true },
     youtubeLink: { type: String },
    isVerified: {
    type: Boolean,
    default: false
  },
    tariff: {
      wedding: { type: String, required: true },
      reception: { type: String, required: true }
    },
    cancellationPolicy: { type: String, required: true },
    stageSize: { type: String, required: true },
    totalamount:{type:String,required:true},
    advAmnt:{type:String,required:true},
    images: { type: [String], default: [] },
    timeSlots: { type: [timeSlotSchema], required: true },
    auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditoriumUser' }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IVenue>('Venue', venueSchema);
