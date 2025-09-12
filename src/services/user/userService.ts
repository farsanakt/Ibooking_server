
import { rmSync } from "fs";
import { IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import { IVenue } from "../../models/auditorium/venueModel";
import { AuditoriumRepositories } from "../../repositories/implemention/AuditoriumRepositories";
import { MailService } from '../MailService'// adjust path as needed
import { bookingConfirmationTemplate } from '../../utils/confirmation'
import { IEnquiry } from "../../models/vendor/vendorEnquiry";

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
    const m = await this.auditoriumRepositories.updateVenueSlot(data.timeSlot);

    const venue = await this.auditoriumRepositories.findVenueById(data.venueId);

    let auditoriumEmail = '';

    if (venue) {
      const auditorium = await this.auditoriumRepositories.findAuditoriumById(venue.audiUserId);
      if (auditorium) {
        auditoriumEmail = auditorium.email;
      }
    }

    const booking = await this.auditoriumRepositories.createBooking({
      userEmail: data.userEmail,
      venueName: data.venueName,
      bookeddate: data.bookedDate,
      timeSlot: data.timeSlot,
      totalAmount: data.totalAmount,
      paidAmount: data.paidAmount || data.balanceAmount,
      balanceAmount: data.balanceAmount,
      address: data.address,
      venueId: data.venueId,
      auditoriumId: venue?.audiUserId,
      paymentStatus: 'pending',
    });

    if (!booking) {
      return { status: false, message: 'Booking creation failed.' };
    }

    if (booking) {
      
      const userEmailContent = bookingConfirmationTemplate
        .replace('{{recipient}}', 'User')
        .replace('{{vendorName}}', data.venueName)
        .replace('{{bookedDate}}', data.bookedDate)
        .replace('{{timeSlot}}', data.timeSlot)
        .replace('{{message}}', 'Your booking is confirmed. Thank you for choosing our service!')
        .replace('{{header}}', 'Booking Confirmation - Your Slot is Reserved');

      
      await this.mailService.sendMail({
        to: data.userEmail,
        subject: 'Booking Confirmation - Your Slot is Reserved',
        html: userEmailContent,
      });

     
      if (auditoriumEmail) {
        const auditoriumEmailContent = bookingConfirmationTemplate
          .replace('{{recipient}}', 'Auditorium Owner')
          .replace('{{vendorName}}', data.venueName)
          .replace('{{bookedDate}}', data.bookedDate)
          .replace('{{timeSlot}}', data.timeSlot)
          .replace('{{message}}', 'You have received a new booking. Please prepare accordingly.')
          .replace('{{header}}', 'New Booking Received');

        
        await this.mailService.sendMail({
          to: auditoriumEmail,
          subject: 'New Booking Received',
          html: auditoriumEmailContent,
        });
      }
    }

    return { status: true, message: 'Booking confirmed' };
  } catch (error) {
    console.error("Error in booking creation or email sending:", error);
    return { status: false, message: 'An error occurred while processing the booking.' };
  }
}
    async  addVendor(data: any) {

        console.log(data.audiUserId,'ideeee')

        try {

          

          const existingMakeUp=await this.auditoriumRepositories.findMakeUpByName(data.name)

          if (existingMakeUp) {

          return {success:false,message:'This is vendor is already existed'}

          }

          console.log(data,'lp')

          const savedvendor = await this.auditoriumRepositories.createVendor({
            name: data.name,
            address: data.address,
            vndrUserId:data.userId,
            phone: data.phone,
            altPhone: data.altPhone,
            email: data.email,
            pincode: data.pincode,
            cities: data.cities,
            cancellationPolicy: data.cancellationPolicy,
            stageSize: data.stageSize,
            totalamount:data.totalAmount,
            advAmnt:data.advanceAmount,
            images: data.images,
            timeSlots: data.timeSlots,
            vendorType:data.vendorType
          
          })
            
          return {success:true,message:'venue added succefully..!'}

        } catch (error) {

          throw new Error('Service Error: ' + (error instanceof Error ? error.message : 'Unknown error'))

        }
      }

       async existingALlVendors(audiUserId:string){

        try {

          const allVenues=await this.auditoriumRepositories.getAllExistingVendor(audiUserId)

          return allVenues
          
        } catch (error) {
          
        }
      }



