import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
import { notFound ,errorHandler } from "./middleware/errorMiddleware.js";
// import products from "./data/products.js"
import productRoutes from "./routes/productRoutes.js";  
import userRoutes from "./routes/userRoutes.js";  
import cors from "cors";            

const port = process.env.PORT || 5000;

connectDB();

const app= express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cookie parser middleware ( it can be used to parse the cookies from the incoming request headers)
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Api is running ...");
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

app.use(notFound);
app.use(errorHandler);

app.use(cors({
    origin: "*"

}));





app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

