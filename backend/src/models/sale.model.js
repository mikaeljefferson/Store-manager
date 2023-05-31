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
const insertSale = async (productSale) => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ()',
);
  const newSale = productSale.map(async ({ productId, quantity }) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [insertId, productId, quantity]);
  });
  await Promise.all(newSale);
  return {
    id: insertId,
    itemsSold: productSale,
  };
};

module.exports = {
  findAll,
  findById,
  insertSale,
};