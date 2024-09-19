import express, { application } from "express";
import dotenv from "dotenv";
import userRouter from './router/userRouter.js'
import ratingRouter from "./router/ratingRoutes.js"
dotenv.config();
import { dbConnect } from "./config/database.js";
import cookieParser from "cookie-parser";
const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
dbConnect();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/rating", ratingRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
  });