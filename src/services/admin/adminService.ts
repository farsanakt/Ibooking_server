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

    const totalUsers = allUsers?.length

    const totalVendors = allVendors?.length

    const totalAuditorium = allAuditorium?.length

    return {status: true, data: { totalUsers, totalVendors,totalAuditorium,  },}

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


}


export default AdminService