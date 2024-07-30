const { pool } = require("../config/db");

const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const getCartItems = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM cart_items WHERE user_id = $1",
    [userId]
  );
  return result.rows;
};

const addToCart = async (userId, productId, quantity) => {
  await pool.query(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
    [userId, productId, quantity]
  );
};

const removeFromCart = async (userId, productId) => {
  await pool.query(
    "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
};

const createProduct = async (product) => {
  const { name, description, price, stock } = product;
  const result = await pool.query(
    "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, stock]
  );
  return result.rows[0];
};

module.exports = {
  getProducts,
  getProductById,
  getCartItems,
  addToCart,
  removeFromCart,
  createProduct,
};
