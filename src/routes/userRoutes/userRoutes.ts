import express from 'express'
import UserController from '../../controllers/user/userController'

const userController=new UserController()
const user_route=express.Router()


user_route.get('/findauditorium',userController.findAuditorium)


export default user_route