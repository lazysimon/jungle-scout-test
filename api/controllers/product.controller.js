const Product = require('../models/product.model');
const AmazonScraper = require('../services/amazonSraper');

async function scrapeAndSave(req, res, next) {
  console.log('scraping...', req.body)
  const asin = req.body.asin
  const scrapedData = await AmazonScraper(asin) 
  console.log('scraped product', scrapedData)
  
  let product = new Product(scrapedData);
  product.save()
    .then((business) => {
      res.status(200).json({'product': 'product successfully added'})
    })
    .catch((err) => {
      res.status(400).send("unable to save to database")
    })
}

async function getAllProducts(req, res, next) {
  Product.find(function(err, products) {
    if (err) {
        console.log(err);
    } else {
        res.json(products);
    }
});
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

module.exports = {addProduct, getAllProducts, scrapeAndSave}