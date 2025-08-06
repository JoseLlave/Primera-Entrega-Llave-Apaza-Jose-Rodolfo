const express = require('express');
const ProductManager = require('./dao/ProductManager');
const CartManager = require('./dao/CartManager');

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const PORT = 8080;

ProductManager.rutaDatos = './src/data/products.json';
CartManager.rutaDatos = './src/data/carts.json';

app.use(express.json());

app.use('/api/products', productsRouter(ProductManager));
app.use('/api/carts', cartsRouter(CartManager));

app.get('/', (req, res) => {
  res.send('API de Productos y Carritos funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor online en http://localhost:${PORT}`);
});
