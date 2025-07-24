import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories";


export class AuditoriumService{

private auditoriumRepositories:AuditoriumRepositories

constructor(){

    this.auditoriumRepositories=new AuditoriumRepositories()

}

      async  addVenue(data: any) {

        console.log(data.audiUserId,'ideeee')

        try {

          const existingVenue = await this.auditoriumRepositories.findVenueByName(data.name);

          if (existingVenue) {

          return {success:false,message:'This is venue is already existed'}

          }

          const savedVenue = await this.auditoriumRepositories.createVenue({
            name: data.name,
            address: data.address,
            audiUserId:data.audiUserId,
            phone: data.phone,
            altPhone: data.altPhone,
            email: data.email,
            pincode: data.pincode,
            cities: data.cities,
            acType: data.acType,
            seatingCapacity: data.seatingCapacity,
            diningCapacity: data.diningCapacity,
            parkingSlots: data.parkingSlots,
            changingRooms: data.changingRooms,
            amenities: data.amenities,
            foodPolicy: data.foodPolicy,
            decorPolicy: data.decorPolicy,
            tariff: data.tariff,
            cancellationPolicy: data.cancellationPolicy,
            stageSize: data.stageSize,
            images: data.images,
            timeSlots: data.timeSlots,
          
          })
            
          return {success:true,message:'venue added succefully..!'}

        } catch (error) {

          throw new Error('Service Error: ' + (error instanceof Error ? error.message : 'Unknown error'))

        }
      }

      async allVenues(audiUserId:string){

        try {

          const allVenues=await this.auditoriumRepositories.getAllVenues(audiUserId)

          return allVenues
          
        } catch (error) {
          
        }
      }

      async updateVenues(data:any,id:string){

      try {
        
        const existingVenue=await this.auditoriumRepositories.findVenueById(id)

        if(!existingVenue){

          return {success:false,message:'Something went Wrong'}

        }

       const updatedVenue = await this.auditoriumRepositories.updateVenue(id, { ...data });

       console.log(updatedVenue,'th')

       if (!updatedVenue) {

        return { success: false, message: 'Failed to update venue' }

      }

      return { success: true, message: 'Venue updated successfully', venue: updatedVenue };

        
      } catch (error) {
        
      }

      }

}