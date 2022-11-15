// IMPORTS

// IMPORT EXPRESS
import express from "express";

// IMPORT MORGAN TO LOG REQUEST AND RESPONSE
import morgan from "morgan";

import data from "./data.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import prodRouter from "./routes/ProdRoutes.js";
import userRouter from "./routes/userRoutes.js";


dotenv.config();

// // Create a variable that represent our database
// mongoose.connect(process.env.MONGO_URI)

// mongoose.connection.once("open", () => {
//   console.log("connected to mongodb")
// })

// Create a variable that represent our database
mongoose.connect(process.env.MONGODB_URI).then("open", () =>{
    console.log('DB connection successful');
})
.catch((err) =>{
    console.log(err.message)
});

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// PARSER
app.use('/api/seed', seedRouter);
app.use('/api/prods', prodRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5001;

app.listen(port, ()=>{
    console.log(`Serving on http://localhost:${port}`)
})

