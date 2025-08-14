import User,{ IUser } from "../../models/user/userModel";
import vendorUser, { IVendorUser } from "../../models/vendor/vendorUser";

export class UserRepositories{

    async createUser(data:any):Promise<IUser|null>{
       return await User.create(data)
    }

    async findUserByEmail(email:string):Promise<IUser |null>{
        return await User.findOne({email:email})
    }

    async findVendorUserByEmail(email:string):Promise<IVendorUser|null>{

        return await vendorUser.findOne({email:email})

    }

    async findUserByOwnerName(ownername:string):Promise<IUser| null>{

        return await User.findOne({ownerName:ownername})

    }

    async createVendorUser(data:any):Promise<IVendorUser|null>{
       return await vendorUser.create(data)
    }

    async findVendorByEmail(email:string):Promise<IVendorUser|null>{
        return await vendorUser.findOne({email:email})
    }

}