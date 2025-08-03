import { Request,Response } from "express"
import { AuditoriumService } from "../../services/auditorium/auditoriumSerivce"
import { HttpStatus } from "../../enums/httpStatus"


const auditoriumService=new AuditoriumService()
class AuditoriumController{

    async addVenue(req:Request,res:Response){

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

    async checkUserExist(req:Request,res:Response){
 
        try {

            const {email}=req.body

            const response=await auditoriumService.checkUserExist(email)

            console.log(response,'g')
          
            if(response?.success){

                res.status(HttpStatus.CREATED).json(response)

                return

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)

            return
            
        } catch (error) {
            
        }
    }


}


export default AuditoriumController