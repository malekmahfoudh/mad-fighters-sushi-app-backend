import { Router} from "express";
 
export const router = Router();


//shows all the products in database 
router.get('/menu', (req,res)=> {
    res.json({
        message:'This is the menu route'
    }); 
});



//make order
//order status 

