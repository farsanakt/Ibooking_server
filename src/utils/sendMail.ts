import nodemailer from "nodemailer"
import path from "path"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export const sendMail = async (
  to: string,
  subject: string,
  htmlContent: string
) => {
  await transporter.sendMail({
    from: `"iBookingVenue" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/images/logo.png"),
        cid: "companylogo",
      },
    ],
  })
}
