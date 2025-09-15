import mongoose, { Document, Schema } from "mongoose";

export interface IEnquiry extends Document {
  vendorId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  contact: string;
  eventDate: Date;
  eventType: "Wedding" | "Birthday" | "Conference" | "Other";
  message?: string;
  notification: "whatsapp" | "sms" | "email";
  createdAt: Date;
  updatedAt: Date;
  vendorUserId:string;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ["Wedding", "Birthday", "Conference", "Other"],
    },
    message: {
      type: String,
      trim: true,
    },
    notification: {
      type: String,
      enum: ["whatsapp", "sms", "email"],
      default: "email",
    },
    vendorUserId:{

      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model<IEnquiry>("Enquiry", enquirySchema);

export default Enquiry;
