import { Router} from "express";
export const router = Router();
import { getMenu, getOrderById } from "../services/database-queries.js";
import { checkProductExistence, validateOrderInput } from "../middleware/order/data_validation.js";
import { getOrderProductsInfo } from "../middleware/order/get_products_info.js";
import { loggedUserCheck } from "../middleware/order/loggedUserCheck.js";
import { calculateTotalPrice, isLocked } from "../utils/calculations.js";
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
                orderNumber: order.orderNumber,
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

//show the status of the order
router.get('/order/status/:orderNumber', async (req, res) => {
    const orderNumber = req.params.orderNumber;
    try {
        const order = await getOrderById(orderNumber);
        const orderUpdate = {
                user: order.user,
                status: isLocked(order.createdAt) ,
                totalPrice: order.totalPrice,
                createdAt: order.createdAt,
                order_id: order.order_id,
                orderNumber: order.orderNumber,
                order:order.order,
        }
        if (order) {
            res.json({
                success: true,
                order: orderUpdate
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch the order.",
            error: error.message
        });
    }
});

