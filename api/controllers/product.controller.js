const Product = require('../models/product.model');
const AmazonScraper = require('../services/amazonSraper');

async function scrape(req, res, next) {
  console.log('scraping...', req.body)
  const asin = req.body.asin
  const product = await AmazonScraper(asin)

  console.log('scraped product', product)
}

async function getAllProducts(req, res, next) {

}

async function addProduct(req, res) {
  let product = new Product(req.body);
  product.save()
    .then((business) => {
      res.status(200).json({'product': 'product successfully added'})
    })
    .catch((err) => {
      res.status(400).send("unable to save to database")
    })
}

module.exports = {addProduct, getAllProducts, scrape}