import  express from 'express'
import 'dotenv/config';
import { connectDb } from "./configs/db.js";
import { router as mainRoute} from "./router/mainRoutes.js";
const app = express();
const PORT = process.env.PORT || 3001 ; 

//connecting to the Database 
connectDb();

app.use(express.json());

//the api main routes 
app.use('/api',mainRoute);


// wrong url input given from the user 
app.all('*',(req,res)=> {
    res.status(404).json({
        success:false,
        message:'The page not found! '
    });
});







app.listen(PORT, ()=> {
    console.log(`The server is running on port ${PORT}`);
})


