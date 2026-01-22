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

    const {userId}=req.body
    console.log(userId,'koooop')

    const response = await adminService.acceptAuditorium(id,userId);

    console.log(response)

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

  async rejectauditorium(req: Request, res: Response) {

   try {
    const id = req.params.id;

    const {userId}=req.body
    console.log(userId,'koooop')

    const response = await adminService.acceptAuditorium(id,userId);

    console.log(response)

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

    const {userId}=req.body

    const response = await adminService.acceptVendor(id,userId);

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

   

   try {
    const id = req.params.id;

    

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

async allEnquires(req:Request,res:Response){
  console.log('njn ivde und')

    try {

        const response=await adminService.allEnquires()

        console.log(response,'leeeeeeee')

        if(response){

            res.status(HttpStatus.CREATED).json(response)

            return

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
 
    console.log(data,'jop')
 
    try {
      const newStaff = await adminService.addAdminStaff(data);

      console.log(newStaff,'kopee')

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


  // #######################  SUBSCRIPTION #################


 async createSubcriptionPlane(req: Request, res: Response){
  try {
    const subscription = await adminService.createSubscription(req.body);
    res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      data: subscription,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 async  getAllSubscriptions(req: Request, res: Response){
  try {
    const subscriptions = await adminService.getAllSubscriptions();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 async  updateSubscription (req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const updated = await adminService.updateSubscription(id, req.body);
    res.status(200).json({
      success: true,
      message: "Subscription plan updated successfully",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 async  deleteSubscription (req: Request, res: Response) {
  try {
    const { id } = req.params;
    await adminService.deleteSubscription(id);
    res.status(200).json({
      success: true,
      message: "Subscription plan deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};



async adminLogin(req: Request, res: Response) {
    try {
      const data = req.body;

      console.log('njn',data)

      const response = await adminService.adminLogin(data);

      if (!response?.success) {
        res.status(HttpStatus.BAD_REQUEST).json(response);
        return;
      }

      res.status(HttpStatus.OK).json({
        success: true,
        message: response.message,
        accessToken: response.accessToken,
        user: response.user,
      });
      return;

    } catch (error) {
      console.error("Admin login error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  }

  async logout(req:Request,res:Response){

    try {

      const id=req.params.id

      
      const response = await adminService.adminLogout(id);
      
    } catch (error) {
      
    }

  }



async addItems(req: Request, res: Response) {
  console.log('njn ubde')
    try {
      const { type, data } = req.body

      console.log("Received:", type, data);

      const result = await adminService.addItem(type, data);

      res.status(200).json({
        success: true,
        message: `${data} added successfully to ${type}`,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }


  async getAllAdminItems(req: Request, res: Response) {
    try {
      const result = await adminService.getAllItems();

      res.status(200).json({
        success: true,
        message: "Admin items fetched successfully",
        items: result, 
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch admin items",
      });
    }
  }

   async updateAdminItem(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const { oldName, newName } = req.body;

      console.log(type,oldName,newName,'oooook')

      const result = await adminService.updateItem(type, oldName, newName);

      res.status(200).json({
        success: true,
        message: `${oldName} updated to ${newName} in ${type}`,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to update item",
      });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { type, itemName } = req.body;

      if (!type || !itemName) {
         res.status(400).json({
          success: false,
          message: "Type and itemName are required",
        });
        return
      }

      const updated = await adminService.deleteItem(type, itemName);

       res.status(200).json({
        success: true,
        message: `${itemName} deleted successfully from ${type}`,
        data: updated,
      });
      return
    } catch (error: any) {
      console.error("Error deleting item:", error);
       res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
      return
    }
  }

}


 export default AdminController