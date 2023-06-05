const { findById } = require('../../models');
const {
  idSchema,
  newProductSchema,

} = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};
const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSales = async (sales) => {
  const searchId = await sales.map(({ productId }) => findById(productId));
  const promisse = await Promise.all(searchId);
  const result = promisse.every((product) => product);
  if (!result) {
    return { type: 404, message: 'Product not found' };
  }
  return null;
     };

module.exports = {
  validateId,
  validateNewProduct,
  validateSales,
  
};