const { productModel } = require('../models');
const schema = require('./validations/validateInputs');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};
const insertProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insertProduct({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};
const updateProduct = async (productId, product) => {
  const error = schema.validateNewProduct(product.name);
  if (error.type) return error;

  const checkProductExists = await productModel.findById(productId);
  if (!checkProductExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.updateProduct(productId, product);

  return { type: null, message: { id: checkProductExists.id, ...product } };
};
const deleteproduct = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const checkProductExists = await productModel.findById(productId);
  if (!checkProductExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.deleteproduct(productId);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  deleteproduct,
 
};