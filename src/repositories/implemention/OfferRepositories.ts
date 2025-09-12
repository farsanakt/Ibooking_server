import { IOffer, OfferModel } from "../../models/auditorium/offerModel";

export class OfferRepository {
  async findActiveOfferByUser(userId: string): Promise<IOffer | null> {
    return OfferModel.findOne({ userId, isActive: true });
  }

  async createOffer(data: Partial<IOffer>): Promise<IOffer> {
    const offer = new OfferModel(data);
    return offer.save();
  }

   async findOffersByUser(userId: string): Promise<IOffer[]> {
    return OfferModel.find({ userId }).sort({ createdAt: -1 })
  }

}

  
 
