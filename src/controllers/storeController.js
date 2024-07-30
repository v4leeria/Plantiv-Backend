const {
  getProducts,
  getProductById,
  getCartItems,
  addToCart: addToCartModel,
  removeFromCart: removeFromCartModel,
  createProduct,
} = require("../models/storeModel");

const listProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItems = await getCartItems(userId);
    res.json(cartItems);
  } catch (err) {
    res
      .status(500)
      .json({ error: "No se obtuvieron los artículos del carrito" });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    await addToCartModel(userId, productId, quantity);
    res.status(201).json({ message: "Producto agregado al carrito" });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  try {
    await removeFromCartModel(userId, productId);
    res.status(200).json({ message: "El producto se eliminó" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};

const publishProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const newProduct = await createProduct({
      name,
      description,
      price,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Error creando el producto" });
  }
};

module.exports = {
  listProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart,
  publishProduct,
};
