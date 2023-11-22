
export function calculateTotalPrice(products) {
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.price;
    }
    return totalPrice;
}