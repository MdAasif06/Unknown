import app from "./src/app.js";
import connecDB from "./src/config/database.js";
import dotenv from "dotenv";
import generateInterviewReport from "./src/services/ai.service.js";
import {
  resume,
  selfDescription,
  jobDescription,
} from "./src/services/tempData.js";
dotenv.config();
connecDB();
generateInterviewReport({ resume, selfDescription, jobDescription });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
