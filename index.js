import  express from 'express'
import 'dotenv/config';
import { connectDb } from "./configs/db.js";
import { router as main} from "./router/main.js";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 3001 ; 

//connecting to the Database 
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'*'})); 

//the api main routes 
app.use('/api',main);


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


