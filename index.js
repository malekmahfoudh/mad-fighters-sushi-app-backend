import  express from 'express'

import 'dotenv/config';
import { connectDb } from "./configs/db.js";
import { router as main} from "./router/main.js";
import { router as worker} from "./router/worker.js";
const app = express();
const PORT = process.env.PORT || 3001 ; 
import cors from 'cors';



//connecting to the Database 
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'*'})); 


//the api main routes 
app.use('/api',main);
app.use('/api/worker',worker);




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


