import cron from "node-cron"
import Booking from "../models/auditorium/bookingModel"
import { sendMail } from "../utils/sendMail"


cron.schedule("0 9 * * *", async () => {
  try {
    console.log("🔔 Booking reminder job started")

    const bookings = await Booking.find({
      status: { $in: ["pending", "confirmed"] },
    })

    let reminderCount = 0

    for (const booking of bookings) {
      const bookingDate = new Date(booking.bookeddate)
      const today = new Date()

      bookingDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      const diffInMs = bookingDate.getTime() - today.getTime()
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

      if (diffInDays === 1) {
        await sendMail(
          booking.userEmail,
          "📅 Booking Reminder – Tomorrow",
          `
Hello,

This is a reminder for your upcoming event.

📍 Venue: ${booking.venueName}
🎉 Event: ${booking.eventType}
📅 Date: ${booking.bookeddate}
📌 Address: ${booking.address}

Please make sure all preparations are completed.

Thank you,
iBookingVenue Team
          `
        )

        reminderCount++
      }
    }

    console.log(`✅ ${reminderCount} booking reminder emails sent`)
  } catch (error) {
    console.error("❌ Error in booking reminder job:", error)
  }
})
