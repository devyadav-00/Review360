import mongoose from "mongoose"
// const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    } );
}

export {dbConnect};