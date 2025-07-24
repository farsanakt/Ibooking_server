import { Request,Response } from "express"
import { AuditoriumService } from "../../services/auditorium/auditoriumSerivce"
import { HttpStatus } from "../../enums/httpStatus"


const auditoriumService=new AuditoriumService()
class AuditoriumController{

    async addVenue(req:Request,res:Response){

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

}


export default AuditoriumController