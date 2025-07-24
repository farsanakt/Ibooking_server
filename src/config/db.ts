import mongoose  from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectMonogoDb=async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_URL!)

        console.log('connected')
        
    } catch (error) {
        console.log('error in connecting db')
        
    }

}

export default connectMonogoDb