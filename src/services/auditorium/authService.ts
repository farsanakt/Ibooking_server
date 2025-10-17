import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export class AuthService{

      private auditoriumRepositories: AuditoriumRepositories;

  

  constructor() {

    this.auditoriumRepositories = new AuditoriumRepositories();
    

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
    locations
  } = formData;

  try {
    if (password !== confirmPassword) {
      return { success: false, message: 'Password and confirm password do not match' };
    }

    const existingUser = await this.auditoriumRepositories.findUserByOwnerName(ownerName);

    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    } else {
      const savedDetails = await this.auditoriumRepositories.createUser({
        auditoriumName,
        phone,
        ownerName,
        email,
        password,
        role: 'auditorium',
        address,
        district,
        panchayat,
        corporation,
        municipality,
        events,      
        locations    
      });

      return { success: true, message: 'Registered successfully..!' };
    }
  } catch (error) {
    console.log('Error in authService:', error);
    return { success: false, message: 'Server error' };
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