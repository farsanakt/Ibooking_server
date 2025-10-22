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

async allAuditoriumBookings(req:Request,res:Response){

    try {

        const response=await adminService.allAuditoriumBookings()

        if(response){

            res.status(HttpStatus.CREATED).json(response)

        }
        
    } catch (error) {
        
    }

}


// ################ adminStaff ###############

async addAdminStaff(req: Request, res: Response): Promise<void> {
    const data = req.body;
    console.log("data staff", data);

    try {
      const newStaff = await adminService.addAdminStaff(data);

      if (!newStaff.success) {
        res.status(HttpStatus.BAD_REQUEST).json(newStaff);
        return;
      }

      res.status(HttpStatus.CREATED).json(newStaff);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Failed to add admin staff",
      });
    }
  }
  
  async fetchAllAdminStaff(req:Request,res:Response){

    try {

      const response=await adminService.fetchAllAdminStaff()

      if(response){

        res.status(HttpStatus.CREATED).json(response)

      }
      
    } catch (error) {
      
    }

  }


  async updateAdminStaff(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const updateData = req.body;
    console.log("id:", id);

    try {
      const updatedStaff = await adminService.updateAdminStaff(id, updateData);

      if (!updatedStaff.success) {
        res.status(HttpStatus.BAD_REQUEST).json(updatedStaff);
        return;
      }

      res.status(HttpStatus.OK).json(updatedStaff);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Failed to update admin staff",
      });
    }
  }


   async deleteAdminStaff(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    console.log("Deleting staff with ID:", id);

    try {
      const result = await adminService.deleteAdminStaff(id);

      if (!result.success) {
        res.status(HttpStatus.BAD_REQUEST).json(result);
        return;
      }

      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Failed to delete admin staff",
      });
    }
  }

  async createSubcriptionPlane(req:Request,res:Response){

    console.log('ivde ethittoo')

    const data=req.body

    console.log(data,'dataaaaaaa')

    try {
      
    } catch (error) {
      
    }

  }

}






export default AdminController