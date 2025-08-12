
import { rmSync } from "fs";
import { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import { IVenue } from "../../models/auditorium/venueModel";
import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories";
import { MailService } from '../MailService'// adjust path as needed

interface EnrichedVenue {
  images: string;
  auditorium: IAuditoriumUser | undefined;
}


const mailService = new MailService();




export  class UserService{

private auditoriumRepositories:AuditoriumRepositories
private mailService: MailService;

constructor(){

    this.auditoriumRepositories=new AuditoriumRepositories()
    this.mailService = new MailService()

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


  async createBookings(data: any) {

  try {

    const m=await this.auditoriumRepositories.updateVenueSlot(data.timeSlot);

    const venue = await this.auditoriumRepositories.findVenueById(data.venueId);

    let auditoriumEmail = ''

    if (venue) {

      const auditorium = await this.auditoriumRepositories.findAuditoriumById(venue.audiUserId)

      if (auditorium) {

        auditoriumEmail = auditorium.email

      }
    }

    const booking = await this.auditoriumRepositories.createBooking({
      userEmail: data.userEmail,
      venueName: data.venueName,
      bookeddate: data.bookedDate,
      timeSlot: data.timeSlot,
      totalAmount: data.totalAmount ,
      paidAmount: data.paidAmount || data.balanceAmount,
      balanceAmount:data.balanceAmount,
      address:data.address,
      venueId: data.venueId,
      auditoriumId:venue?.audiUserId,
      paymentStatus: 'pending',
    });

     if (!booking) {
      return { status: false, message: 'Booking creation failed.' };
    }


    if (booking) {

      
      await this.mailService.sendMail({
        to: data.userEmail,
        subject: 'Booking Confirmation - Your Slot is Reserved',
        html: `<p>Dear user,</p><p>Your booking for ${data.venueName} on ${data.bookingDate} at ${data.timeSlot} is confirmed.</p><p>Thank you!</p>`
      });

      // Step 2: Send confirmation to auditorium
      if (auditoriumEmail) {
        await this.mailService.sendMail({
          to: auditoriumEmail,
          subject: 'New Booking Received',
          html: `<p>Dear Auditorium Owner,</p><p>You have received a new booking for ${data.venueName} on ${data.bookingDate} at ${data.timeSlot}.</p><p>Please prepare accordingly.</p>`
        });
      }
    }

    return {status:true,message:'booking confirmed'}

  } catch (error) {
    
    console.error("Error in booking creation or email sending:", error);
  }
}

async createVendorBookings(data:any) {
  try {
    
    if (!data.vendorId || !data.userEmail || !data.vendorName || !data.bookedDate || !data.timeSlot || !data.totalAmount || !data.paidAmount || !data.balanceAmount || !data.address || !data.paymentMethod || !data.paymentType || !data.advanceAmount) {
      return { status: false, message: 'Missing required fields.' };
    }

   
    const vendor = await this.auditoriumRepositories.findVendorById(data.vendorId);
    if (!vendor) {
      return { status: false, message: 'Vendor not found.' };
    }

   
    const booking = await this.auditoriumRepositories.createVendorBooking({
      userEmail: data.userEmail,
      vendorName: data.vendorName,
      vendorId: data.vendorId,
      totalAmount: data.totalAmount,
      advanceAmount: data.advanceAmount,
      paidAmount: data.paidAmount,
      balanceAmount: data.balanceAmount,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: data.paymentMethod,
      paymentType: data.paymentType,
      bookeddate: data.bookedDate,
      timeSlot: data.timeSlot,
      address: data.address,
    });

    if (!booking) {
      return { status: false, message: 'Booking creation failed.' };
    }

    
    await this.mailService.sendMail({
      to: data.userEmail,
      subject: 'Booking Confirmation - Your Slot is Reserved',
      html: `<p>Dear user,</p><p>Your booking for ${data.vendorName} on ${data.bookedDate} at ${data.timeSlot} is confirmed.</p><p>Thank you!</p>`
    });

    
    if (vendor.email) {
      await this.mailService.sendMail({
        to: vendor.email,
        subject: 'New Booking Received',
        html: `<p>Dear Vendor,</p><p>You have received a new booking for ${data.vendorName} on ${data.bookedDate} at ${data.timeSlot}.</p><p>Please prepare accordingly.</p>`
      });
    }

    return { status: true, message: 'Booking confirmed' };
  } catch (error) {
    console.error("Error in booking creation or email sending:", error);
    return { status: false, message: 'An error occurred while processing the booking.' };
  }
}

  async fechingExistingBookings(id:string){

    try {

      const extBkngs=await this.auditoriumRepositories.findBookingsByVenueId(id)

      return extBkngs
      
    } catch (error) {
      
    }

  }

    async existingVendorBookings(id:string){

    try {

      const extBkngs=await this.auditoriumRepositories.findVendorBookingsByVenueId(id)

      return extBkngs
      
    } catch (error) {
      
    }

  }

  async allVenues(){

    try {

      return await this.auditoriumRepositories.AllVenues()
      
    } catch (error) {
      
    }

  }

  async allVendors(){

    try {

      return await this.auditoriumRepositories.allVendors()
      
    } catch (error) {
      
    }

  }


async singleVendor(id:string){

    try {

      return await this.auditoriumRepositories.findSingleVendorById(id)
      
    } catch (error) {
      
    }

  }



}
