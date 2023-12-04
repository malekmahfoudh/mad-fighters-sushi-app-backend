import { Order } from "../models/Order.js";
import { Products} from "../models/Products.js";





export const getMenu = async ()=> {
    //get all products from the database
    try {
        const products = await Products.find({}, {_id:0, __v:0});
        return products; 

    } catch (error) {
        console.error(error);
    }
  
}

//check if the product exists in DB, returns true or false 
export const isProductExists = async (productId)=> {
    const product = await Products.findOne({id:productId}); 
    return product ? true : false ;  
}

//get a product from the database based on the id 
export const getProductById =  async (productId) => {
    const product = await Products.findOne({id:productId},{_id:0, __v:0,updatedAt:0}); 
    return product ; 
}

//find order by order_id 
export const getOrderById = async (orderNumber) => {
    
    // get the order from the database and exclude the _id and __v fields
    const order = await Order.findOne({orderNumber:orderNumber},{_id:0, __v:0,updatedAt:0});
    return order;
}

//update the order in the database
export const updateOrder = async (orderNumber,orderUpdates) => {
    const order = await Order.updateOne({orderNumber:orderNumber},orderUpdates,{new:true});
    return order; 
}; 

export const deleteOrder = async (orderNumber) => {
    const order = await Order.deleteOne({orderNumber:orderNumber});
    return order; 
}