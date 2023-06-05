const { productModel } = require('../models');

const validationIdAndQuantity = (sale) => {
  let error;
  sale.find((product) => {
    if (!product.productId) {
      error = { error: 400, message: '"productId" is required' };
    }
    if (!product.quantity) {
      error = { error: 400, message: '"quantity" is required' };
    }
    if (product.quantity < 1) {
      error = {
        error: 422,
        message: '"quantity" must be greater than or equal to 1',
      };
    }
    if (error) return true;
    return null;
  });
  return error;
};

const existsProduct = async (sale) => {
  if (sale) {
    const products = await Promise.all(
      sale.map(async (item) => productModel.findById(item.productId)),
    );

    const someIdIsMissing = products.some((item) => item === undefined);
    if (someIdIsMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

const validateNewSale = async (req, res, next) => {
  const sale = req.body;
  const error = validationIdAndQuantity(sale);
  if (error) return res.status(error.error).json({ message: error.message });
  const exists = await existsProduct(sale);
  if (exists) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = validateNewSale;
