import { Request,Response } from "express"
import AdminService from "../../services/admin/adminService"

const adminService=new AdminService()

class AdminController{



    async findcount(req:Request,res:Response){

        try {

            const response=await adminService.findcount()
            
        } catch (error) {
            
        }

    }

}

export default AdminController