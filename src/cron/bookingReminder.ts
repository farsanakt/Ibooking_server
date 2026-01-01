import cron from "node-cron"
import Booking from "../models/auditorium/bookingModel"
import { sendMail } from "../utils/sendMail"
import { classicEmailTemplate } from "../utils/emailTemplates"


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
          classicEmailTemplate({
            title: "Booking Reminder",
            message: `
              <p>This is a gentle reminder about your upcoming event booking.</p>

              <p><strong>Venue:</strong> ${booking.venueName}</p>
              <p><strong>Event Type:</strong> ${booking.eventType}</p>
              <p><strong>Event Date:</strong> ${booking.bookeddate}</p>
              <p><strong>Venue Address:</strong> ${booking.address}</p>

              <p>Please ensure all arrangements are completed before arrival.</p>
            `,
            footerNote: "We look forward to serving you. Have a great event!",
          })
        )

        reminderCount++
      }
    }

    console.log(`✅ ${reminderCount} booking reminder emails sent`)
  } catch (error) {
    console.error("❌ Error in booking reminder job:", error)
  }
})
