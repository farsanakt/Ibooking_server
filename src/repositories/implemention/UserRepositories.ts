import User,{ IUser } from "../../models/user/userModel";

export class UserRepositories{

    async createUser(data:any):Promise<IUser|null>{
       return await User.create(data)
    }

    async findUserByEmail(email:string):Promise<IUser |null>{
        return await User.findOne({email:email})
    }

    async findUserByOwnerName(ownername:string):Promise<IUser| null>{

        return await User.findOne({ownerName:ownername})

    }

}