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
module.exports = {
    findAll,
    findById,
  };