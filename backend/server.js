import app from "./src/app.js"
import connecDB from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();
connecDB();

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})