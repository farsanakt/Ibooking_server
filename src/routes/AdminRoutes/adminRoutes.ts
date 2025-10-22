import express from 'express'
import AdminController from '../../controllers/admin/adminController'

const adminController=new AdminController()

const admin_route=express.Router()

admin_route.get('/findcount',adminController.findcount)

admin_route.get('/allaudilist',adminController.allAuditoriumList)

admin_route.post('/acceptauditorium/:id',adminController.acceptAuditorium)

admin_route.post('/acceptvendor/:id',adminController.acceptVendor)

admin_route.post('/acceptvoucher/:id',adminController.acceptvoucher)

admin_route.post('/rejectvoucher/:id',adminController.rejectvoucher)

admin_route.get('/allusers',adminController.allUsers)

admin_route.get('/allvendorusers',adminController.allvendorusers)

admin_route.get('/allauditoriumbokkings',adminController.allAuditoriumBookings)


// ################### Staff #####################
admin_route.post('/addadminstaff',adminController.addAdminStaff)

admin_route.get('/fetchadminstaff',adminController.fetchAllAdminStaff)

admin_route.put('/updateadminstaff/:id',adminController.updateAdminStaff)

admin_route.delete('/deleteadminstaff/:id', adminController.deleteAdminStaff);


// ################### Subscription #####################

admin_route.post('/createsubplans',adminController.createSubcriptionPlane)

admin_route.get("/allsubplans",adminController. getAllSubscriptions)

admin_route.put("/updatesubplans/:id", adminController.updateSubscription)

admin_route.delete("/deletesubplans/:id", adminController.deleteSubscription)



export default admin_route