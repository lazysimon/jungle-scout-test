const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product/add', (req, res) => {
  console.log('add route')
  productController.addProduct(req, res)
  res.send('here')
})

router.get('/product/scrape/', (req, res) => {
  console.log('scrape')
  productController.scrapeAndSave(req, res)
})

router.post('/product/scrape/add', (req, res) => {
  console.log('scrape')
  productController.scrapeAndSave(req, res)
})

router.get('/product/', (req, res) => {
  console.log('get')
  productController.getAllProducts(req, res)
})

module.exports = router