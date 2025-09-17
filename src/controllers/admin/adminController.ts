import { Request,Response } from "express"
import AdminService from "../../services/admin/adminService"
import { HttpStatus } from "../../enums/httpStatus"

const adminService=new AdminService()

class AdminController{



    async findcount(req:Request,res:Response){

        try {

            const response=await adminService.findcount()

            console.log(response)

            if(response){

                res.status(HttpStatus.CREATED).json(response)
            }
            
        } catch (error) {
            
        }

    }

    async allAuditoriumList(req:Request,res:Response){

        try {

            const response=await adminService.allAuditoriumList()

            console.log(response)

            if(response){

                res.status(HttpStatus.CREATED).json(response)
            }
            
        } catch (error) {
            
        }

    }

}

export default AdminController