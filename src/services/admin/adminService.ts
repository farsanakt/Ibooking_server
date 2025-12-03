import * as bcrypt from "bcryptjs";

import { AdminStaffModel, IAdminStaff } from "../../models/admin/adminStaffModel";
import { ISubscription } from "../../models/admin/subscriptionModel";
import { AdminRepository } from "../../repositories/implemention/AdminRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";


const DEFAULT_ADMIN = {
  email: process.env.DEFAULT_ADMIN_EMAIL ,
  password: process.env.DEFAULT_ADMIN_PASSWORD ,
  role: "admin",
};

class AdminService{

      private adminRepositories: AdminRepository;
    
      
    
      constructor() {
    
        this.adminRepositories = new AdminRepository();
        
    
      }


  async findcount() {

  try {

    const allUsers = await this.adminRepositories.findAllUser()

    const allVendors = await this.adminRepositories.findAllVendor()

    const allAuditorium = await this.adminRepositories.findAllAuditorium()

    const allVouchers=await this.adminRepositories.findAllVocuhers()

    const totalUsers = allUsers?.length

    const totalVendors = allVendors?.length

    const totalAuditorium = allAuditorium?.length

   const totalVouchers=allVouchers?.length

    return {status: true, data: { totalUsers, totalVendors,totalAuditorium,totalVouchers},}

  } catch (error) {

    console.error("Error in findcount:", error)
    
    return {
      status: false,
      message: "Failed to fetch counts",
    };
  }
  }

  async allAuditoriumList(){

    try {

      return await this.adminRepositories.findAllAuditorium()
      
    } catch (error) {
      
    }

  }

  async acceptAuditorium(id: string) {

  try {
    const updateAudi = await this.adminRepositories.updateAuditorium(id)

    const updateVenue=await this.adminRepositories.updateVenue(id)
    
    if (!updateAudi) {

      return { status: false, message: "Auditorium not found or update failed" }

    }

    return { status: true, message: "Auditorium verified successfully", data: updateAudi }

  } catch (error) {

    console.error("Error in acceptAuditorium service:", error)

    return { status: false, message: "Something went wrong while updating auditorium" }

  }
}

  async acceptVendor(id: string) {

  try {
    const updateAudi = await this.adminRepositories.updateVendor(id)

    

    // const updateVenue=await this.adminRepositories.updateVenue(id)
    
    if (!updateAudi) {

      return { status: false, message: "auditorium not found or update failed" }

    }

    return { status: true, message: "auditorium verified successfully", data: updateAudi }

  } catch (error) {

    console.error("Error in acceptAuditorium service:", error)

    return { status: false, message: "Something went wrong while updating auditorium" }

  }
}

 async acceptvoucher(id: string) {

  try {
    const updateAudi = await this.adminRepositories.updateVoucher(id)

    

    // const updateVenue=await this.adminRepositories.updateVenue(id)
    
    if (!updateAudi) {

      return { status: false, message: "Voucher not found or update failed" }

    }

    return { status: true, message: "Voucher verified successfully", data: updateAudi }

  } catch (error) {

    console.error("Error in acceptAuditorium service:", error)

    return { status: false, message: "Something went wrong while updating Voucher" }

  }
}


 async rejectvoucher(id: string) {

  try {
    const updateAudi = await this.adminRepositories.rejectVoucher(id)

    

    // const updateVenue=await this.adminRepositories.updateVenue(id)
    
    if (!updateAudi) {

      return { status: false, message: "Voucher not found or update failed" }

    }

    return { status: true, message: "voucher verified successfully", data: updateAudi }

  } catch (error) {

    console.error("Error in acceptAuditorium service:", error)

    return { status: false, message: "Something went wrong while updating auditorium" }

  }
}


 async AllUsers(){

  return await this.adminRepositories.findAllUser()

 }

 async allvendorusers(){

  return await this.adminRepositories.findAllVendor()

 }

 async allEnquires(){

  return await this.adminRepositories.allEnquires()

 }

  async allAuditoriumBookings(){

  return await this.adminRepositories.findAllAuditoriumBookings()

 }


 //###################  staff ################

 async addAdminStaff(data: IAdminStaff) {

 
    const existing = await this.adminRepositories.findByEmail(data.email);
    console.log(existing,'eixt')
    if (existing) {
      return { success: false, message: "Email already registered" };
    }

    const newStaff = {
      staffid: data.staffid,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    };

   

    const createdStaff = await this.adminRepositories.createAdminStaff(newStaff)
    console.log(createdStaff,'jope')
    return { success: true, message: "Admin staff added successfully", data: createdStaff };
  }


