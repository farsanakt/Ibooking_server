import { IStaff, StaffModel } from "../../models/auditorium/staffModel";



export class StaffRepository {
  async createStaff(data: Partial<IStaff>): Promise<IStaff> {
    return await StaffModel.create(data);
  }

  async findByEmail(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }

  async findAllStaff():Promise<IStaff[]|null>{
    
    return await StaffModel.find()

  }

}
