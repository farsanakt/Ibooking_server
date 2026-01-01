import cron from "node-cron"
import Subscription from "../models/user/userSubscriptionModel"
import { sendMail } from "../utils/sendMail"
import { classicEmailTemplate } from "../utils/emailTemplates"


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
          classicEmailTemplate({
            title: "Subscription Expiry Reminder",
            message: `
              <p>We would like to remind you that your subscription plan 
              <strong>${sub.subscription.planName}</strong> is nearing its expiry.</p>

              <p><strong>Expiry Date:</strong> ${endDate.toDateString()}</p>

              <p>Please renew your subscription to avoid any interruption in services.</p>
            `,
            footerNote: "This is an automated reminder. Please do not reply to this email.",
          })
        )

        reminderCount++
      }
    }

    console.log(`✅ ${reminderCount} subscription reminder emails sent`)
  } catch (error) {
    console.error("❌ Error in subscription reminder job:", error)
  }
})
