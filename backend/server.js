// IMPORTS
import express from "express";
import data from "./data.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import prodRouter from "./routes/ProdRoutes.js";


dotenv.config();

// // Create a variable that represent our database
// mongoose.connect(process.env.MONGO_URI)

// mongoose.connection.once("open", () => {
//   console.log("connected to mongodb")
// })

// Create a variable that represent our database
mongoose.connect(process.env.MONGODB_URI).then( () =>{
    console.log('DB connection successful');
})
.catch((err) =>{
    console.log(err.message)
});

const app = express();

// PARSER
app.use('/api/seed', seedRouter);
app.use('/api/prods', prodRouter);

// app.get('/api/prods', (req, res) =>{
//     res.send(data.prods);
// });
// app.get('/api/prods/refs/:refs', (req, res) =>{
//     const prod = data.prods.find((x) => x.refs === req.params.refs);
//     if (prod){
//         res.send(prod);
//     } else{
//         res.status(404).send({message: 'Not Found'});
//     }
// });

// app.get('/api/prods/:id', (req, res) =>{
//     const prod = data.prods.find((x) => x._id === req.params.id);
//     if (prod){
//         res.send(prod);
//     } else{
//         res.status(404).send({message: 'Not Found'});
//     }
// });

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Serving on http://localhost:${port}`)
})

