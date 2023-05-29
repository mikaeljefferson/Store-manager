const express = require('express');
const { saleController } = require('../controllers');

const saleRouter = express.Router();

saleRouter.get('/', saleController.findAll);
saleRouter.get('/:id', saleController.findById);

module.exports = saleRouter;