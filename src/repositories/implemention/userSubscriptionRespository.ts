import { IUserSubscription } from "../../models/user/userSubscriptionModel"
import UserSubscriptionModel from "../../models/user/userSubscriptionModel"

class UserSubscriptionRepository {
  async createSubscription(data: Partial<IUserSubscription>) {
    return await UserSubscriptionModel.create(data)
  }

  async findActiveSubscriptionByUser(userId: string) {
    return await UserSubscriptionModel.findOne({
      "user.id": userId,
      status: "active",
    })
  }

  async expireSubscription(subscriptionId: string) {
    return await UserSubscriptionModel.findByIdAndUpdate(
      subscriptionId,
      { status: "expired" },
      { new: true }
    )
  }

    async getAllSubscriptions() {
    return await UserSubscriptionModel.find()
      .sort({ createdAt: -1 }) // latest first
  }
}

export default new UserSubscriptionRepository()
