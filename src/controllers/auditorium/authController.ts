import { Request,Response } from "express";
import { AuthService } from "../../services/auditorium/authService";
import { HttpStatus } from "../../enums/httpStatus";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt";

const authService=new AuthService()

class AuthController{

  async signup(req: Request, res: Response) {
  try {
    const formData = req.body;
    console.log(formData,'po')
    const response = await authService.userSignup(formData);

    console.log(response);

    if (!response?.success) {
      console.log('me');
      res.status(HttpStatus.BAD_REQUEST).json(response);
    } else {
      res.status(HttpStatus.CREATED).json({ message: 'Registered successfully!!' });
    }

  } catch (error) {
    console.error('Signup error:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
    });
  }
}


async login(req: Request, res: Response) {

  console.log('ethi')
  try {
    const data = req.body;

    const response = await authService.login(data);

    if (!response?.success) {

       res.status(HttpStatus.BAD_REQUEST).json(response);

       return
    }

    console.log(response.accessToken,'accees')
    
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