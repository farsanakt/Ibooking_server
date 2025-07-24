import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export class AuthService{

      private auditoriumRepositories: AuditoriumRepositories;

  

  constructor() {

    this.auditoriumRepositories = new AuditoriumRepositories();
    

  }

    async userSignup(formData:any){

        const {auditoriumName,ownerName,email,phone,password,confirmPassword}=formData

        try {

          if(password!==confirmPassword){

            return {success:false,message:'password and confirm password are not match'}

          }

          const existingUser=await this.auditoriumRepositories.findUserByOwnerName(ownerName)

          if(existingUser){

            return {success:false,message:'Username already existed'}

          }else{

              const savedDetails = await this.auditoriumRepositories.createUser({

                  auditoriumName: auditoriumName,
                  phone:phone,
                  ownerName:ownerName,
                  email: email,
                  password: password,
                  role:'auditorium'

                })

                 return {success:true,message:'registered succefully..!'}

          }

                
        } catch (error) {

          console.log('error in authservice')
            
        }

    }

   async login(data: any) {
  try {

    console.log('koop')
    
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

}