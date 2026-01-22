import AuditoriumUser from "../models/auditorium/auditoriumUserModel";
import Booking from "../models/auditorium/bookingModel";
import Vendor from "../models/vendor/vendorUser";

export type UploadType =
  | "AUDITORIUM_USER"
  | "AUDITORIUM_BOOKING"
  | "VENDOR";

export const BULK_UPLOAD_MAP = {
  AUDITORIUM_USER: {
    model: AuditoriumUser,
    uniqueField: "email",
    requiredFields: [
      "email",
      "password",
      "phone",
      "auditoriumName",
      "ownerName",
      "address",
      "district",
    ],
  },

  AUDITORIUM_BOOKING: {
    model: Booking,
    uniqueField: "userEmail",
    requiredFields: [
      "userEmail",
      "venueId",
      "auditoriumId",
      "venueName",
      "bookeddate",
      "timeSlot",
      "totalAmount",
      "paidAmount",
      "balanceAmount",
      "paymentStatus",
      "address",
    ],
  },

  VENDOR: {
    model: Vendor,
    uniqueField: "email",
    requiredFields: [
      "name",
      "vendorUserId",
      "email",
      "phone",
      "pincode",
      "cities",
      "vendorType",
      "startingPrice",
      "advAmnt",
    ],
  },
};
