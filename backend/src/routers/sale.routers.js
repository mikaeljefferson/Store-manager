const express = require('express');
const { saleController } = require('../controllers');
const { validateNewSale } = require('../middlewares');

const saleRouter = express.Router();

saleRouter.get('/', saleController.findAll);

saleRouter.get('/:id', saleController.findById);

saleRouter.post('/', validateNewSale, saleController.insertSale);

module.exports = saleRouter;