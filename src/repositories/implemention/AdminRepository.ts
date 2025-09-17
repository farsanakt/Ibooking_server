import auditoriumUserModel, { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import venueModel, { IVenue } from "../../models/auditorium/venueModel";
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

    async updateAuditorium(id:string):Promise<IAuditoriumUser|null>{

        return await auditoriumUserModel.findByIdAndUpdate({_id:id},{isVerified:true},{new:true})

    }

  async updateVenue(id: string): Promise<{ modifiedCount: number }> {
    console.log(id,'po')
  const result = await venueModel.updateMany(
    { audiUserId: id },       
    { $set: { isVerified: true } } 
  );

  return { modifiedCount: result.modifiedCount };
}


}