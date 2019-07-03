const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product/add', (req, res) => {
  console.log('add route')
  productController.addProduct(req, res)
  res.send('here')
})

router.get('/product/scrape', (req, res) => {
  console.log('scrape')
  productController.scrape(req, res)
})

module.exports = router