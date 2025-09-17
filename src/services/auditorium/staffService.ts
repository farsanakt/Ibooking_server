
import bcrypt from "bcryptjs";
import { StaffRepository } from "../../repositories/implemention/StaffRepositories";
import { IStaff } from "../../models/auditorium/staffModel";

export class StaffService {
  private staffRepo: StaffRepository;

  constructor() {
    this.staffRepo = new StaffRepository();
  }

  async addStaff(data: Partial<IStaff>): Promise<IStaff> {
  
    const existing = await this.staffRepo.findByEmail(data.email!);
    if (existing) {
      throw new Error("Email already registered");
    }

    
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    data.password = hashedPassword;

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

}
