import AuditoriumUser,{ IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import Venue, { IVenue } from "../../models/auditorium/venueModel";
import Booking, { IBooking } from "../../models/auditorium/bookingModel";
import bookingModel from "../../models/auditorium/bookingModel";
import userModel, { IUser } from "../../models/user/userModel";
// import vendorModel, { Ivendor } from "../../models/auditorium/vendorModel";
import vendorBookingModel, { IVendorBooking } from "../../models/user/vendorBookingModel";
import vendorModel, { IVendor } from "../../models/vendor/vendorModel";
import Enquiry, { IEnquiry } from "../../models/vendor/vendorEnquiry";
import BrideGroom from '../../models/auditorium/brideGroomModel'
import mongoose from "mongoose";
import vendorUser, { IVendorUser } from "../../models/vendor/vendorUser";
import { IVoucher, VoucherModel } from "../../models/vendor/voucherModel";
import auditoriumUserModel from "../../models/auditorium/auditoriumUserModel";


export class AuditoriumRepositories{

    async createUser(data:any):Promise<IAuditoriumUser|null>{
       return await AuditoriumUser.create(data)
    }

   
 
      async findAllVoucher(id:string):Promise<IVoucher[]|null>{
         return VoucherModel.find({userId:id})
       }

         async AllVoucher():Promise<IVoucher[]|null>{
         return VoucherModel.find()
       }


       async findActiveVoucherByUser(userId: string): Promise<IVoucher | null> {
           return VoucherModel.findOne({ userId, isActive: true });
         }

        
       async findAuditoriumByName(name:string):Promise<IAuditoriumUser|null>{

        return AuditoriumUser.findOne({auditoriumName:name})

       }  
       
         async createVoucher(data: Partial<IVoucher>): Promise<IVoucher> {
           const offer = new VoucherModel(data);
           return offer.save();
         }

          async updateVoucher(id: string, data: Partial<IVoucher>): Promise<IVoucher | null> {
             return VoucherModel.findByIdAndUpdate(id, data, { new: true });
           }
         
           async deleteVoucher(id: string): Promise<IVoucher | null> {
             return VoucherModel.findByIdAndDelete(id);
           }

          async updateVoucherLimit(code: string): Promise<IVoucher | null> {
            return VoucherModel.findOneAndUpdate(
                { voucherCode: code, limit: { $gt: 0 } },  
                { $inc: { limit: -1 } },
                { new: true }
            );
            }
   

    async findUserByEmail(email:string):Promise<IAuditoriumUser |null>{
        return await AuditoriumUser.findOne({email:email})
    }

     async UpdatePassword(email:string,field:string,value:any) :Promise<IUser | null>{
        const update={$set:{[field]:value}}
        return await auditoriumUserModel.findOneAndUpdate({email},update,{new:true})
    }

    async verifyUser(email: string, isOtp: boolean): Promise<IUser | null> {
       
        await auditoriumUserModel.updateOne({ email }, { isOtp });
        return await auditoriumUserModel.findOne({ email });
    }
    
    async findUser(email:string):Promise<IUser |null>{
        return await userModel.findOne({email:email})
    }



    async findUserByOwnerName(ownername:string):Promise<IAuditoriumUser| null>{

        return await AuditoriumUser.findOne({ownerName:ownername})

    }

    async createBrideGroom(data: any): Promise<any | null> {
    return await BrideGroom.create(data);
    }

  
    async findBrideGroomByEmail(email: string): Promise<any | null> {
        return await BrideGroom.findOne({ email });
    }

    async createVenue(data:any):Promise<IVenue|null>{

        return await Venue.create(data)

    }

     async createEnquiry (enquiryData: Partial<IEnquiry>): Promise<IEnquiry>{
     const enquiry = new Enquiry(enquiryData);
     return await enquiry.save();
    };

    

    async createVendor(data:any):Promise<IVendor|null>{
        return await vendorModel.create(data)
    }

    async getAllVenues(audiUserId:string):Promise<IVenue[]|null>{

        return await Venue.find({audiUserId:audiUserId})
    }

    async findVenueById(id: string): Promise<IVenue | null> {
    return await Venue.findById(id);
   }

     async findVendorById(id: string): Promise<IVendor | null> {
    return await vendorModel.findById(id);
   }

   async findVendorUserById(id:mongoose.Types.ObjectId):Promise<IVendor|null>{

    return await vendorModel.findOne({_id:id})

   }

   async findVenUserById(id:string):Promise<IVendor|null>{

    return await vendorUser.findOne({_id:id})

   }

   async getAllExistingVendor(id:string):Promise<IVendor[]|null>{

    return await vendorModel.find({vendorUserId:id})

   }

    async updateVenue(id: string, data: Partial<IVenue>): Promise<IVenue | null> {
        return await Venue.findByIdAndUpdate(id, data, { new: true });
    }

    async findVenueByName(data:any){
        return await Venue.findOne({name:data.name})
    }

      async findMakeUpByName(data:any){
        return await vendorModel.findOne({name:data.name})
    }

    async findAuditoriumById(id:any){
        const audi=await AuditoriumUser.findById({_id:id})

        return audi?.email
    }

    async findAudiById(id:any){
        const audi=await AuditoriumUser.findById({_id:id})

        return audi
    }

    async findEventsById(id:string):Promise<IBooking[]|null>{

        return await Booking.find({auditoriumId:id,status:'pending'})

    }

    async findBookingsByAuditoriumId(id:string):Promise<IBooking[]|null>{

        return await Booking.find({auditoriumId:id})

    }

    async findAuditorium(event: string, place: string): Promise<IAuditoriumUser[] | null> {

        try {
            
            if (!event || !place) {
            throw new Error('Event and place must be non-empty strings');
            }

           
            const normalizedEvent = event.trim().toLowerCase();
            const normalizedPlace = place.trim().toLowerCase();

        
            const eventRegex = new RegExp(`^${normalizedEvent}$`, 'i');
            const placeRegex = new RegExp(`^${normalizedPlace}$`, 'i');
           

            const query = {
            events: { $in: [eventRegex] },
            locations: { $in: [placeRegex] }
            };


            const result = await AuditoriumUser.find(query)
       
            console.log(result,'result')
            
            return result
        } catch (error) {
            console.error("Repository Error: Failed to find auditoriums", error);
            throw error;
        }
        }


     async findVenuesByAuditoriumIds(auditoriumIds: string): Promise<IVenue[]> {
    try {
      const venues = await Venue.find({
        audiUserId: { $in: auditoriumIds },
      });

      return venues;
    } catch (error) {
      throw new Error(`Failed to find venues: ${error}`);
    }
     }


     async findVenuesById(id:string):Promise<IVenue[]>{

        return await Venue.find({audiUserId:id})

     }

     async findVenueDetailsById(id:string):Promise<IVenue | null>{

      return await Venue.findOne({_id:id})

     }

   async updateVenueSlot(slot: string): Promise<IVenue | null> {

    return await Venue.findOneAndUpdate(

        { "timeSlots.id": slot },

        { $set: { "timeSlots.$.status": "booked" } },

        { new: true } 
    );
    }

    
    createBooking=async(bookingData:any)=>{
        const newBooking=new Booking(bookingData)
        return await newBooking.save()
    }

    createVendorBooking=async(data:any)=>{

        const newBooking=new vendorBookingModel(data)

        return await newBooking.save()

    }

    async findBookingsByVenueId(id:string):Promise<IBooking[]|null>{
        return await bookingModel.find({venueId:id})
    }

    async findEnquiryByVendorId(id: string): Promise<IEnquiry[] | null> {
        
  return await Enquiry.find({ vendorUserId: new mongoose.Types.ObjectId(id) });
}

    async findVendorBookingsByVenueId(id:string):Promise<IVendorBooking[]|null>{

        return await vendorBookingModel.find({vendorId:id})

    }

    async AllVenues():Promise<IVenue[]|null>{

        return await Venue.find()

    }

    async allVendors():Promise<IVendor[]|null>{

        return await vendorModel.find()

    }

    async findUserBookingsByEmail(email:string):Promise<IBooking[]|null>{

        return await bookingModel.find({userEmail:email})

    }

     async findSingleVendorById(id:string):Promise<IVendor|null>{

        return await vendorModel.findOne({_id:id})

    }

    async deleteVenueById(id: string) {

    return await Venue.findByIdAndDelete(id); 
    
    }



}