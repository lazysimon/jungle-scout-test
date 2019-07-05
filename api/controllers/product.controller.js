const Product = require('../models/product.model');
const AmazonScraper = require('../services/amazonSraper');

/**
 * scrape and save data 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function scrapeAndSave(req, res, next) {
  const asin = req.body.asin
  try {
    const data = await AmazonScraper(asin) 

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

/**
 * fetches all products and returns them
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAllProducts(req, res, next) {
  Product.find(function(err, products) {
    if (err) {
        console.log(err);
    } else {
        res.json(products);
    }
});
}

/**
 * adds product to db
 * @param {*} req 
 * @param {*} res 
 */
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