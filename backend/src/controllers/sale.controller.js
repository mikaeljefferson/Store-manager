const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};
const insertSale = async (req, res) => {
  const productSale = req.body;
  const { type, result } = await saleService.insertSale(productSale);
    return res.status(type).json(result);
};
const removeSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.removeSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json('');
};
module.exports = {
    findAll,
    findById, 
    insertSale,
    removeSaleById,
  };