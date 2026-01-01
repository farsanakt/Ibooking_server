export const classicEmailTemplate = ({
  title,
  message,
  footerNote,
}: {
  title: string
  message: string
  footerNote?: string
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:30px 15px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px; font-family:Georgia, serif; color:#333;">
              
              <tr>
                <td style="text-align:center;">
                  <h2 style="margin-bottom:20px; color:#6b4f3f;">${title}</h2>
                </td>
              </tr>

              <tr>
                <td style="font-size:15px; line-height:1.6;">
                  ${message}
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px; font-size:14px;">
                  Regards,<br/>
                  <strong>iBookingVenue Team</strong>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-top:30px;">
                  <img src="cid:companylogo" alt="iBookingVenue Logo" width="120" />
                </td>
              </tr>

              ${
                footerNote
                  ? `
              <tr>
                <td style="padding-top:20px; font-size:12px; color:#999; text-align:center;">
                  ${footerNote}
                </td>
              </tr>`
                  : ""
              }

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}
