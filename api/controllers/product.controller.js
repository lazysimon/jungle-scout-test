const Product = require('../models/product.model');
const AmazonScraper = require('../services/amazonSraper');

async function scrapeAndSave(req, res, next) {
  const asin = req.body.asin
  const scrapedData = await AmazonScraper(asin) 
    .then((data) => {
      let product = new Product(scrapedData);
      product.save()
        .then((product) => {
          res.status(200).json({'product': 'product successfully added'})
        })
        .catch((err) => {
          res.status(400).send('unable to save to database')
        })
    })
    .catch((error) => {
      // res.status(400).send('page not found')
      res.status(400).json({error: 'page not found'})
      
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

module.exports = { addProduct, getAllProducts, scrapeAndSave }