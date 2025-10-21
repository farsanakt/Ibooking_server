import express from 'express'
import AuthController from "../../controllers/user/authController";

const userAuth_route =express.Router()


const authController=new AuthController()


userAuth_route.post('/registration',authController.userRegistration)

userAuth_route.post('/signin',authController.login)

userAuth_route.post('/verifyuserotp',authController.verifyUserOtp)

userAuth_route.post('/userforgetpass',authController.forgetPass)

userAuth_route.post('/userresetpass',authController.resetUserPass)


userAuth_route.post('/vendorregistration',authController.vendorRegistration)

userAuth_route.post('/vendorsignin',authController.vendorLogin)

export default userAuth_route