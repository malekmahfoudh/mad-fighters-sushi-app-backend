
export const calculateTotalPrice = (products) =>  {
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.price;
    }
    return totalPrice;
}


export const isLocked = (createdAt) => {
    const _createdAt = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const difference = now - _createdAt;
    const result = (difference / 1000) / 60; // convert millis to minutes
    return result.toFixed(1) > 2 ? true : false; // return true if the order is older than 2 minutes
}


export const getTodaysOrders = (orders) => {
  let  count = 0;
  let resetHoures = 12;
  let newOrders =
    orders &&
    orders.map((order,index) => {
      const createdAt = new Date(order.createdAt).getTime();
      const now = new Date().getTime();
      const difference = now - createdAt;
      const differr = difference / 1000 / 60 / 60; // convert millis to hours

      if (differr < resetHoures) {
       
        return {
          orderNumber: order.orderNumber,
          status: order.status,
          createdAt: order.createdAt,
          totalPrice: order.totalPrice,
          sequenceNumber: ++count,
        };
      }
    });
  newOrders = newOrders.filter((order) => !!order);
  return newOrders;
};