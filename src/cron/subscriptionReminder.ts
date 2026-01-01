import cron from "node-cron"
import Subscription from "../models/user/userSubscriptionModel"
import { sendMail } from "../utils/sendMail"


cron.schedule("0 9 * * *", async () => {
  try {
    console.log("🔔 Subscription reminder job started")

    const subscriptions = await Subscription.find({
      status: "active",
    })

    let reminderCount = 0

    for (const sub of subscriptions) {
      const endDate = new Date(sub.subscriptionDates.endDate)
      const now = new Date()

      const diffInMs = endDate.getTime() - now.getTime()
      const diffInDays = Math.ceil(
        diffInMs / (1000 * 60 * 60 * 24)
      )

      if (diffInDays === 1 || diffInDays === 2) {
        await sendMail(
          sub.user.email,
          "⏰ Subscription Expiry Reminder",
          `
Hello,

Your subscription plan "${sub.subscription.planName}" will expire on 
${endDate.toDateString()}.

Please renew your plan to avoid service interruption.

Thank you,
iBookingVenue Team
          `
        )

        reminderCount++
      }
    }

    console.log(`✅ ${reminderCount} reminder emails sent`)
  } catch (error) {
    console.error("❌ Error in subscription reminder job:", error)
  }
})
