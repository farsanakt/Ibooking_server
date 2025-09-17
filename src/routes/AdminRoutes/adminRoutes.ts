import express from 'express'
import AdminController from '../../controllers/admin/adminController'

const adminController=new AdminController()

const admin_route=express.Router()

admin_route.get('/findcount',adminController.findcount)

admin_route.get('/allaudilist',adminController.allAuditoriumList)

admin_route.post('/acceptauditorium/:id',adminController.acceptAuditorium)

export default admin_route