import mongoose from "mongoose";
import {v1 as uuidv1} from "uuid";
import { orderNumberGen } from "../utils/generators.js";

const orderSchema =   mongoose.Schema({
    user: {
        type:String,
        required:true  
    },
    order_id: {
        type:String, 
    },
    totalPrice: {
        type:Number,
        required:true  
    },
    order: {
        type:Array,
        required:true  
    },
    status: {
        type:String, 
    },
    orderNumber: {
        type:String
    } 
}, {timestamps:true});


//middleware to create order id and date
orderSchema.pre("save", async function (next) {
    try {
        this.order_id = uuidv1();
        this.orderNumber = orderNumberGen(10);
        this.status = "pending";
        next();
    } catch (error) {
        next(error);
    }
});

export const Order = mongoose.model("Order", orderSchema);

