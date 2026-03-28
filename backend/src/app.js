import express from "express"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
const app=express()


// IMPORTANT middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"working route fine"
    })
})

// ruquire all routes here
app.use("/api/auth",authRouter)




export default app