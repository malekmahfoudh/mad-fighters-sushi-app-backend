import { isProductExists } from "../services/database-queries.js";

export const validateOrderInput = (req,res,next)=> {
    const body = req.body; 
    if(!body.hasOwnProperty('order')){
        res.status(401).json(
            {
                success:false,
                message:"Please make sure you have the \"order\" property type array  in your input  "
            }
        )
    } else if(body.order.length <= 0 ){
        res.status(401).json(
            {
                success:false,
                message:"No products added! "
            }
        )
    } else {
        next();
    }

}

// check the products  existens in the database 
export const checkProductExistence = async (req, res, next) => {
    const order = req.body?.order; //order array 
    let undefinedProducts = [];


    if (order) {
        //We used Promise.all here to make sure all the products wait until isProducrtExists promise is resolved 
        //this function checks if the products are exists ín the database and if not it pushs the wrong products to the UndefinedProducts array to check them later down in the next If block
        await Promise.all(order.map(async product => {
            let productExistence = await isProductExists(product.id);
            if (!productExistence) undefinedProducts.push(product.id);
            
        }));
    }


    //Here we check if the array has a content otherwise it passes the request 
    if (undefinedProducts.length > 0 && !undefinedProducts.includes(undefined)) {
        console.log(undefinedProducts);
        res.status(401).json({
            success: false,
            message: 'This products IDs doesn\'t exists in the DB, please make sure you have right data input! ',
            TheWrongIds: undefinedProducts
        })
    } else if (undefinedProducts.includes(undefined)) {
        res.status(401).json({
            success: false,
            message: 'Please make sure you have right data input! {id:"xxxxxx"} ',
        })


    } else {
        next();
    }

}


