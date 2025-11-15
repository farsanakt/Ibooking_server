import { Request,Response } from "express"
import { AuditoriumService } from "../../services/auditorium/auditoriumSerivce"
import { HttpStatus } from "../../enums/httpStatus"
import { OfferService } from "../../services/auditorium/offerService";
import { StaffService } from "../../services/auditorium/staffService";

const staffService=new StaffService()

const offerService = new OfferService();


const auditoriumService=new AuditoriumService()
class AuditoriumController{

    async addVenue(req:Request,res:Response){

        try {


            const data=req.body

            if (typeof data.events === "string") {
  data.events = JSON.parse(data.events);
}

if (Array.isArray(data.events) && typeof data.events[0] === "string" && data.events.length === 1) {

  data.events = JSON.parse(data.events[0]);
}

             if (typeof data.locations === "string") {
                data.locations = JSON.parse(data.locations);
                }
                if (typeof data.timeSlots === "string") {
                data.timeSlots = JSON.parse(data.timeSlots);
                }
                if (typeof data.amenities === "string") {
                data.amenities = JSON.parse(data.amenities);
                }
                if (typeof data.tariff === "string") {
                data.tariff = JSON.parse(data.tariff);
                }

                // if (typeof data.termsAndConditions === "string") {
                // data.termsAndConditions = JSON.parse(data.termsAndConditions);
                // }

            const files = req.files as Express.Multer.File[]

            const imageUrls = files.map((file) => (file as any).location)
 
            const response = await auditoriumService.addVenue({ ...data, images: imageUrls });

            if(!response){

                res.status(HttpStatus.BAD_REQUEST).json(response)

                return

            }
            
            res.status(HttpStatus.CREATED).json(response)

        } catch (error) {

            console.log(error,'error in auditorium controller')
            
        }

    }

    async allVEnues(req:Request,res:Response){

        try {

            const audiUserId = req.query.audiUserId as string

            const response=await auditoriumService.allVenues(audiUserId)
               
            if(response){

                res.status(HttpStatus.CREATED).json(response)

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
            
        } catch (error) {
            
        }

    }

  
  async updateVenue(req: Request, res: Response) {

  try {

    const venueId = req.params.id

    let data = req.body

    
if (data.locations && typeof data.locations === "string") data.locations = JSON.parse(data.locations);
if (data.timeSlots && typeof data.timeSlots === "string") data.timeSlots = JSON.parse(data.timeSlots);
if (data.amenities && typeof data.amenities === "string") data.amenities = JSON.parse(data.amenities);
if (data.tariff && typeof data.tariff === "string") data.tariff = JSON.parse(data.tariff);
if (data.events && typeof data.events === "string") data.events = JSON.parse(data.events);

    const files = req.files as Express.Multer.File[];
    const newImageUrls = files.map((file) => (file as any).location);

    let existingImages: string[] = [];
    if (data.existingImages) {
      if (Array.isArray(data.existingImages)) {
        existingImages = data.existingImages;
      } else if (typeof data.existingImages === "string") {
        existingImages = [data.existingImages];
      }
    }

    const mergedImages = [...existingImages, ...newImageUrls];

    if (Array.isArray(data.audiUserId)) {
      data.audiUserId = data.audiUserId[0];
    }

    const response = await auditoriumService.updateVenue(venueId, { ...data, images: mergedImages });

    if (!response.success) {
       res.status(400).json(response);
       return
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updateVenue controller:", error);
    res.status(500).json({ success: false, message: "Internal server error while updating venue" });
  }
}


    async deleteVenue(req: Request, res: Response) {

    try {

        const id = req.params.id


        const response = await auditoriumService.deleteVenue(id)


        if (response.status) {

         res.status(200).json({ success: true, message: response.message })

         return

        } else {

         res.status(404).json({ success: false, message: response.message })

         return

        }

    } catch (error) {

        console.error("Controller error while deleting venue:", error)

         res.status(500).json({ success: false, message: 'Internal server error.' })

         return

    }
    }

    async getUpcomingEvents(req:Request,res:Response){

        try {

            const id=req.params.id

            const response=await auditoriumService.upcomingEvents(id)

            if(response){

                res.status(HttpStatus.CREATED).json(response)

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
           
        } catch (error) {
            
        }

    }

    async existingBookings(req:Request,res:Response){

          try {

            const id=req.params.id

            const response=await auditoriumService.existingBookings(id)

            if(response){

                res.status(HttpStatus.CREATED).json(response)

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
           
        } catch (error) {
            
        }

    }

  async checkUserExist(req: Request, res: Response) {

    try {
        const { email } = req.body

        const response = await auditoriumService.checkUserExist(email);
        
        res.status(HttpStatus.CREATED).json(response)

        return

    } catch (error) {

        console.error("Server error:", error)

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server error. Please try again later.",
        })

    }
    }

   async userDetails(req: Request, res: Response) {

  try {

    const  email = req.query.email as string

    const response = await auditoriumService.userDetails(email);
    
    if(response){
    
        res.status(HttpStatus.CREATED).json(response)

        return

    }

  } catch (error) {

    console.error("Server error:", error)

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server error. Please try again later.",
    })
    
  }
}

   
    async findAuditoriumUser(req:Request,res:Response){

        try {
            const id=req.params.id

            console.log('limme')

            const response=await auditoriumService.findAuditoriumUser(id)

            if(response){
    
            res.status(HttpStatus.CREATED).json(response)

            return

    }
            
        } catch (error) {
            
        }

    }

