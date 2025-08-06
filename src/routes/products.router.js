const { Router } = require('express');

module.exports = (productManager) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
  });

  router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid));
    product 
      ? res.json(product)
      : res.status(404).json({ error: 'Producto no encontrado' });
  });

  router.post('/', async (req, res) => {
    const result = await productManager.addProduct(req.body);
    result.error
      ? res.status(400).json(result)
      : res.status(201).json(result);
  });

  router.put('/:pid', async (req, res) => {
    const result = await productManager.updateProduct(Number(req.params.pid), req.body);
    result.error
      ? res.status(400).json(result)
      : res.json(result);
  });

  router.delete('/:pid', async (req, res) => {
    const result = await productManager.deleteProduct(Number(req.params.pid));
    result.error
      ? res.status(400).json(result)
      : res.status(204).end();
  });

  return router;
};