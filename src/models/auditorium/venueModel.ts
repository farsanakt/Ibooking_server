import mongoose, { Schema, type Document } from "mongoose"

/* =======================
   LOCATION
======================= */
export interface ILocation {
  name: string
  lat: number
  lon: number
  district: string
}

/* =======================
   TIME SLOT
======================= */
export interface ITimeSlot {
  id: string
  label: string
  startTime: string
  endTime: string
  status: string
}

/* =======================
   TARIFF
======================= */
export interface ITariff {
  wedding: string
  reception: string
}

/* =======================
   VENUE
======================= */
export interface IVenue extends Document {
  name: string
  address: string
  audiUserId: string
  phone: string
  altPhone?: string
  email: string
  pincode: string
  district?: string

  locations: ILocation[]   // ✅ FIXED

  events: string[]
  acType: "AC" | "Non-AC" | "Both"
  seatingCapacity: string
  diningCapacity: string
  parkingSlots: string
  changingRooms: string
  amenities: string[]
  termsAndConditions: string[]
  foodPolicy: string
  decorPolicy: string
  tariff: ITariff
  cancellationPolicy: string
  stageSize: string
  acAdvanceAmount?: string
  acCompleteAmount?: string
  nonAcAdvanceAmount?: string
  nonAcCompleteAmount?: string
  images: string[]
  timeSlots: ITimeSlot[]
  auditoriumId?: mongoose.Types.ObjectId
  isVerified: boolean
  guestroom: string
  youtubeLink?: string
}

/* =======================
   LOCATION SCHEMA
======================= */
const locationSchema = new Schema<ILocation>(
  {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
)

/* =======================
   TIME SLOT SCHEMA
======================= */
const timeSlotSchema = new Schema<ITimeSlot>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "booked", "unavailable"],
      default: "pending",
    },
  },
  { _id: false }
)

/* =======================
   VENUE SCHEMA
======================= */
const venueSchema: Schema<IVenue> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    audiUserId: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    district: { type: String },

    // ✅ FIXED LOCATIONS
    locations: { type: [locationSchema], required: true },

    events: { type: [String], required: true },
    acType: { type: String, enum: ["AC", "Non-AC", "Both"], required: true },
    seatingCapacity: { type: String, required: true },
    guestroom: { type: String, required: true },
    diningCapacity: { type: String, required: true },
    parkingSlots: { type: String, required: true },
    changingRooms: { type: String, required: true },
    amenities: { type: [String], default: [] },
    termsAndConditions: { type: [String], default: [] },
    foodPolicy: { type: String, required: true },
    decorPolicy: { type: String, required: true },
    youtubeLink: { type: String },

    isVerified: {
      type: Boolean,
      default: false,
    },

    tariff: {
      wedding: { type: String, required: true },
      reception: { type: String, required: true },
    },

    cancellationPolicy: { type: String, required: true },
    stageSize: { type: String, required: true },

    acAdvanceAmount: { type: String },
    acCompleteAmount: { type: String },
    nonAcAdvanceAmount: { type: String },
    nonAcCompleteAmount: { type: String },

    images: { type: [String], default: [] },

    timeSlots: { type: [timeSlotSchema], required: true },

    auditoriumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuditoriumUser",
    },
  },
  { timestamps: true }
)

export default mongoose.model<IVenue>("Venue", venueSchema)
