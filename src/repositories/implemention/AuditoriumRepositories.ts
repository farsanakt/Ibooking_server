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


export class AuditoriumRepositories{

    async createUser(data:any):Promise<IAuditoriumUser|null>{
       return await AuditoriumUser.create(data)
    }

   
 

   

    async findUserByEmail(email:string):Promise<IAuditoriumUser |null>{
        return await AuditoriumUser.findOne({email:email})
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

     async findVendorById(id: string): Promise<IVenue | null> {
    return await vendorModel.findById(id);
   }

   async getAllExistingVendor(id:string):Promise<IVendor[]|null>{

    return await vendorModel.find({vndrUserId:id})

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

            // console.log('Query:', JSON.stringify(query, (key, value) => {
            // if (value instanceof RegExp) return value.toString();
            // return value;
            // }, 2));

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

    async findVendorBookingsByVenueId(id:string):Promise<IVendorBooking[]|null>{

        return await vendorBookingModel.find({vendorId:id})

    }

    async AllVenues():Promise<IVenue[]|null>{

        return await Venue.find()

    }

    async allVendors():Promise<IVendor[]|null>{

        return await vendorModel.find()

    }

     async findSingleVendorById(id:string):Promise<IVendor|null>{

        return await vendorModel.findOne({_id:id})

    }

    async deleteVenueById(id: string) {

    return await Venue.findByIdAndDelete(id); 
    
    }



}