import { Products} from "../models/Products.js";





export const getMenu = async ()=> {
    //get all products from the database
    try {
        const products = await Products.find({});
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