
export const loggedUserCheck = (req, res, next) => {
    if (req.user) {
        // User is logged in
        //if the user is logged in, we add the user_id to the req.body  
        req.body = { ...req.body, user_id: req.user.id} 
        next();
    } else {
        // User is not logged in
        // if the user is not logged in, we add the user to the req.body as a guest
        req.user = "guest";
        req.body = { ...req.body, user: req.user} 

        next();
    }
};


