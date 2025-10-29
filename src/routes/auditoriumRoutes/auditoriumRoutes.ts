import express from 'express'
import AuditoriumController from '../../controllers/auditorium/auditoriumController'
import upload from '../../middleware/upload'
import { uploadBrideGroom } from '../../middleware/uploadBrideGroom'

const auditoriumController=new AuditoriumController()

const  auditorium_route=express.Router()


auditorium_route.post('/addvenue', upload.array('images', 4),auditoriumController.addVenue)

auditorium_route.get('/allvenues',auditoriumController.allVEnues)

auditorium_route.put('/updatevenues/:id', upload.array('images', 4), auditoriumController.updateVenue)


auditorium_route.delete('/deletevenue/:id',auditoriumController.deleteVenue)

auditorium_route.get('/upcomigevents/:id',auditoriumController.getUpcomingEvents)

auditorium_route.get('/audibookings/:id',auditoriumController.existingBookings)

auditorium_route.post('/userexist',auditoriumController.checkUserExist)

auditorium_route.get('/userDetails',auditoriumController.userDetails)

auditorium_route.post('/verify-password/:id',auditoriumController.verifyPassword)

auditorium_route.put('/updatefeild/:id',auditoriumController.updateFeildAudiUser)

auditorium_route.put('/updateemail/:id',auditoriumController.updateAudiUserEmail)

auditorium_route.get('/auditoriumUserdetatils/:id',auditoriumController.findAuditoriumUser)

auditorium_route.post("/bride-groom-details",uploadBrideGroom,auditoriumController.addBrideGroomDetails)

// ###################### Staff ##########################

auditorium_route.post('/addstaff',auditoriumController.addStaff)

auditorium_route.get('/allstaff',auditoriumController.allStaff)

auditorium_route.put('/updatestaff/:staffid',auditoriumController.updateStaff)

auditorium_route.delete('/deletestaff/:id',auditoriumController.deleteStaff)



// ###################### OFFER ##########################
auditorium_route.post('/createoffer',auditoriumController.createOffer)

auditorium_route.get('/fetchoffers/:userId', auditoriumController.getUserOffers)

auditorium_route.put("/offers/:id",auditoriumController.updateOffer);

auditorium_route.delete("/offers/:id",auditoriumController .deleteOffer);

auditorium_route.get('/fetchalloffers',auditoriumController.fetchAllOffer)


export default auditorium_route