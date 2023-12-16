# mad-fighters-sushi-app-backend
# API Routes

#  Customer side

## Get all products
- **Endpoint:** `/api/menu`
- **Method:** `GET`
- **Description:** Get all products.

## Make an order

- **Endpoint:** `/api/order`
- **Method:** `POST`
- **Description:** Making new order. 
- **Body:**
    ```
        {
            "comment":"kommentar till kocken",
            "products": [
                            {
                                "id":"12"
                            },
                            {
                                "id":"12"
                            },
                            {
                                "id":"15"
                            }
                    
                        ]
        }

    ```

## Update order
- **Endpoint:** `/api/order/update/{orderNumber}`
- **Method:** `PUT`
- **Description:** Update existing order, The Customer can update in first ***2*** minutes after the order has been placed. 
- **Body:**
    ```
        {
            "comment":"kommentar till kocken",
            "products": [
                            {
                                "id":"12"
                            },
                            {
                                "id":"12"
                            },
                            {
                                "id":"15"
                            }
                    
                        ]
        }

    ```
## Delete 

- **Endpoint:** `/api/order/delete/{orderNumber}`
- **Method:** `DELETE`
- **Description:** Delete order.



## Order Status  

- **Endpoint:** `/api/order/status/{orderNumber}`
- **Method:** `GET`
- **Description:** View order details .




# Workers API  

## View all orders
- **Endpoint:** `/api/worker/orders?user=worker&pass=0000`
- **Method:** `GET`
- **Description:** View all incoming orders with **"status: pending"**.

## View verified orders
- **Endpoint:** `/api/worker/orders/verified?user=worker&pass=0000`
- **Method:** `GET`
- **Description:** View all recieved orders with **"status: verified"**.

## View done orders
- **Endpoint:** `/api/worker/orders/done?user=worker&pass=0000`
- **Method:** `GET`
- **Description:** View all recieved orders with **"status: done"**.


## verify an order 
- **Endpoint:** `/api/worker/orders/verify/{orderNumber}?user=worker&pass=0000`
- **Method:** `PUT`
- **Description:** This route changes order status based on the current status. if the current status is **pending** it will change it to **Verified** or if it's **Verified** it will be **done** after the fetch.


-------

 ***Sushi-vibes***

