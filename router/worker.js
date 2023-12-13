import { Router} from "express";
import {  findCounter, getAllOrders, getAllOrdersToday, getOrderById, updateCounter, updateOrderStatus } from "../services/database-queries.js";
import { getTodaysOrders } from "../utils/calculations.js";
import { Counter } from "../models/Order_counter.js";
export const router = Router();






//shows all pending orders for workers 
router.get('/orders', async (req, res) => {
        const {user,pass} = req.query;
        if(user === 'worker' && pass === '0000'){
    try {
        const orders = await getAllOrdersToday();
        res.json({
            success: true,
            orders: orders.filter(order => order.status === 'pending'),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch the orders."
        });
    }
}else {
    res.status(401).json({
        success: false,
        message: "Unauthorized."
    });
}
});

//shows all verified  orders for workers 
router.get('/orders/verified', async (req, res) => {
    const {user,pass} = req.query;
    if(user === 'worker' && pass === '0000'){
try {
    const orders = await getAllOrdersToday();

    res.json({ 
        success: true,
        orders: orders.filter(order => order.status === 'verified'),
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to fetch the orders."
    });
}
}else {
res.status(401).json({
    success: false,
    message: "Unauthorized."
});
}
});

//shows all ready orders for workers 
router.get('/orders/done', async (req, res) => {
    const {user,pass} = req.query;
    if(user === 'worker' && pass === '0000'){
try {
    const orders = await getAllOrdersToday();
    res.json({
        success: true,
        orders: orders.filter(order => order.status === 'done'),
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to fetch the orders."
    });
}
}else {
res.status(401).json({
    success: false,
    message: "Unauthorized."
});
}
});

//verify the order 
router.put("/orders/verify/:orderNumber", async (req, res) => {
  const orderNumber = req.params.orderNumber;
  const { user, pass } = req.query;

  if (user === "worker" && pass === "0000") {
    try {
      const getOrder = await getOrderById(orderNumber);
      if (getOrder.status === "pending") {
        await updateOrderStatus(orderNumber, "verified");
        res.json({
          success: true,
          message: "Order verified successfully.",
        });
      }else if(getOrder.status === "verified"){
        await updateOrderStatus(orderNumber, "done");
        res.json({
          success: true,
          message: "The order is ready to be delivered.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Order is allready verified",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to verify the order.",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }
});

