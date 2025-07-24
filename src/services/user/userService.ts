
import { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import { IVenue } from "../../models/auditorium/venueModel";
import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories";

interface EnrichedVenue {
  images: string;
  auditorium: IAuditoriumUser | undefined;
}
export  class UserService{

private auditoriumRepositories:AuditoriumRepositories

constructor(){

    this.auditoriumRepositories=new AuditoriumRepositories()

}


    async findAuditorium(event: string, place: string) {
      try {
        
        const auditoriums = await this.auditoriumRepositories.findAuditorium(event, place);

        const enrichedVenues: EnrichedVenue[] = [];

        
        for (const auditorium of auditoriums) {
          
          const venues = await this.auditoriumRepositories.findVenuesByAuditoriumIds([auditorium._id]);

          if (venues.length > 0) {
            const oneVenue = venues[0]

            
            enrichedVenues.push({
              auditorium,
              images: oneVenue.images
            });
          }
        }

        
        return enrichedVenues;
      } catch (error) {
        throw error;
      }
    }


    async findVenues(id:string){

      try {

        const venues=await this.auditoriumRepositories.findVenuesById(id)

        
        return venues

        
      } catch (error) {
        
      }

    }

    async findVenueDetails(id:string){

      try {

        const venuDetails=await this.auditoriumRepositories.findVenueDetailsById(id)

        return venuDetails
        
      } catch (error) {
        
      }

    }





}
