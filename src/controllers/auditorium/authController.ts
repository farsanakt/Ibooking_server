import { Request,Response } from "express";
import { AuthService } from "../../services/auditorium/authService";
import { HttpStatus } from "../../enums/httpStatus";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt";

const authService=new AuthService()

class AuthController{

async signup(req: Request, res: Response) {
    try {
      const response = await authService.signup(req.body, req.files);

      console.log(response,'this is the auth response')

      if (!response.success) {
         res.status(400).json(response);
         return
      }

       res.status(201).json(response);
       return
    } catch (error: any) {
      console.error("Signup error:", error);
       res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return
    }
  }

async login(req: Request, res: Response) {

  
  try {
    const data = req.body;

    
    const response = await authService.login(data)
    console.log('njn ivde und',data)

    if (!response?.success) {

       res.status(HttpStatus.BAD_REQUEST).json(response);

       return
    }

    
     res.status(HttpStatus.OK).json({
      success: true,
      message: response.message,
      accessToken: response.accessToken,
      user: response.user,
    });
    return

  } catch (error) {
    console.error('Login error:', error);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
    });
    return
  }
}

 async forgetPass(req:Request,res:Response){

  const data=req.body
  

    try {

      const response=await authService.forgetPass(data)

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({response});
         
      }


      
    } catch (error) {

      console.log(error)
      
    }

  }


async verifyOtp(req: Request, res: Response) {
  try {
    const { email, phone, otp } = req.body;

    const response = await authService.verifyUserOtp({ email, phone, otp });

    if (!response.success) {
       res.status(400).json(response);
      return
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

  async resetPass(req:Request,res:Response){

    try {

      console.log('reached in reset password controller')

      const response=await authService.resetPass(req.body)

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({response});
         
      }
      
    } catch (error) {

      console.log(error)
      
    }

  }


// async refreshToken (req: Request, res: Response)  {

//   console.log('hi')
//   try {
//     const refreshToken = req.cookies.refreshToken || req.headers.authorization;

//     console.log(refreshToken,'ui')

//     if (!refreshToken) {
//        res.status(401).json({ message: 'Token missing' });
//        return
//     }

//     const decoded = verifyRefreshToken(refreshToken as string);

//     const newAccessToken = generateAccessToken({
//       id: decoded.id,
//       role: decoded.role,
//     });

//      res.status(200).json({ accessToken: newAccessToken });
//      return
//   } catch (err) {
//     console.error('Error verifying refresh token:', err);
//      res.status(403).json({ message: 'Invalid refresh token' });
//      return
//   }
// };


}

export default AuthController