    async verifyPassword(req:Request,res:Response){

        try {

            const id=req.params.id

            const {password}=req.body

            const response=await auditoriumService.verifyPassword(id,password)

            
            if(response){
    
            res.status(HttpStatus.CREATED).json(response)

            return

          }
            
        } catch (error) {

            console.log('error')
            
        }

    }

    async updateFeildAudiUser(req:Request,res:Response){

      const id=req.params.id

      const updates=req.body

      try {

        const response=await auditoriumService.updateFeildAudiUser(id,updates)

            
            if(response){
    
            res.status(HttpStatus.CREATED).json(response)

            return

          }
        
      } catch (error) {
        
      }

    }

    async updateAudiUserEmail(req:Request,res:Response){

      const {email}=req.body

      const id=req.params.id

      try {

        const response=await auditoriumService.updateEmail(id,email)

            
            if(response){
    
            res.status(HttpStatus.CREATED).json(response)

            return

          }
        
      } catch (error) {
        
      }

    }
    
    async addBrideGroomDetails(req: Request, res: Response) {
    

        try {

        const data = req.body;
       
        if (typeof data.bride === 'string') {
            data.bride = JSON.parse(data.bride);
        }
        if (typeof data.groom === 'string') {
            data.groom = JSON.parse(data.groom);
        }

        const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };
        const bridePhoto = files['bridePhoto']?.[0]?.location;
        const brideIdProof = files['brideIdProof']?.[0]?.location;
        const groomPhoto = files['groomPhoto']?.[0]?.location;
        const groomIdProof = files['groomIdProof']?.[0]?.location;

        data.bride.photo = bridePhoto;
        data.bride.idProof = brideIdProof;
        data.groom.photo = groomPhoto;
        data.groom.idProof = groomIdProof;

        const response = await auditoriumService.addBrideGroomDetails({ ...data });

        if (!response) {

            res.status(HttpStatus.BAD_REQUEST).json(response)

            return

        }

        res.status(HttpStatus.CREATED).json(response)

        } catch (error) {

        console.log(error, 'error in auditorium controller')
        
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to save bride/groom details',
        });
        }
    }



     // ###################### Staff ##########################


  async addStaff(req: Request, res: Response): Promise<void> {

  try {
    const data = req.body;

    const staff = await staffService.addStaff(data);

    res.status(201).json({
      success: true,
      message: "Staff added successfully",
      data: staff,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add staff",
    });
  }
  };


  async allStaff(req:Request,res:Response){

    try {

      const response=await staffService.getAllStaff()

      if(response){

        res.status(HttpStatus.CREATED).json(response)

      }
      
    } catch (error) {
      
    }

  }

   
  async updateStaff (req: Request, res: Response): Promise<void> {

  try {
    const { staffid } = req.params
    const data = req.body;

    const updated = await staffService.updateStaff(staffid, data);

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Staff not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update staff",
    });
  }
};

  
async deleteStaff(req: Request, res: Response): Promise<void>  {
  try {
    const { id } = req.params;

    const deleted = await staffService.deleteStaff(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Staff not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      data: deleted,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete staff",
    });
  }
};

    // ###################### OFFER ##########################

   async createOffer (req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;

    const newOffer = await offerService.createOffer(data);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error: any) {
    console.error("Error creating offer:", error.message);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create offer",
    });
  }
};

   async getUserOffers(req: Request, res: Response): Promise<void>{
  try {
    const { userId } = req.params;

    const offers = await offerService.getUserOffers(userId);

    res.status(200).json({
      success: true,
      data: offers,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch offers",
    });
  }
};
   
   async updateOffer (req: Request, res: Response): Promise<void>{
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedOffer = await offerService.updateOffer(id, data);

    if (!updatedOffer) {
      res.status(404).json({ success: false, message: "Offer not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update offer",
    });
  }
};

async deleteOffer (req: Request, res: Response): Promise<void>{
  try {
    const { id } = req.params;

    const deletedOffer = await offerService.deleteOffer(id);

    if (!deletedOffer) {
      res.status(404).json({ success: false, message: "Offer not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
      data: deletedOffer,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete offer",
    });
  }
};

async fetchAllOffer(req:Request,res:Response){

  try {

    const response=await offerService.fetchAllOffer()

    if(response){

      res.status(HttpStatus.CREATED).json(response)

    }
    
  } catch (error) {
    
  }

}





}









export default AuditoriumController