  async fetchAllAdminStaff(){

    return await this.adminRepositories.allAdminStaff()

  }
async updateAdminStaff(id: string, data: Partial<IAdminStaff>) {
    const staff = await this.adminRepositories.findStaffByStaffId(id);

    if (!staff) {
      return { success: false, message: "Staff not found" };
    }

    const newStaff = {
      staffid: data.staffid,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    };

    const updatedStaff = await this.adminRepositories.updateAdminStaff(id, newStaff);

    if (!updatedStaff) {
      return { success: false, message: "Failed to update admin staff" };
    }

    return { success: true, message: "Updated successfully", data: updatedStaff };
  }

   async deleteAdminStaff(staffid: string) {
    const staff = await this.adminRepositories.findStaffByStaffId(staffid);

    if (!staff) {
      return { success: false, message: "Staff not found" };
    }

    await this.adminRepositories.deleteAdminStaff(staffid);

    return { success: true, message: "Staff deleted successfully" };
  }


  //################## SUBSCRIPTION ###################

  async createSubscription(data: Partial<ISubscription>): Promise<ISubscription> {
    const existingPlans = await this.adminRepositories.findAll();
    if (
      existingPlans.some(
        (plan) => plan.planName.toLowerCase() === data.planName?.toLowerCase()
      )
    ) {
      throw new Error("A plan with this name already exists.");
    }

    return await this.adminRepositories.createSubscription(data);
  }

  async getAllSubscriptions(): Promise<ISubscription[]> {
    return await this.adminRepositories.findAll();
  }

  
  async getSubscriptionById(id: string): Promise<ISubscription | null> {
    return await this.adminRepositories.findById(id);
  }

  
  async updateSubscription(
    id: string,
    data: Partial<ISubscription>
  ): Promise<ISubscription | null> {
    const existingPlan = await this.adminRepositories.findById(id);
    if (!existingPlan) {
      throw new Error("Subscription plan not found.");
    }
      
    return await this.adminRepositories.updateSubscription(id, data);
  }

  
  async deleteSubscription(id: string): Promise<void> {
    const plan = await this.adminRepositories.findById(id);
    if (!plan) {
      throw new Error("Subscription plan not found.");
    }
    await this.adminRepositories.deleteById(id);
  }


  async adminLogin(data: any) {
    try {
      const { loginMode, email, password, staffid } = data;

    
      if (loginMode === "admin") {
        if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
          const payload = {
            id: "default_admin",
            role: "superadmin",
            email: DEFAULT_ADMIN.email,
          };

          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);

          return {
            success: true,
            message: "Admin logged in successfully!",
            accessToken,
            refreshToken,
            user: payload,
          };
        } else {
          return { success: false, message: "Invalid admin credentials" };
        }
      }

      const existingStaff = await AdminStaffModel.findOne({ staffid, email });

      if (!existingStaff) {
        return { success: false, message: "Staff not found" };
      }

      if (password !==existingStaff.password) {
        return { success: false, message: "Incorrect password" };
      }

      if (!existingStaff.isActive) {
        return { success: false, message: "Your account is inactive. Please contact admin." };
      }

      const payload = {
        id: existingStaff._id,
        staffid: existingStaff.staffid,
        role: existingStaff.role,
        email: existingStaff.email,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return {
        success: true,
        message: "Staff logged in successfully!",
        accessToken,
        refreshToken,
        user: payload,
      };
    } catch (error) {
      console.error("Error in adminService.adminLogin:", error);
      return { success: false, message: "Internal server error" };
    }
  }


    async addItem(type: string, name: string) {
    const validTypes = ["events", "locations", "amenities","vendorTypes"];
    if (!validTypes.includes(type)) {
      throw new Error("Invalid item type");
    }

    const result = await this.adminRepositories.addItem(type, name);
    return result;
  }


    async getAllItems() {
    let data = await this.adminRepositories.getAllItems();
    if (!data) {
      
      data = await this.adminRepositories.createAdminItem();
    }
    return data;
  }

  async updateItem(type: string, oldName: string, newName: string) {
    const validTypes = ["events", "locations", "amenities","vendorTypes"];
    if (!validTypes.includes(type)) throw new Error("Invalid item type");
    return await this.adminRepositories.updateItem(type, oldName, newName);
  }

  async deleteItem(type: string, itemName: string) {
    const adminItem = await this.adminRepositories.getAdminItem();

    // Ensure valid type
    if (!Array.isArray(adminItem[type as keyof typeof adminItem])) {
      throw new Error(`Invalid type: ${type}`);
    }

    const typeArray = adminItem[type as keyof typeof adminItem] as string[];

    // Check if item exists
    const itemIndex = typeArray.findIndex(
      (item) => item.toLowerCase() === itemName.toLowerCase()
    );

    if (itemIndex === -1) {
      throw new Error(`${itemName} not found in ${type}`);
    }

    // Remove item from array
    typeArray.splice(itemIndex, 1);

    const updatedItem = await this.adminRepositories.saveAdminItem(adminItem);
    return updatedItem;
  }



}


export default AdminService