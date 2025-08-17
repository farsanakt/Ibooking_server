export const bookingConfirmationTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      color: #333333;
      line-height: 1.6;
    }
    .details {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .details p {
      margin: 5px 0;
      font-size: 14px;
    }
    .footer {
      background-color: #f4f4f4;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        margin: 10px;
      }
      .header h1 {
        font-size: 20px;
      }
      .content p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{header}}</h1>
    </div>
    <div class="content">
      <p>Dear {{recipient}},</p>
      <p>{{message}}</p>
      <div class="details">
        <p><strong>Venue:</strong> {{vendorName}}</p>
        <p><strong>Date:</strong> {{bookedDate}}</p>
        <p><strong>Time Slot:</strong> {{timeSlot}}</p>
      </div>
    </div>
    <div class="footer">
      <p>Thank you for using our service!</p>
      <p>&copy; 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;