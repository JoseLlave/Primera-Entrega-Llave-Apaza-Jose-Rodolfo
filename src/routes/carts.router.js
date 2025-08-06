const { Router } = require('express');

module.exports = (cartManager) => {
  const router = Router();

  router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  });

  router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(Number(req.params.cid));
    cart
      ? res.json(cart.products)
      : res.status(404).json({ error: 'Carrito no encontrado' });
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    const result = await cartManager.addProductToCart(
      Number(req.params.cid),
      Number(req.params.pid)
    );
    result.error
      ? res.status(400).json(result)
      : res.status(201).json({ message: 'Producto agregado al carrito' });
  });

  return router;
};