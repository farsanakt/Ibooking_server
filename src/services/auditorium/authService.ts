
import bcrypt from "bcryptjs";
import { IOtp } from "../../models/auditorium/otpModel";
import { StaffModel } from "../../models/auditorium/staffModel";
import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories"
import { OtpRepository } from "../../repositories/implemention/OtpRepositories";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { MailService } from "../MailService";
import { sendOtpSms } from "../sms.service";

const mailService = new MailService();

//  export const generateOtp = (): string => {
//   return Math.floor(10000 + Math.random() * 90000).toString();
// };

export const generateOtp = (): string => {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(6, "0");
};


export class AuthService{

      private auditoriumRepositories: AuditoriumRepositories;

      private otpRepositories: OtpRepository;

  

  constructor() {

    this.auditoriumRepositories = new AuditoriumRepositories();
    this.otpRepositories = new OtpRepository();
    

  }


async signup(data: any, files: any) {

    if (
      !data.email ||
      !data.password ||
      !data.auditoriumName ||
      !data.ownerName
    ) {
      return { success: false, message: "Missing required fields" };
    }

   
    const existingUser = await this.auditoriumRepositories.findByEmail(data.email);
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }
let events=[]
if(data.events){
  events=typeof data.events=='string'?JSON.parse(data.events):data.events
}
    let locations = [];
    if (data.locations) {
      locations =
        typeof data.locations === "string"
          ? JSON.parse(data.locations)
          : data.locations;
    }

    // 🖼️ Get S3 image URLs
    const logo = files?.logo?.[0]?.location || "";
    const seal = files?.seal?.[0]?.location || "";

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 📦 Create user payload
    const userPayload = {
      role: "auditorium",
      auditoriumName: data.auditoriumName,
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      district: data.district,
      address: data.address,
      events,
      locations,
      logo,
      seal,
      isVerified: false,
      isBlocked: false,
    };

    // 💾 Save to DB
    await this.auditoriumRepositories.create(userPayload);

    return {
      success: true,
      message: "Signup successful",
    };
  }



async login(data: any) {
  try {
    const { email, password, loginMode, staffid } = data;

  
    if (loginMode === "staff") {

      
      const staff = await StaffModel.findOne({ 
        email: email, 
        staffId: staffid 
      });

      if (!staff) {
        return { success: false, message: "Staff user not found" };
      }

    
      const isMatch = await bcrypt.compare(password, staff.password);

      if (!isMatch) {
        return { success: false, message: "Incorrect password" };
      }

      
      const payload = {
        id: staff.audiUserId,
        role: staff.role,
        staffId: staff.staffId,
        staffid: staff._id
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      // 4. Return staff login data
      return {
        success: true,
        message: "Staff login successful",
        accessToken,
        refreshToken,
        user: {
           id: staff.audiUserId,
          role: staff.role,
          email: staff.email,
          staffId: staff.staffId,
          staffid: staff._id
        },
      };
    }

    // ======================================================
    //  NORMAL USER LOGIN (AUDITORIUM ADMIN)
    // ======================================================
    const existingUser = await this.auditoriumRepositories.findUserByEmail(email);

    if (!existingUser) {
      return { success: false, message: "User not found" };
    }

   

     const isMatch = await bcrypt.compare(password, existingUser.password);

     if(!isMatch){
 return { success: false, message: "Incorrect password" };
     }

    const payload = {
      id: existingUser._id,
      role: existingUser.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      success: true,
      message: "Logged in successfully!",
      accessToken,
      refreshToken,
      user: {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
      },
    };

  } catch (error) {
    console.log("Error in authService (auditorium side):", error);
    return { success: false, message: "Internal server error" };
  }
}



async forgetPass(forgetPass:{email:string}){

    const email=forgetPass.email

   

    try {

      const existing=await this.auditoriumRepositories.findUserByEmail(email)

      if(!existing){

        return {success:false,message:'Please enter a valid email'}

      }

      const otp=generateOtp()

      await this.otpRepositories.create({email,otp} as IOtp)

      await mailService.sendOtpEmail(email,otp)

      return {success:true,message:'Otp sended to registered mail'}
      
    } catch (error) {

      return {success:false,message:'failed to send otp '}
      
    }

  }


  
 async verifyUserOtp(data: { email: string; phone: string; otp: string }) {
  const { email, phone, otp } = data;

  const user = await this.auditoriumRepositories.findUserByEmail(email);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const savedOtp = await this.otpRepositories.findOtp(email, phone);
  if (!savedOtp) {
    return { success: false, message: "OTP expired or resend OTP" };
  }

  if (savedOtp.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  await this.auditoriumRepositories.verifyUser(email, true);
  await this.otpRepositories.deleteOtp(email, phone);

  return { success: true, message: "OTP verified successfully" };
}


   async resetPass(resetPass:{pass:string,email:string}):Promise<{success:boolean,message:string}>{

    const newPass=resetPass.pass

    const email=resetPass.email

    try {

      const existingUser=await this.auditoriumRepositories.findUserByEmail(email)

      // const hashedPassword=await bcrypt.hash(newPass,10)

      const changedPass=await this.auditoriumRepositories.UpdatePassword(email,'password',newPass)

      if (!changedPass) {

        return { success: false, message: "failed to update the password" }

    }

    return { success: true, message: "password successfully changed" }

      
    } catch (error) {

     return {success:false,message:'Something went wrong'}
      
    }

  }




}