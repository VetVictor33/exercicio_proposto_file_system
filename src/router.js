const express = require('express');
const { getAllProducts, postSale } = require('./controllers/products.controller');

const router = express();


router.get('/products', getAllProducts);
router.post('/products/sale', postSale);



module.exports = router;