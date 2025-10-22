import { IAdminStaff } from "../../models/admin/adminStaffModel";
import { ISubscription } from "../../models/admin/subscriptionModel";
import { AdminRepository } from "../../repositories/implemention/AdminRepository";

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

  async allAuditoriumBookings(){

  return await this.adminRepositories.findAllAuditoriumBookings()

 }


 //###################  staff ################

 async addAdminStaff(data: IAdminStaff) {

 
    const existing = await this.adminRepositories.findByEmail(data.email);
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

   

    const createdStaff = await this.adminRepositories.createAdminStaff(newStaff);
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


}


export default AdminService