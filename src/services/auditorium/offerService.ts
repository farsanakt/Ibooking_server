import { IOffer } from "../../models/auditorium/offerModel";
import { OfferRepository } from "../../repositories/implemention/OfferRepositories";


export class OfferService {
  private offerRepo: OfferRepository;

  constructor() {
    this.offerRepo = new OfferRepository();
  }

  async createOffer(data: Partial<IOffer>): Promise<IOffer> {
  
    const existingOffer = await this.offerRepo.findActiveOfferByUser(data.userId!);
    if (existingOffer) {
      throw new Error("User already has an active offer");
    }

  
    return this.offerRepo.createOffer(data);
  }


  async getUserOffers(userId: string): Promise<IOffer[]> {
    return this.offerRepo.findOffersByUser(userId);
  }

  async updateOffer(id: string, data: Partial<IOffer>): Promise<IOffer | null> {
    return this.offerRepo.updateOffer(id, data);
  }

  async deleteOffer(id: string): Promise<IOffer | null> {
    return this.offerRepo.deleteOffer(id);
  }

}
