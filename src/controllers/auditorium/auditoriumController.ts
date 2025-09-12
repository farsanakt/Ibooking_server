import { Request,Response } from "express"
import { AuditoriumService } from "../../services/auditorium/auditoriumSerivce"
import { HttpStatus } from "../../enums/httpStatus"
import { OfferService } from "../../services/auditorium/offerService";

const offerService = new OfferService();


const auditoriumService=new AuditoriumService()
class AuditoriumController{

    async addVenue(req:Request,res:Response){

        console.log('hiiii')

        try {


            const data=req.body

            console.log(data,'ithan ath')

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

            console.log(audiUserId,'koooooo')

            const response=await auditoriumService.allVenues(audiUserId)

            console.log('ithan',response)
               
           
            if(response){

                res.status(HttpStatus.CREATED).json(response)

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
            
        } catch (error) {
            
        }

    }

    async updateVenues(req:Request,res:Response){

        try {

            const {data,id}=req.body

            const response=await auditoriumService.updateVenues(id,data)

            if(!response){

                res.status(HttpStatus.BAD_REQUEST).json(response)

                return

            }

            res.status(HttpStatus.CREATED).json(response)
            
        } catch (error) {

            console.log('something went wrong in updateVenue contoller')
            
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
            console.log()
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
            console.log()
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

    console.log('meeeeeeee')
    const  email = req.query.email as string

    console.log(email,'meee')

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

            console.log(id,'usere')

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

    // ###################### OFFER ##########################

   async createOffer (req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;

    console.log("Offer data:", data);

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
}









export default AuditoriumController