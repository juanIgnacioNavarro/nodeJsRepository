import { Router } from "express"
import {cartsManager} from '../dao/CartsManager.js'

export const cartsRouter =Router()


cartsRouter.post('/', async (req, res) => {
    
  try {
    const newCart = await cartsManager.createCart();

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartsManager.getCartById(cartId);  
    if (cart) {     
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const products = await cartsManager.addProductToCart(cartId, productId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});