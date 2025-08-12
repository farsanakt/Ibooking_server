import express from 'express'
import UserController from '../../controllers/user/userController'

const userController=new UserController()
const user_route=express.Router()


user_route.get('/findauditorium',userController.findAuditorium)

user_route.get('/findvenues/:id',userController.findVenues)

user_route.get('/findVenueDetails/:id',userController.findVenueDetails)

user_route.post('/bookings',userController.bookings)

user_route.get('/existingBookings/:id',userController.existingBookings)

user_route.get('/existingVendorBookings/:id',userController.existingVendorBookings)

user_route.get('/venues',userController.allVenues)

user_route.get('/allvendors',userController.allVendors)

user_route.get('/singlevendor/:id',userController.singleVendor)

user_route.post('/vendorbookings',userController.createVendorBooking)




export default user_route