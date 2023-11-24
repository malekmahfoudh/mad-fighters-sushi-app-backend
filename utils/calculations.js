
export const calculateTotalPrice = (products) =>  {
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.price;
    }
    return totalPrice;
}



export const  isLocked = (createdAt) =>  {
    const _createdAt = new Date(createdAt).getTime(); 
    const result =  Date.now() - _createdAt; 

  const timeDifference = ((new Date(result).getHours()) * 60 + new Date(result).getMinutes());
  return timeDifference > 2 ? true: false;
}