async createVendorEnquiry(data: Partial<IEnquiry>): Promise<any> {
  try {
    
    const enquiry = await this.auditoriumRepositories.createEnquiry(data);

    if (!enquiry) {
      return { status: false, message: "Enquiry creation failed." };
    }

   
    if (data.notification === "email") {
      
      const userEmailContent = bookingConfirmationTemplate
        .replace("{{recipient}}", data.name || "User")
        .replace("{{vendorName}}", enquiry.vendorId.toString()) // or fetch vendor name separately
        .replace("{{eventDate}}", enquiry.eventDate.toDateString())
        .replace("{{eventType}}", enquiry.eventType)
        .replace("{{message}}", "Your enquiry has been successfully submitted. We will get back to you soon.")
        .replace("{{header}}", "Enquiry Confirmation");

      await mailService.sendMail({
        to: data.email!,
        subject: "Your Enquiry Has Been Submitted",
        html: userEmailContent,
      });

      
      const vendor = await this.auditoriumRepositories.findVendorById(data.vendorId);
      if (vendor?.email) {
        const vendorEmailContent = bookingConfirmationTemplate
          .replace("{{recipient}}", "Vendor")
          .replace("{{vendorName}}", vendor.name || "Vendor")
          .replace("{{eventDate}}", enquiry.eventDate.toDateString())
          .replace("{{eventType}}", enquiry.eventType)
          .replace("{{message}}", `You have received a new enquiry from ${data.name}.`)
          .replace("{{header}}", "New Enquiry Received");

        await mailService.sendMail({
          to: vendor.email,
          subject: "New Enquiry Received",
          html: vendorEmailContent,
        });
      }
    }

    return { status: true, message: "Enquiry submitted successfully", data: enquiry };
  } catch (error: any) {
    console.error("Error creating enquiry:", error);
    return { status: false, message: "An error occurred while creating enquiry." };
  }
};






async createVendorBookings(data: any) {
  try {
    if (!data.vendorId || !data.userEmail || !data.vendorName || !data.bookedDate || !data.timeSlot || !data.totalAmount || !data.paidAmount || !data.address || !data.paymentMethod || !data.paymentType || !data.advanceAmount) {
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
      eventType:data.eventType,
    });

    console.log(booking, 'done');

    if (!booking) {
      return { status: false, message: 'Booking creation failed.' };
    }

    // Replace placeholders in the template for user email
    const userEmailContent = bookingConfirmationTemplate
      .replace('{{recipient}}', 'User')
      .replace('{{vendorName}}', data.vendorName)
      .replace('{{bookedDate}}', data.bookedDate)
      .replace('{{timeSlot}}', data.timeSlot)
      .replace('{{message}}', 'Your booking is confirmed. Thank you for choosing our service!')
      .replace('{{header}}', 'Booking Confirmation - Your Slot is Reserved');

    // Send email to user
    await this.mailService.sendMail({
      to: data.userEmail,
      subject: 'Booking Confirmation - Your Slot is Reserved',
      html: userEmailContent,
    });

    // Replace placeholders for vendor email
    if (vendor.email) {
      const vendorEmailContent = bookingConfirmationTemplate
        .replace('{{recipient}}', 'Vendor')
        .replace('{{vendorName}}', data.vendorName)
        .replace('{{bookedDate}}', data.bookedDate)
        .replace('{{timeSlot}}', data.timeSlot)
        .replace('{{message}}', 'You have received a new booking. Please prepare accordingly.')
        .replace('{{header}}', 'New Booking Received');

      // Send email to vendor
      await this.mailService.sendMail({
        to: vendor.email,
        subject: 'New Booking Received',
        html: vendorEmailContent,
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

  async fetchExistingBooking(email:string){
    
    try {

      return await this.auditoriumRepositories.findUserBookingsByEmail(email)
      
    } catch (error) {
      
    }

  }



}
