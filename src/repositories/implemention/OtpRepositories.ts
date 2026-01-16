import Otp, { IOtp } from "../../models/auditorium/otpModel";
import { BaseRepository } from "../implemention/BaseRepositories";

export class OtpRepository extends BaseRepository<IOtp> {
  constructor() {
    super(Otp);
  }

  async createOtp(data: IOtp): Promise<IOtp> {
    return await this.model.create(data);
  }

  async findOtp(email: string, phone: string): Promise<IOtp | null> {
    return await this.model.findOne({ email, phone });
  }

  async deleteOtp(email: string, phone: string): Promise<void> {
    await this.model.deleteOne({ email, phone });
  }
}
