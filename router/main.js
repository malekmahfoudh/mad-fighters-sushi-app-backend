import { Router} from "express";
export const router = Router();
import { deleteOrder, getMenu, getOrderById, updateOrder } from "../services/database-queries.js";
import { checkProductExistence, validateOrderInput } from "../middleware/order/data_validation.js";
import { getOrderProductsInfo } from "../middleware/order/get_products_info.js";
import { loggedUserCheck } from "../middleware/order/loggedUserCheck.js";
import { calculateTotalPrice, isLocked } from "../utils/calculations.js";
import { Order } from "../models/Order.js";
import { timeConversion } from "../utils/conversion.js";


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



//make an order
router.post('/order', validateOrderInput, checkProductExistence, getOrderProductsInfo, loggedUserCheck, async (req, res) => {
    const body = req.body;

    // Create a new order object
    const order = new Order({
        ...body,
        comment: body.comment,
        totalPrice: calculateTotalPrice(body.products)
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
            orderNumber: order.orderNumber,
            status: order.status,
            user: order.user,
            locked: isLocked(order.createdAt),
            totalPrice: order.totalPrice,
            comment: order.comment,
            createdAt: timeConversion(order.createdAt),
            products: order.products,
            order_id: order.order_id,

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

//update an order if it's not locked
router.put('/order/update/:orderNumber',validateOrderInput,checkProductExistence,getOrderProductsInfo, async (req, res) => {
    const orderNumber = req.params.orderNumber;
    const body = req.body;
    
    // Update the order in the database

    try {
        const order = await getOrderById(orderNumber);
        if(order){
            if(isLocked(order.createdAt)){
                res.status(401).json({
                    success: false,
                    message: "Sorry, you can't update this order anymore."
                });
            }else {
                
                const updatedOrder = {
                    comment: body.comment,
                    products: body.products,
                    totalPrice: calculateTotalPrice(body.products)
                }
            
                await updateOrder(orderNumber, updatedOrder);
                res.json({
                    success: true,
                    message: "Your order has been updated successfully!",
                    theOrder: {
                        orderNumber: order.orderNumber,
                        totalPrice: updatedOrder.totalPrice
                    }
                }); 
            }
            
        }else {
            res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }
    } catch (error) {
        console.log(error);
    }


});

//delete an order if it's not locked
router.delete('/order/delete/:orderNumber', async (req, res) => {
    const orderNumber = req.params.orderNumber;
    try {
        const order = await getOrderById(orderNumber);
        if(order){
            if(isLocked(order.createdAt)){
                res.status(401).json({
                    success: false,
                    message: "Sorry, you can't delete this order anymore."
                });
            }else {
                await deleteOrder(orderNumber);
                res.json({
                    success: true,
                    message: "Your order has been deleted successfully!",
                    theOrder: {
                        orderNumber: order.orderNumber,
                        totalPrice: order.totalPrice
                    }
                }); 
            }
            
        }else {
            res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }
    } catch (error) {
        console.log(error);
    }
});