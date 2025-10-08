import { IAdminStaff } from "../../models/admin/adminStaffModel";
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

    console.log(id,'this id')

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

    console.log(id,'this id')

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

    console.log(id,'this id')

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

    console.log(id,'this id')

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


 //###################  staff ################

 async addAdminStaff(data: IAdminStaff) {
    const existing = await this.adminRepositories.findByEmail(data.email);
    if (existing) {
      return { success: false, message: "Email already registered" };
    }

    const newStaff = {
      staffid: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    };

    console.log(newStaff,'new stafff')

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

    const updatedStaff = await this.adminRepositories.updateAdminStaff(id, data);

    if (!updatedStaff) {
      return { success: false, message: "Failed to update admin staff" };
    }

    return { success: true, message: "Updated successfully", data: updatedStaff };
  }


}


export default AdminService