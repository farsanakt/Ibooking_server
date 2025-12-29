import mongoose, { Schema, Document } from "mongoose"

export interface IUserSubscription extends Document {
  user: {
    id: mongoose.Types.ObjectId
    email: string
  }
  subscription: {
    planId: mongoose.Types.ObjectId
    planName: string
    price: number
    duration: number
    durationUnits: string
    features: string[]
    userType: string
  }
  payment: {
    method: string
    status: string
  }
  subscriptionDates: {
    startDate: Date
    endDate: Date
  }
  status: string
  createdAt: Date
}

const UserSubscriptionSchema = new Schema<IUserSubscription>(
  {
    user: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      email: {
        type: String,
        required: true,
      },
    },

    subscription: {
      planId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AdminSubscription",
      },
      planName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      durationUnits: {
        type: String,
        required: true,
      },
      features: {
        type: [String],
        default: [],
      },
      userType: {
        type: String,
        required: true,
      },
    },

    payment: {
      method: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },

    subscriptionDates: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IUserSubscription>(
  "UserSubscription",
  UserSubscriptionSchema
)
