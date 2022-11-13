import express from 'express';
import Prod from '../models/prodModel.js';
import data from '../data.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) =>{
    await Prod.remove({});

    const createdProds = await Prod.insertMany(data.prods);
    res.send({ createdProds });
});

export default seedRouter;