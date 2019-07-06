const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../controllers/product.controller');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

router.post('/product/add', (req, res) => {
  productController.addProduct(req, res)
})

router.get('/product/scrape/', (req, res) => {
  productController.scrapeAndSave(req, res)
})

router.post('/product/scrape/add', (req, res) => {
  productController.scrapeAndSave(req, res)
})

router.get('/product/', (req, res) => {
  productController.getAllProducts(req, res)
})

module.exports = router