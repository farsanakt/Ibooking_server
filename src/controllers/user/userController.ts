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

    async allVenues(req:Request,res:Response){

    try {

        const response=await userService.allVenues()

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