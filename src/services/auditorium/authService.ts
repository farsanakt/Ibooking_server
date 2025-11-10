import { IOtp } from "../../models/auditorium/otpModel";
import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories"
import { OtpRepository } from "../../repositories/implemention/OtpRepositories";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { MailService } from "../MailService";

const mailService = new MailService();

  export const generateOtp = () => {

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  return otp;

};

export class AuthService{

      private auditoriumRepositories: AuditoriumRepositories;

       private otpRepositories: OtpRepository;

  

  constructor() {

    this.auditoriumRepositories = new AuditoriumRepositories();
    this.otpRepositories = new OtpRepository();
    

  }


async userSignup(formData: any) {
  const {
    auditoriumName,
    ownerName,
    email,
    phone,
    password,
    confirmPassword,
    district,
    panchayat,
    address,
    municipality,
    corporation,
    events,
    locations,
  } = formData;

  try {
    if (password !== confirmPassword) {
      return { success: false, message: "Password and confirm password do not match" };
    }


    const existingUser = await this.auditoriumRepositories.findUserByEmail(email);

    console.log(existingUser)
    

    if (existingUser  ) {
      if (!existingUser.isOtp) {
        

        const getOtp = await this.otpRepositories.findOtpByEmail(email);

        if (getOtp) {
          const currentTime = new Date().getTime();
          const expirationTime = new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000;

          if (currentTime < expirationTime) {
            return { success: false, message: "OTP is still valid. Please verify using the same OTP." };
          } else {
            const newOtp = generateOtp();
            await this.otpRepositories.updateOtpByEmail(email, newOtp);
            await mailService.sendOtpEmail(email, newOtp);
            return { success: false, message: "OTP expired. A new OTP has been sent to your email." };
          }
        } else {
          const newOtp = generateOtp();
          await this.otpRepositories.create({ email, otp: newOtp } as unknown as IOtp);
          await mailService.sendOtpEmail(email, newOtp);
          return { success: true, message: "No OTP found. A new OTP has been sent to your email." };
        }
      } else {
        return { success: false, message: "email already registered" };
      }
    }

    

    const savedDetails = await this.auditoriumRepositories.createUser({
      auditoriumName,
      phone,
      ownerName,
      email,
      password,
      role: "auditorium",
      address,
      district,
      panchayat,
      corporation,
      municipality,
      events,
      locations,
    });

   
    const newOtp = generateOtp();
    

    await this.otpRepositories.create({
      email,
      otp: newOtp,
    } as unknown as IOtp);

    await mailService.sendOtpEmail(email, newOtp);

    return { success: true, message: "Registered successfully..! Please verify your email with OTP." };

  } catch (error) {
    console.error("❌ Error in userSignup:", error);
    return { success: false, message: "Server error" };
  }
}



   async login(data: any) {
  try {
    
    const existingUser = await this.auditoriumRepositories.findUserByEmail(data.email);

    if (!existingUser) {

      return { success: false, message: 'User not found' }

    }

    if (data.password !== existingUser.password) {

      return { success: false, message: 'Incorrect password' }

    }

    const payload = {
      id: existingUser._id,
      role: existingUser.role,
    };

    
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      success: true,
      message: 'Logged in successfully!',
      accessToken,
      refreshToken,
      user: {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
      },
    };

  } catch (error) {
    console.log('Error in authService (auditorium side):', error);
    return { success: false, message: 'Internal server error' };
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


  
  async verifyUserOtp(otpdata: {email: string;otp: string;}): Promise<{ success: boolean; message: string }> {

   

    const { email, otp } = otpdata;


    const validUser = await this.auditoriumRepositories.findUserByEmail(email);


    if (!validUser) {

      return { success: false, message: "this email is not registered" };

    }

    const currentOtp = await this.otpRepositories.findOtpByEmail(email);

    

    if (!currentOtp?.otp) return { success: false, message: "resend the otp" };

    if (currentOtp.otp == otp) {

      await this.auditoriumRepositories.verifyUser(email, true);

      await this.otpRepositories.deleteOtpByEmail(email);

      return { success: true, message: "otp verification completed" };

    } else {

      console.log("wrong")

      return { success: false, message: "please enter valid otp" }

    }

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