import AuditoriumUser,{ IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import Venue, { IVenue } from "../../models/auditorium/venueModel";
import Booking from "../../models/auditorium/bookingModel";

export class AuditoriumRepositories{

    async createUser(data:any):Promise<IAuditoriumUser|null>{
       return await AuditoriumUser.create(data)
    }

    async findUserByEmail(email:string):Promise<IAuditoriumUser |null>{
        return await AuditoriumUser.findOne({email:email})
    }

    async findUserByOwnerName(ownername:string):Promise<IAuditoriumUser| null>{

        return await AuditoriumUser.findOne({ownerName:ownername})

    }

    async createVenue(data:any):Promise<IVenue|null>{

        return await Venue.create(data)

    }

    async getAllVenues(audiUserId:string):Promise<IVenue[]|null>{

        return await Venue.find({audiUserId:audiUserId})
    }

    async findVenueById(id: string): Promise<IVenue | null> {
    return await Venue.findById(id);
   }

    async updateVenue(id: string, data: Partial<IVenue>): Promise<IVenue | null> {
        return await Venue.findByIdAndUpdate(id, data, { new: true });
    }

    async findVenueByName(data:any){
        return await Venue.findOne({name:data.name})
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



}