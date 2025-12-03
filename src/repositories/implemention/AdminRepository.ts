import { AdminItem, IAdminItem } from "../../models/admin/adminItem";
import { AdminStaffModel, IAdminStaff } from "../../models/admin/adminStaffModel";
import SubscriptionModel, { ISubscription } from "../../models/admin/subscriptionModel";
import auditoriumUserModel, { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import bookingModel, { IBooking } from "../../models/auditorium/bookingModel";
import venueModel, { IVenue } from "../../models/auditorium/venueModel";
import userModel, { IUser } from "../../models/user/userModel";
import Enquiry, { IEnquiry } from "../../models/vendor/vendorEnquiry";
import vendorUser, { IVendorUser } from "../../models/vendor/vendorUser";
import { IVoucher, VoucherModel } from "../../models/vendor/voucherModel";


export class AdminRepository{

    async findAllAuditorium():Promise<IAuditoriumUser[]|null>{

        return await auditoriumUserModel.find()

    }

     async findAllVocuhers():Promise<IVoucher[]|null>{

        return await VoucherModel.find()

    }

    async findAllVendor():Promise<IVendorUser[]|null>{

        return await vendorUser.find()

    }

    async allEnquires():Promise<IEnquiry[]|null>{

        return await Enquiry.find()

    }


    async findAllAuditoriumBookings():Promise<IBooking[]|null>{

      return await bookingModel.find()

    }

    async findAllUser():Promise<IUser[]|null>{

        return await userModel.find()

    }

    async updateAuditorium(id:string):Promise<IAuditoriumUser|null>{

        return await auditoriumUserModel.findByIdAndUpdate({_id:id},{isVerified:true},{new:true})

    }

    async updateVendor(id:string):Promise<IVendorUser|null>{

      return await vendorUser.findByIdAndUpdate({_id:id},{isVerified:true},{new:true})

    }

     async updateVoucher(id:string):Promise<IVoucher|null>{

      return await VoucherModel.findByIdAndUpdate({_id:id},{isVeriffed:true},{new:true})

    }

     async rejectVoucher(id:string):Promise<IVoucher|null>{

      return await VoucherModel.findByIdAndUpdate({_id:id},{isVeriffed:false},{new:true})

    }

    async updateVenue(id: string): Promise<{ modifiedCount: number }> {
    
    const result = await venueModel.updateMany(
      { audiUserId: id },       
      { $set: { isVerified: true } } 
    );
    
    return { modifiedCount: result.modifiedCount };

     }
  
    //###################  staff ################

     async createAdminStaff(data: Partial<IAdminStaff>): Promise<IAdminStaff> {
    const newStaff = new AdminStaffModel(data);
    return await newStaff.save();
  }

    async findByEmail(email: string): Promise<IAdminStaff | null> {
      return await AdminStaffModel.findOne({ email });
    }

    async allAdminStaff():Promise<IAdminStaff[]|null>{

      return await AdminStaffModel.find()

    }

    async findStaffByStaffId(id:string):Promise<IAdminStaff|null>{

      return await AdminStaffModel.findOne({staffid:id})

    }

    async updateAdminStaff(id: string, data: Partial<IAdminStaff>): Promise<IAdminStaff | null> {
    return await AdminStaffModel.findOneAndUpdate({ staffid:id }, data, { new: true });
    }

    
    async deleteAdminStaff(staffid: string) {
      return await AdminStaffModel.findOneAndDelete({ staffid });
    }


    //###################  Subscription ################


  async createSubscription(data: Partial<ISubscription>): Promise<ISubscription> {
    const subscription = new SubscriptionModel(data);
    return await subscription.save();
  }

  
  async findAll(): Promise<ISubscription[]> {
    return await SubscriptionModel.find().sort({ createdAt: -1 });
  }

 
  async findById(id: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findById(id);
  }

  
  async updateSubscription(
    id: string,
    data: Partial<ISubscription>
  ): Promise<ISubscription | null> {
    return await SubscriptionModel.findByIdAndUpdate(id, data, {
      new: true, 
      runValidators: true, 
    });
  }

  
  async deleteById(id: string): Promise<void> {
    await SubscriptionModel.findByIdAndDelete(id);
  }


  //################## ITEMS ########################
   async getAdminItem(): Promise<IAdminItem | null> {
    return await AdminItem.findOne();
  }

  async createAdminItem(): Promise<IAdminItem> {
    const newItem = new AdminItem();
    return await newItem.save();
  }

  async addItem(type: string, name: string): Promise<IAdminItem> {
    let adminItem = await this.getAdminItem();

    
    if (!adminItem) {
      adminItem = await this.createAdminItem();
    }

    // @ts-ignore - dynamic key access
    const itemsArray = adminItem[type];
    if (!itemsArray) throw new Error("Invalid type");

   
    const alreadyExists = itemsArray.includes(name);
    if (alreadyExists) {
      return adminItem;
    }
    itemsArray.push(name);
    await adminItem.save();

    return adminItem;
  }

    async getAllItems(): Promise<IAdminItem | null> {
    const adminItem = await this.getAdminItem();
    return adminItem;
  }

   async updateItem(type: string, oldName: string, newName: string): Promise<IAdminItem> {
    let adminItem = await this.getAdminItem();
    if (!adminItem) throw new Error("Admin item document not found");

    // @ts-ignore
    const itemsArray = adminItem[type];
    if (!itemsArray) throw new Error("Invalid type");

    const index = itemsArray.indexOf(oldName);
    if (index === -1) throw new Error(`${oldName} not found in ${type}`);

   
    if (itemsArray.includes(newName)) throw new Error(`${newName} already exists in ${type}`);

    itemsArray[index] = newName;
    await adminItem.save();

    return adminItem;
  }

   async saveAdminItem(adminItem: IAdminItem): Promise<IAdminItem> {
    return await adminItem.save();
  }


}