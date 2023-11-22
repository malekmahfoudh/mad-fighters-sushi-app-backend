import { Router} from "express";
export const router = Router();
import { getMenu } from "../services/database-queries.js";
import { checkProductExistence, validateOrderInput } from "../middleware/data_validation.js";
import { getOrderProductsInfo } from "../middleware/get_products_info.js";


//shows all the products in database 
router.get('/menu', async (req,res)=> {
    const menu = await getMenu();
    res.json({
        success:true,
        products:menu,
    });
});





//api/order Make an order 

router.post('/order',validateOrderInput,checkProductExistence,getOrderProductsInfo,async (req,res)=> {
    const body = req.body;
    console.log(body);
    res.json({
        success:true,
        message:"Your order has been added successfully! ",
    })
})
//order status 

