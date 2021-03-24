const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products');


router.delete('/delete/:deleteId', ProductController.deleteProduct);
router.patch('/update/:updateId', ProductController.updateProduct);
router.get('/product/:productId', ProductController.fetchProductById);
router.post('/create', ProductController.addProduct);
router.get('/products', ProductController.fetchProducts);


module.exports = router;