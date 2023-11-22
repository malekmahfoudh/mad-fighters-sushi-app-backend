import { Router} from "express";
export const router = Router();

import { getMenu } from "../services/database-queries.js";
import { checkProductExistence, validateOrderInput } from "../middleware/order/data_validation.js";
import { getOrderProductsInfo } from "../middleware/order/get_products_info.js";
import { loggedUserCheck } from "../middleware/order/loggedUserCheck.js";
import { calculateTotalPrice } from "../utils/calculations.js";
import { Order } from "../models/Order.js";


//shows all the products in the menu
router.get('/menu', async (req, res) => {
    try {
        const menu = await getMenu();
        res.json({
            success: true,
            menu: menu
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch the menu."
        });
    }
});



//shows all the products in database 
router.post('/order', validateOrderInput, checkProductExistence, getOrderProductsInfo, loggedUserCheck, async (req, res) => {
    const body = req.body;

    // Create a new order object
    const order = new Order({
        ...body,
        totalPrice: calculateTotalPrice(body.order)
    })

    // Save the order to the database
    try {
        await order.save();
        res.json({
            success: true,
            message: "Your order has been added successfully!",
            theOrder: {
                order_id: order.order_id,
                title: order.title,
                totalPrice: order.totalPrice
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add the order to the database.",
            error: error.message
        });
    }
});

