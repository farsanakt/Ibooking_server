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

        const response=await userService.findVenueDetails(id)

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
    
            console.log('hiiii')
    
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

        console.log(response,'joppe')

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

        const response=await userService.singleVendor(id)

        console.log(response,'joppe')

        if(response){

          res.status(HttpStatus.CREATED).json(response)

          return

        }
        
      } catch (error) {

        console.log('something went wrong')
        
      }

    }




}


export default UserController