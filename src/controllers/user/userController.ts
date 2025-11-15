import { Request,Response } from "express";
import { UserService } from "../../services/user/userService";
import { HttpStatus } from "../../enums/httpStatus";

const userService=new UserService()

class UserController{

    async findAuditorium(req: Request, res: Response) {

     try {

    const event = req.query.event as string

    const place = req.query.place as string

    const response = await userService.findAuditorium(place, event)

    if (response) {

      res.status(200).json(response)

      return

    }

     res.status(404).json({ message: 'No matching auditoriums found' })

     return

    } catch (error) {

      console.error(error)

      res.status(500).json({ message: 'Internal server error' })

    }
    }

    async findVenues(req:Request,res:Response){

      try {

        const id=req.params.id

        const response=await userService.findVenues(id)

        if (response) {

          res.status(200).json(response);
          return
        }

        res.status(404).json({ message: 'No matching auditoriums found' });

        return
            
      } catch (error) {

         console.error(error)

         res.status(500).json({ message: 'Internal server error' })
        
      }

    }

    async findVenueDetails(req:Request,res:Response){

      try {
        
        const id=req.params.id

        console.log(id,'lopee')

        const response=await userService.findVenueDetails(id)

        console.log(response)

        if (response) {

          res.status(200).json(response);
          return
        }

        res.status(404).json({ message: 'No matching auditoriums found' });

        return
            
      } catch (error) {

         console.error(error)

         res.status(500).json({ message: 'Internal server error' })
        
      }

    }

    async bookings(req:Request,res:Response){

      try {

        const data=req.body

        console.log(data,'this is the booking data from i getting from the auditorium side')

        const response=await userService.createBookings(data)

         if (response) {

          res.status(200).json(response);
          return
        }

        res.status(404).json({ message: 'No matching auditoriums found' });

        return
        
      } catch (error) {
        
      }

    }

    async createVendorBooking(req: Request, res: Response) {

      try {
        
        const data = req.body;

        const response = await userService.createVendorBookings(data);

        if (response) {
          res.status(200).json(response);
          return;
        }

        res.status(404).json({ message: 'No matching auditoriums found' })
        return;
      } catch (error) {
        console.error("Error in createVendorBooking:", error)
        res.status(500).json({ status: false, message: 'An unexpected error occurred. Please check server logs.' });
      }
    }

    
    async addVendor(req:Request,res:Response){
    
            
    
            try {
    
                const data=req.body
    
                 if (typeof data.cities === "string") {
                    data.cities = JSON.parse(data.cities);
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
    
                const files = req.files as Express.Multer.File[]
    
                const imageUrls = files.map((file) => (file as any).location)
     
                const response = await userService.addVendor({ ...data, images: imageUrls });
    
                if(!response){
    
                    res.status(HttpStatus.BAD_REQUEST).json(response)
    
                    return
    
                }
                
                res.status(HttpStatus.CREATED).json(response)
    
            } catch (error) {
    
                console.log(error,'error in auditorium controller')
                
            }
    
        }

     async existingALlVendors(req:Request,res:Response){
        
                try {
        
                    const vndrUserId = req.query.vndrUserId as string

                    
        
        
                    const response=await userService.existingALlVendors(vndrUserId)
                       
                   
                    if(response){
        
                        res.status(HttpStatus.CREATED).json(response)
        
                    }
        
                    res.status(HttpStatus.BAD_REQUEST).json(response)
                    
                } catch (error) {
                    
                }
        
            }


      // controllers/enquiryController.ts


async vendorEnquiry (req: Request, res: Response): Promise<void>{
  try {
    const data = req.body;
    console.log(data, "📩 Received enquiry data");

    const enquiry = await userService.createVendorEnquiry(data);

    res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      data: enquiry,
    });
  } catch (error: any) {
    console.error("❌ Error creating enquiry:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

   async fetchVendorEnquiry(req:Request,res:Response){

    try {

      const id=req.query.id as string

      
        const response=await userService.fetchVendorEnquiry(id)

        console.log(response,'p')

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
      
    } catch (error) {
      
    }

   }
   

   async currentUserVendorData(req:Request,res:Response){

    try {

      const id=req.query.id as string

      const response=await userService.currentUserData(id)


              
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

         
        const response=await userService.fechingExistingBookings(id)

        

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }

    async existingVendorBookings(req:Request,res:Response){

      try {

        const id=req.params.id
         
        const response=await userService.existingVendorBookings(id)


        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }

    async allVenues(req:Request,res:Response){

    try {

        const response=await userService.allVenues()

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }


    async allVendors(req:Request,res:Response){

    try {

        const response=await userService.allVendors()

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }

      async singleVendor(req:Request,res:Response){

    try {

         const id=req.params.id

         console.log(id,'my')

        const response=await userService.singleVendor(id)

        console.log(response,'resseeeeeeee')

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }


    async fetchExistingUserBooking(req:Request,res:Response){

      try {

        const email=req.query.email as string

          const response=await userService.fetchExistingBooking(email)

          console.log(response,'kkkkkkoppeeeee')

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
        
      } catch (error) {
        
      }

    }

    async fetchAllVoucher(req:Request,res:Response){

      const { id } = req.params;
    
      try {
    
        const response=await userService.fetchAllVoucher(id)

        console.log(response,'vp')
    
        if(response){
    
          res.status(HttpStatus.CREATED).json(response)
    
        }
        
      } catch (error) {
        
      }
    
    }

    async fetchAllVouchers(req:Request,res:Response){

      console.log('hiiiiiiiii')
    
      try {
    
        const response=await userService.fetchAllVouchersUser()

        console.log(response,'vp')
    
        if(response){
    
          res.status(HttpStatus.CREATED).json(response)
    
        }
        
      } catch (error) {
        
      }
    
    }

       async createVoucher (req: Request, res: Response): Promise<void> {
      try {
        const data = req.body;
    
        console.log("Offer data:", data);
    
        const newOffer = await userService.createVoucher(data);
    
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


      async updateVoucher (req: Request, res: Response): Promise<void>{
      try {
        const { id } = req.params;
        const data = req.body;
    
        const updatedOffer = await userService.updateVoucher(id, data);
    
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
    
    async deleteVoucher (req: Request, res: Response): Promise<void>{
      try {
        const { id } = req.params;
    
        const deletedOffer = await userService.deleteVoucher(id);
    
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



}


export default UserController