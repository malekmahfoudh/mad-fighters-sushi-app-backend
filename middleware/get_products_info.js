import { getProductById } from "../services/database-queries.js";

//bring the products info from the database and push it to the order in the request. 
export const getOrderProductsInfo = async (req, res, next) => {
    const order = req.body.order; //array of ids  
    
    //make new Copy of the order with all product info from db 
    const newOrder = await Promise.all(order.map(async product => {
        return await getProductById(product.id);
    }));

    //assign it to the order in the request body to pass it forward 
    req.body.order = newOrder;
    next();
}