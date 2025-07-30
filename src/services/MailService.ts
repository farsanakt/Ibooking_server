
import nodemailer from 'nodemailer';

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS  
      }
    });
  }

  async sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', result.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
