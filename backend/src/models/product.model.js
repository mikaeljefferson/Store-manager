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
const insertProduct = async (product) => {
  const columns = Object.keys(product).join(', ');
  const placeholders = Object.keys(product).map((_item) => '?').join(', ');

  const newproduct = `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`;

  const [{ insertId }] = await connection.execute(newproduct, [...Object.values(product)]);

  return insertId;
};
const updateProduct = async (productId, product) => {
  const columns = Object.keys((product)).map((key) => `${key} = ?`).join(', ');

  const upProduct = `UPDATE StoreManager.products SET ${columns} WHERE id = ?`;
  const result = await connection.execute(upProduct, [...Object.values(product), productId]);

  return result;
};
const deleteproduct = async (productId) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(query, [productId]);

  return result;
};
module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  deleteproduct,
};