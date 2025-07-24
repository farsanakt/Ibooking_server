import express from 'express'
import UserController from '../../controllers/user/userController'

const userController=new UserController()
const user_route=express.Router()


user_route.get('/findauditorium',userController.findAuditorium)

user_route.get('/findvenues/:id',userController.findVenues)

user_route.get('/findVenueDetails/:id',userController.findVenueDetails)


export default user_route