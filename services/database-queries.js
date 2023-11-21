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