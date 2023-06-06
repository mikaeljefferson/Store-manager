const { saleModel } = require('../models');
const schema = require('./validations/validateInputs');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.findById(saleId);
  if (!sale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};
const insertSale = async (productsale) => {
  const sale = await saleModel.insertSale(productsale);
  if (sale) {
    return { type: 201, result: sale };
  }
};
const removeSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const checkProductExists = await saleModel.findById(saleId);
  if (!checkProductExists[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await saleModel.removeSaleById(saleId);

  return { type: null, message: '' };
};
module.exports = {
    findAll,
    findById,
    insertSale,
    removeSaleById,
  };