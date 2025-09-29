import express from 'express'
import UserController from '../../controllers/user/userController'
import upload from '../../middleware/upload'
 

const userController=new UserController()
const user_route=express.Router()


user_route.get('/findauditorium',userController.findAuditorium)

user_route.get('/findvenues/:id',userController.findVenues)

user_route.get('/findVenueDetails/:id',userController.findVenueDetails)

user_route.post('/bookings',userController.bookings)

user_route.get('/existingBookings/:id',userController.existingBookings)

user_route.get('/existingVendorBookings/:id',userController.existingVendorBookings)

user_route.get('/venues',userController.allVenues)

user_route.get('/userexistingbooking',userController.fetchExistingUserBooking)


//############ VENDOR ################


user_route.get('/allvendors',userController.allVendors)

user_route.get('/singlevendor/:id',userController.singleVendor)

user_route.post('/vendorbookings',userController.createVendorBooking)

user_route.post('/addvendor',upload.array('images', 4),userController.addVendor)

user_route.get('/allVendorss',userController.existingALlVendors)

user_route.post('/vendorenquiry',userController.vendorEnquiry)

user_route.get('/fetchenquiries',userController.fetchVendorEnquiry)

user_route.get('/currentvendorUser',userController.currentUserVendorData)

// ###################### Voucher ##########################
// user_route.post('/createoffer',userController.createVoucher

// user_route.get('/fetchoffers/:userId', userController.getUserVoucher)

// user_route.put("/offers/:id",userController.updateVoucher);

// user_route.delete("/offers/:id",userController .deleteVoucher);

user_route.get('/fetchvoucher/:id',userController.fetchAllVoucher)




export default user_route