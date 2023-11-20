import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";




// {
//     "id": 1,
//      "name": "Sashimi salad",
//      "price": 12.00,
//      "image": "sashimi-salad.jpg",
//      "category": "Cold starters",
//      "description": "Organic greens topped with market fresh sashimi, wasabi soy vinaigrette.",
//      "featured": true
// },






const menuProductSchema = new mongoose.Schema({
    id: {type:String},
    name: {
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
    },
    featured:{
        type:Boolean,
    }

});


//middleware before saving in Database 
menuProductSchema.pre('save', async function (next) {
 
    this.id = uuidv4();
    
});

const menuProducts = new mongoose.model('Menu',menuProductSchema); 


export  {menuProducts }; 
