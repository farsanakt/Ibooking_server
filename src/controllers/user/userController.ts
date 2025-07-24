import { Request,Response } from "express";
import { UserService } from "../../services/user/userService";

const userService=new UserService()

class UserController{

    async findAuditorium(req: Request, res: Response) {

        console.log('hiiiiii')
  try {
    const event = req.query.event as string
    const place = req.query.place as string

    console.log('Controller received:', { event, place });

    
    const response = await userService.findAuditorium(place, event)

    if (response) {
      res.status(200).json(response);
      return
    }

     res.status(404).json({ message: 'No matching auditoriums found' });
     return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


}


export default UserController