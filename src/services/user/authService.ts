import { IOtp } from "../../models/auditorium/otpModel";
import { OtpRepository } from "../../repositories/implemention/OtpRepositories";
import { UserRepositories } from "../../repositories/implemention/UserRepositories"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { MailService } from "../MailService";



const mailService = new MailService();

  export const generateOtp = () => {

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  return otp;

};

export class AuthService{

      private userRepositories: UserRepositories;

      private otpRepositories:OtpRepository
  auditoriumRepositories: any;

  

  constructor() {

    this.userRepositories = new UserRepositories();

    this.otpRepositories=new OtpRepository()
    

  }

   async userRegistration(formData: any) {
    console.log('userRegistration called with:', formData)
    const { firstName, lastName, email, phone, password, confirmPassword } = formData

    try {
      if (password !== confirmPassword) {
        return { success: false, message: 'Password and confirm password do not match' }
      }

      const existingUser = await this.userRepositories.findUserByEmail(email)
      console.log('Existing user:', existingUser)

      if (existingUser) {
        if (!existingUser.isVerified) {
          const getOtp = await  this.otpRepositories.findOtpByEmail(email)
          if (getOtp) {
            const currentTime = new Date().getTime()
            const expirationTime = new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000
            if (currentTime < expirationTime) {
              return { success: true, message: 'OTP is still valid. Please verify using the same OTP.' }
            } else {
              const newOtp = generateOtp()
              await this.otpRepositories.updateOtpByEmail(email, newOtp)
              await mailService.sendOtpEmail(email, newOtp)
              return { success: true, message: 'OTP expired. A new OTP has been sent to your email.' }
            }
          } else {
            const newOtp = generateOtp()
            await this.otpRepositories.create({ email, otp: newOtp } as unknown as IOtp)
            await mailService.sendOtpEmail(email, newOtp)
            return { success: true, message: 'No OTP found. A new OTP has been sent to your email.' }
          }
        } else {
          return { success: false, message: 'Username already exists' }
        }
      }

      const savedDetails = await this.userRepositories.createUser({
        firstName,
        lastName,
        email,
        phone,
        password,
      })

      const newOtp = generateOtp()
      await this.otpRepositories.create({ email, otp: newOtp } as unknown as IOtp)
      await mailService.sendOtpEmail(email, newOtp)
      return { success: true, message: 'Registered successfully. OTP sent to your email.' }
    } catch (error) {
      console.error('Error in userRegistration:', error)
      return { success: false, message: 'Error during registration' }
    }
  }

   async login(data: any) {
  try {

    console.log('koop')
    
    const existingUser = await this.userRepositories.findUserByEmail(data.email);

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


async verifyUserOtp(otpdata: {email: string;otp: string;}): Promise<{ success: boolean; message: string }> {

   

    const { email, otp } = otpdata;

    const validUser=await this.userRepositories.findUserByEmail(email)

    console.log(validUser,'va')


    if (!validUser) {

      return { success: false, message: "this email is not registered" };

    }

    const currentOtp = await this.otpRepositories.findOtpByEmail(email);

    

    if (!currentOtp?.otp) return { success: false, message: "resend the otp" };

    if (currentOtp.otp == otp) {

      await this.userRepositories.verifyUser(email, true);

      await this.otpRepositories.deleteOtpByEmail(email);

      return { success: true, message: "otp verification completed" };

    } else {

      console.log("wrong")

      return { success: false, message: "please enter valid otp" }

    }

  }

  async vendorLogin(data: any) {

    try {

      console.log('koop')
      
      const existingUser = await this.userRepositories.findVendorUserByEmail(data.email);

      console.log(existingUser,'h')

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

   async vendorRegistration(formData:any){

        const {name,vendortype,email,phone,password,confirmPassword,address}=formData

        try {

          if(password!==confirmPassword){

            return {success:false,message:'password and confirm password are not match'}

          }

          const existingUser=await this.userRepositories.findVendorByEmail(email)

          if(existingUser){

            return {success:false,message:'Username already existed'}

          }else{

              const savedDetails = await this.userRepositories.createVendorUser({

                  name: name,
                  phone:phone,
                  vendortype:vendortype,
                  email: email,
                  password: password,
                  role:'vendor',
                  address:address

                })

                 return {success:true,message:'registered succefully..!'}

          }

                
        } catch (error) {

          console.log('error in authservice')
            
        }

    }

}