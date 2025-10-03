import { Request,Response } from "express"
import AdminService from "../../services/admin/adminService"
import { HttpStatus } from "../../enums/httpStatus"

const adminService=new AdminService()

class AdminController{



    async findcount(req:Request,res:Response){

        try {

            const response=await adminService.findcount()


            if(response){

                res.status(HttpStatus.CREATED).json(response)
            }
            
        } catch (error) {
            
        }

    }

    async allAuditoriumList(req:Request,res:Response){

        try {

            const response=await adminService.allAuditoriumList()

            if(response){

                res.status(HttpStatus.CREATED).json(response)
            }
            
        } catch (error) {
            
        }

    }

   async acceptAuditorium(req: Request, res: Response) {

   try {
    const id = req.params.id;

    const response = await adminService.acceptAuditorium(id);

    if (response.status) {

       res.status(200).json(response)

       return

    } else {

      res.status(404).json(response)

      return

    }
  } catch (error) {

    console.error("Error in acceptAuditorium controller:", error)

     res.status(500).json({ status: false, message: "Internal server error" })

     return
  }
}

   async acceptVendor(req: Request, res: Response) {

   try {
    const id = req.params.id;

    const response = await adminService.acceptVendor(id);

    if (response.status) {

       res.status(200).json(response)

       return

    } else {

      res.status(404).json(response)

      return

    }
  } catch (error) {

    console.error("Error in acceptAuditorium controller:", error)

     res.status(500).json({ status: false, message: "Internal server error" })

     return
  }
}

 async acceptvoucher(req: Request, res: Response) {

    console.log('gooope')

   try {
    const id = req.params.id;

    console.log(id,'poooereee')

    const response = await adminService.acceptvoucher(id);

    if (response.status) {

       res.status(200).json(response)

       return

    } else {

      res.status(404).json(response)

      return

    }
  } catch (error) {

    console.error("Error in acceptAuditorium controller:", error)

     res.status(500).json({ status: false, message: "Internal server error" })

     return
  }
}


 async rejectvoucher(req: Request, res: Response) {


   try {
    const id = req.params.id;

    const response = await adminService.rejectvoucher(id);

    if (response.status) {

       res.status(200).json(response)

       return

    } else {

      res.status(404).json(response)

      return

    }
  } catch (error) {

    console.error("Error in acceptAuditorium controller:", error)

     res.status(500).json({ status: false, message: "Internal server error" })

     return
  }
}

async allUsers(req:Request,res:Response){

    try {

        const response=await adminService.AllUsers()

        if(response){

            res.status(HttpStatus.CREATED).json(response)

        }
        
    } catch (error) {
        
    }

}


async allvendorusers(req:Request,res:Response){

    try {

        const response=await adminService.allvendorusers()

        if(response){

            res.status(HttpStatus.CREATED).json(response)

        }
        
    } catch (error) {
        
    }

}

}

export default AdminController