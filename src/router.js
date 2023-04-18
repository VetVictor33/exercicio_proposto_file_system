const express = require('express');
const { getAllProducts, postSale, getAllSales } = require('./controllers/products.controller');

const router = express();


router.get('/products', getAllProducts);
router.get('/products/sales', getAllSales);
router.post('/products/sales', postSale);



module.exports = router;