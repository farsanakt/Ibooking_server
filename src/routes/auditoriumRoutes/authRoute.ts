import express from 'express'
import AuthController from '../../controllers/auditorium/authController'

const authController=new AuthController()

const auditoriumAuth_route=express.Router()

auditoriumAuth_route.post('/signup',authController.signup)

auditoriumAuth_route.post('/login',authController.login)


auditoriumAuth_route.post('/pass',authController.forgetPass)

auditoriumAuth_route.post('/verifyforgetpassotp',authController.verifyOtp)

auditoriumAuth_route.post('/resetpass',authController.resetPass)

// auditoriumAuth_route.post('/refresh-token', authController.refreshToken);


export default auditoriumAuth_route