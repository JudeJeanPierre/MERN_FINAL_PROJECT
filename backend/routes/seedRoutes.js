import express from 'express';
import Prod from '../models/prodModel.js';
import data from '../data.js';
import User from '../models/userModel.js';


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) =>{
    await Prod.remove({});
    const createdProds = await Prod.insertMany(data.prods);
    
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProds, createdUsers });
});

export default seedRouter;