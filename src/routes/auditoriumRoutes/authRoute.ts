import express from 'express'
import AuthController from '../../controllers/auditorium/authController'

const authController=new AuthController()

const auditoriumAuth_route=express.Router()

auditoriumAuth_route.post('/signup',authController.signup)

auditoriumAuth_route.post('/login',authController.login)

// auditoriumAuth_route.post('/refresh-token', authController.refreshToken);


export default auditoriumAuth_route