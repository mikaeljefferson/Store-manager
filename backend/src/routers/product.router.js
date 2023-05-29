const { Router } = require('express');
const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get('/', productController.findAll);

productRouter.get('/:id', productController.findById);

productRouter.post('/', productController.insertProduct);

module.exports = productRouter;
