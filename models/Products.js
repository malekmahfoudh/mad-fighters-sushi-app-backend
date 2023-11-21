import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";




// {
//     "id": 1,
//     "title": "Onigiri",
//     "price": 40,
//     "image": "mat.svg",
//     "category": "starters",
//     "description": "Japanese rice ball filled with salmon, wrapped in nori.",
//     "vegetarian": false,
//     "featured": false,
//     "info": {
//         "quantity": 1,
//         "allergy": "Gluten free",
//         "spice": "Mild"
//     }
// },





const menuProductSchema = new mongoose.Schema({
    id: {type:String},
    title: {
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    price:{
        type:Number,
        required:true,
        minLength:3,
        maxLength:4
    },
    image: {
        type:String,
    },
    category: {
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
    },
    vegetarian:{
        type:Boolean,
    },
    info: {
        quantity: Number,
        allergy: String,
        spice: String
    }
    });


//middleware before saving in Database 
menuProductSchema.pre('save', async function (next) {
    this.id = uuidv4();
    
});

const Products = new mongoose.model('Menu',menuProductSchema); 


export  {Products}; 
