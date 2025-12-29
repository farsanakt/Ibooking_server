import userSubscriptionRepository from "../../repositories/implemention/userSubscriptionRespository"

class UserSubscriptionService {
  async createUserSubscription(payload: any) {
   
    const existingSubscription =
      await userSubscriptionRepository.findActiveSubscriptionByUser(
        payload.user.id
      )

    if (existingSubscription) {
      throw new Error("User already has an active subscription")
    }

    
    const subscription =
      await userSubscriptionRepository.createSubscription(payload)

    return subscription
  }

    async getAllUserSubscriptions() {
    const subscriptions =
      await userSubscriptionRepository.getAllSubscriptions()

    return subscriptions
  }
}

export default new UserSubscriptionService()
