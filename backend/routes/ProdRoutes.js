import express from 'express';
import Prod from '../models/prodModel.js';

const prodRouter = express.Router();

prodRouter.get('/', async (req, res) => {
  const prods = await Prod.find();
  res.send(prods);
});

prodRouter.get('/refs/:refs', async (req, res) => {
  const prod = await Prod.findOne({refs: req.params.refs});
  if (prod) {
    res.send(prod);
  } else {
    res.status(404).send({ message: 'Unable to find this product' });
  }
});
prodRouter.get('/:id', async (req, res) => {
  const prod = await Prod.findById(req.params.id);
  if (prod) {
    res.send(prod);
  } else {
    res.status(404).send({ message: 'Unable to find this product' });
  }
});

export default prodRouter;