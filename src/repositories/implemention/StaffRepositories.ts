import { IStaff, StaffModel } from "../../models/auditorium/staffModel";



export class StaffRepository {
  async createStaff(data: Partial<IStaff>): Promise<IStaff> {
    return await StaffModel.create(data);
  }

  async findByEmail(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }

  async findAllStaff(id:string):Promise<IStaff[]|null>{
    
    return await StaffModel.find({audiUserId:id})

  }

  async updateStaff(id: string, data: Partial<IStaff>): Promise<IStaff | null> {
    return await StaffModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteStaff(id: string): Promise<IStaff | null> {
    return await StaffModel.findByIdAndDelete(id);
  }

}
