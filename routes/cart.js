// It has three routes; get cart items, add an item to cart, and delete items from the cart.

const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

router.get('/cart/id:id',cartController.get_cart_items);
router.post('/cart/:id',cartController.add_cart_items);
router.delete('/cart/:userId/:itemId,cartController.delete_item');

module.exports = routers;