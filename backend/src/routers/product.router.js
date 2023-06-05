const { Router } = require('express');
const { productController } = require('../controllers');
const { validateNewProduct } = require('../middlewares');

const productRouter = Router();

productRouter.get('/', productController.findAll);

productRouter.get('/:id', productController.findById);

productRouter.post('/', validateNewProduct, productController.insertProduct);

productRouter.put('/:id', validateNewProduct, productController.updateProduct);

productRouter.delete('/:id', productController.deleteproduct);

module.exports = productRouter;
