import { Schema, model, Document } from "mongoose";

export interface IAdminItem extends Document {
  events: string[];
  locations: string[];
  amenities: string[];
  vendorTypes:string[]
}

const adminItemSchema = new Schema<IAdminItem>({
  events: { type: [String], default: [] },
  locations: { type: [String], default: [] },
  amenities: { type: [String], default: [] },
  vendorTypes: { type: [String], default: [] },
});

export const AdminItem = model<IAdminItem>("AdminItem", adminItemSchema);
