import auditoriumUserModel, { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import userModel, { IUser } from "../../models/user/userModel";
import vendorUser, { IVendorUser } from "../../models/vendor/vendorUser";


export class AdminRepository{

    async findAllAuditorium():Promise<IAuditoriumUser[]|null>{

        return await auditoriumUserModel.find()

    }

    async findAllVendor():Promise<IVendorUser[]|null>{

        return await vendorUser.find()

    }

    async findAllUser():Promise<IUser[]|null>{

        return await userModel.find()

    }

}