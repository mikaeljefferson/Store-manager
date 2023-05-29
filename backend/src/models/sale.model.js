const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT s.id AS saleId, s.date, p.product_id AS productId, p.quantity 
    FROM StoreManager.sales s 
    INNER JOIN StoreManager.sales_products p 
    ON s.id = p.sale_id
    ORDER BY s.id ASC, p.product_id ASC`,
  );
  return sales;
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products p
    ON s.id = p.sale_id
    WHERE s.id = ?
    ORDER BY s.id ASC, p.product_id ASC`,
    [id],
  );

  return sale;
};

module.exports = {
  findAll,
  findById,
};