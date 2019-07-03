const cheerio = require('cheerio');
const url = 'https://www.amazon.com/dp/B002QYW8LW';
const url1 = 'https://www.amazon.com/dp/B00MNV8E0C';
const url2 = 'https://www.amazon.com/dp/B003AIM52A';
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Product = require('../models/product.model.js')

let product;

const processHtml = (html) =>{
  const $ = cheerio.load(html);

  const productDimensionsSelectorType1 =  '#prodDetails > div.wrapper.USlocale > div.column.col1 > div > div.content.pdClearfix > div > div > table > tbody > tr:nth-child(2) > td.value';
  const productDimensionsSelectorType2 = '#detail-bullets > table > tbody > tr > td > div.content > ul > li:nth-child(1)'
  const productDimensionsSelectorType3 = '#productDetails_detailBullets_sections1 > tbody > tr:nth-child(1) > td'

  let productDimensions = $(productDimensionsSelectorType1).text().replace(/\s+/g, " ").trim() 
    || $(productDimensionsSelectorType2).text().replace(/\s+/g, " ").trim() 
    || $(productDimensionsSelectorType3).text().replace(/\s+/g, " ").trim()

  if(productDimensions.includes('Product Dimensions: ')) {
    productDimensions = productDimensions.replace(/Product Dimensions: /g,'');
  }

  const rankSelectorType1 = '#SalesRank > td.value'
  const rankSelectorType2 = '#SalesRank'
  const rankSelectorType3 = '#productDetails_detailBullets_sections1 > tbody > tr:nth-child(9) > td > span'
  let rank = $(rankSelectorType1).text().replace(/\s+/g, " ").trim()
    || $(rankSelectorType2).text().replace(/\s+/g, " ").trim()
    || $(rankSelectorType3).text().replace(/\s+/g, " ").trim()

  if(rank.includes('Amazon Best Sellers Rank: ')) {
      rank = rank.replace(/Amazon Best Sellers Rank: /g,'');
  }

  const categorySelector = '#wayfinding-breadcrumbs_feature_div > ul > li:nth-child(1) > span > a'
  const category = $(categorySelector).text().replace(/\s+/g, " ").trim()

  const productObject = {
    productDimensions,
    rank,
    category
  }
  product = new Product(productObject)
}

async function AmazonScraper(asin) {
  const url = 'https://www.amazon.com/dp/' + asin;
  console.log(url)

  const driver = new Builder().forBrowser('chrome')
      .setChromeOptions(new chrome.Options()
      .headless()
      .windowSize({width:1000, height:8000}))
      .build()
  
    await driver.get(url2);
    await driver.getPageSource()
      .then((html) => {
        processHtml(html)
        driver.quit()
      }).catch((error) =>  {
        console.log(error)
      })

  return product
}

module.exports = AmazonScraper
