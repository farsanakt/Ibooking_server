
import mongoose, { Schema, Document } from "mongoose";

export interface IBrideGroom extends Document {
  email: string;
  bride: {
    name?: string;
    age?: number;
    address?: string;
    photo?: string;     
    idProof?: string;   
  };
  groom: {
    name?: string;
    age?: number;
    address?: string;
    photo?: string;     
    idProof?: string;  
  };
}

const brideGroomSchema = new Schema<IBrideGroom>(
  {
    email: { type: String, required: true },

    bride: {
      name: String,
      age: Number,
      address: String,
      photo: String,
      idProof: String,
    },
    groom: {
      name: String,
      age: Number,
      address: String,
      photo: String,
      idProof: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBrideGroom>("BrideGroom", brideGroomSchema);
