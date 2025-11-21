
import bcrypt from "bcryptjs";
import { StaffRepository } from "../../repositories/implemention/StaffRepositories";
import { IStaff, StaffModel } from "../../models/auditorium/staffModel";

export class StaffService {
  private staffRepo: StaffRepository;

  constructor() {
    this.staffRepo = new StaffRepository();
  }

  private async generateUniqueStaffId(name: string): Promise<string> {
    const prefix = name.substring(0, 4).toLowerCase();

    while (true) {
      const randomNumber = Math.floor(100 + Math.random() * 900);
      const staffId = `${prefix}${randomNumber}`;

      const exists = await StaffModel.findOne({ staffId });
      if (!exists) return staffId;
    }
  }

   async addStaff(data: Partial<IStaff>): Promise<IStaff> {
  
    const existing = await this.staffRepo.findByEmail(data.email!)

    if (existing) throw new Error("Email already registered")

    const staffId = await this.generateUniqueStaffId(data.name!)

    data.staffId = staffId

  
    const hashedPassword = await bcrypt.hash(data.password!, 10)
    
    data.password = hashedPassword

    return this.staffRepo.createStaff(data);
  }

  async getAllStaff(){

    try {

        return await this.staffRepo.findAllStaff()
        
    } catch (error) {
        
    }

  }

  async updateStaff(id: string, data: Partial<IStaff>): Promise<IStaff | null> {
    
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await this.staffRepo.updateStaff(id, data);
  }

   async deleteStaff(id: string): Promise<IStaff | null> {
    return await this.staffRepo.deleteStaff(id);
  }

}
