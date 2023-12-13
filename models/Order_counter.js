import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    type: {type:String},
    seq: { type: Number, default: 0 }
},{timestamps:true});



const Counter = new mongoose.model('Counter',counterSchema);


export {Counter};