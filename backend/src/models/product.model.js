const connection = require('./connection');

const findAll = async () => {
  const products = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(
    products,
  );

  return result;
};

const findById = async (id) => {
  const product = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(product, [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
  
};