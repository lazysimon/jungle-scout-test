const Product = require('../models/product.model');
const AmazonScraper = require('../services/amazonSraper');

async function scrapeAndSave(req, res, next) {
  const asin = req.body.asin
  try {
    const data = await AmazonScraper(asin) 
    console.log(data)
    if(!data.category) {
      throw new Error('error here');
    } else {
      let product = new Product(data);
      product.save()
        .then((product) => {
          res.status(200).json({'product': 'product successfully added'})
        })
        .catch((err) => {
          res.status(400).send('unable to save to database')
        })
    }
  } catch(error) {
    console.log('SCRAPE ERROR')
    res.status(400).send('error scraping!')
  }
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
    .then((data) => {
      res.status(200).json({'product': 'product successfully added', product})
    })
    .catch((err) => {
      res.status(400).send("unable to save to database")
    })
}

module.exports = { addProduct, getAllProducts, scrapeAndSave }