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

          // const existingMakeUp=await this.auditoriumRepositories.findMakeUpByName(data.name)

          if (existingVenue) {

          return {success:false,message:'This is venue is already existed'}

          }

          console.log(data.totalamount,'lp')

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
            totalamount:data.totalamount,
            advAmnt:data.advAmnt,
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

      async deleteVenue(id: string): Promise<{ status: boolean; message: string }> {

      try {
        const deletedVenue = await this.auditoriumRepositories.deleteVenueById(id)


        if (!deletedVenue) {

          return { status: false, message: 'Venue not found or already deleted.' }

        }

        return { status: true, message: 'Venue successfully deleted.' }


      } catch (error) {
        console.error("Error deleting venue:", error)


        return { status: false, message: 'An error occurred while deleting the venue.' }
      }
    }

     async upcomingEvents(id:string){

      try {

        const auditorium=await this.auditoriumRepositories.findAudiById(id)

        const auditoriumName=auditorium?.auditoriumName

        const events=await this.auditoriumRepositories.findEventsById(id)

        console.log(events,'events')

        return {events,auditoriumName}
        
      } catch (error) {
        
      }

     }

     async existingBookings(id:string){

      try {

        const existingBok=await this.auditoriumRepositories.findBookingsByAuditoriumId(id)

        return existingBok
        
      } catch (error) {
        
      }

     }

     async checkUserExist(email:string){

      try {

        const existingUser=await this.auditoriumRepositories.findUser(email)

        if(!existingUser){

          return {success:false,message:'user Not found,Create new account'}

        }

        return {success:true,message:'user Found'}
        
      } catch (error) {
        
      }

     }
   
     async userDetails(email:string){

      try {

        const user=await this.auditoriumRepositories.findUser(email)

        return user
        
      } catch (error) {
        
        console.log(error)

      }

     }

     async findAuditoriumUser(id:string){

      try {

        return this.auditoriumRepositories.findAudiById(id)

        
        
      } catch (error) {
        
      }

     }

     async verifyPassword(id:string,password:string){

      try {

        const user=await this.auditoriumRepositories.findAudiById(id)

        console.log(user)

        if(!user){

          return {success:false,message:'user not found'}

        }

        if(user.password == password){


          return {success:true,message:'Password verified successfully'}

        }else{

          return {success:false,message:'invalid password'}

        }
        
      } catch (error) {
        
      }

     }
 
     

}