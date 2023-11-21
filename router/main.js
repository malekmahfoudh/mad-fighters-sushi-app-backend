import { Router} from "express";
export const router = Router();
import { getMenu } from "../services/database-queries.js";
import { checkProductExistence, validateOrderInput } from "../middleware/data_validation.js";


//shows all the products in database 
router.get('/menu', async (req,res)=> {
    const menu = await getMenu();
    res.json({
        success:true,
        products:menu,
    });
});




//make order expected data 
// --- {
//     "order": [
//         {
//             "id":"655bf61a228445011a09efebsd"
//             "Food":"Lax",
//             "Price":40
//         },
//          {
//             "id":"655bf61a228445011a09efebsdsa"
//             "Food":"Bastrami",
//             "Price":124
//         }
//       ]
//--- }

router.post('/order',validateOrderInput,checkProductExistence,async (req,res)=> {
    const body = req.body;

    
    res.json({
        message:body
    })
})
//order status 

