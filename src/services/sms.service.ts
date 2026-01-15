import axios from "axios";

export const sendOtpSms = async (phone: string, otp: string) => {
  try {
    const url =
      `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API_KEY}` +
      `/SMS/${phone}/${otp}/IBOOKING_OTP`;

    const response = await axios.get(url);
    console.log("2Factor SMS Response:", response.data);
    return true;
  } catch (error: any) {
    console.error("2Factor SMS Error:", error.response?.data || error);
    return false;
  }
};
