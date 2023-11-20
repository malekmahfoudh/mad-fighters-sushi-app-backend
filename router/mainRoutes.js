import { Router} from "express";
import {menuProducts} from "../models/menuProduct.js";
 
export const router = Router();


//shows all the products in database 
router.get('/menu', async (req,res)=> {
    const getMenu = await menuProducts.find({});

    res.json({
        message:'This is the menu route',
        meny: getMenu
    }); 
});



//make order
//order status 

