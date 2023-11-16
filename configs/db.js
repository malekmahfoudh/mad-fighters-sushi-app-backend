import mongoose from "mongoose";



//Database connection using mongoose module 
export const connectDb = async ()=> {
    const uri = process.env.DB_HOST;
    try {
        const connection = await  mongoose.connect(uri); 
        console.log(`connected on host ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

