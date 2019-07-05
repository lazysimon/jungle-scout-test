const cheerio = require('cheerio');
const url = 'https://www.amazon.com/dp/B002QYW8LW';
const url1 = 'https://www.amazon.com/dp/B00MNV8E0C';
const url2 = 'https://www.amazon.com/dp/B003AIM52A';
// B07JZQFHX6
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Product = require('../models/product.model.js');

let product;

const getRank = ($) => {
  const rankSelectorType1 = $('#SalesRank > td.value').text().replace(/\s+/g, " ").trim();
  const rankSelectorType2 = $('#SalesRank').text().replace(/\s+/g, " ").trim();
  const rankSelectorType3 = $('#productDetails_detailBullets_sections1 > tbody > tr:nth-child(9) > td > span').text().replace(/\s+/g, " ").trim();
  const rankSelectorType4 = $('#productDetails_detailBullets_sections1 > tbody > tr:nth-child(3) > td > span').text().replace(/\s+/g, " ").trim();
  
  const rankSelectorTypes = [ rankSelectorType1, rankSelectorType2, rankSelectorType3, rankSelectorType4 ];
  let rank;
  for (type in rankSelectorTypes) {
    if (rankSelectorTypes[type] && (rankSelectorTypes[type].startsWith('#') || rankSelectorTypes[type].startsWith('Amazon'))) {
      rank = rankSelectorTypes[type];
    }
  }

  if (rank && (rank.includes('Amazon Best Sellers Rank: ') || rank.includes('Amazon Best Sellers Rank' ))) {
      rank = rank.replace(/Amazon Best Sellers Rank:/g,'')
      rank = rank.replace(/Amazon Best Sellers Rank/g,'') ;
  }

  return rank;
}

const getCategory = ($) => {
  const categorySelector = '#wayfinding-breadcrumbs_feature_div > ul > li:nth-child(1) > span > a';
  const category = $(categorySelector).text().replace(/\s+/g, " ").trim();
  return category;
}

const getProductDimensions = ($) => {
  const productDimensionsSelectorType1 =  $('#prodDetails > div.wrapper.USlocale > div.column.col1 > div > div.content.pdClearfix > div > div > table > tbody > tr:nth-child(2) > td.value').text().replace(/\s+/g, " ").trim();
  const productDimensionsSelectorType2 = $('#detail-bullets > table > tbody > tr > td > div.content > ul > li:nth-child(1)').text().replace(/\s+/g, " ").trim();
  const productDimensionsSelectorType3 = $('#productDetails_detailBullets_sections1 > tbody > tr:nth-child(1) > td').text().replace(/\s+/g, " ").trim();
  const productDimensionsSelectorType4 = $('#productDetailsTable > tbody > tr > td > div.content > ul > li:nth-child(1)').text().replace(/\s+/g, " ").trim();
  const productDimensionsSelectorType5 = $('#productDetails_techSpec_section_1 > tbody > tr:nth-child(2) > td').text().replace(/\s+/g, " ").trim();

  const productDimensionsTypes = [ productDimensionsSelectorType1, productDimensionsSelectorType2, productDimensionsSelectorType3, productDimensionsSelectorType4, productDimensionsSelectorType5 ]
  let productDimensions;
  for (type in productDimensionsTypes) {
    if (productDimensionsTypes[type] && (/^\d/.test(productDimensionsTypes[type]) || productDimensionsTypes[type].startsWith('Product'))) {
      productDimensions = productDimensionsTypes[type];
    }
  }

  if (productDimensions && productDimensions.includes('Product Dimensions: ')) {
    productDimensions = productDimensions.replace(/Product Dimensions: /g,'');
  }

  return productDimensions
}

/**
 * processes html by the selectors and getting the values needed
 * @param {*} html 
 * @param {*} asin 
 */
const processHtml = (html, asin) =>{
  const $ = cheerio.load(html);
  // --- PRODUCT DIMENSIONS
  const productDimensions = getProductDimensions($)

  // --- RANK
  const rank = getRank($)

  // --- CATEGORY
  const category = getCategory($)

  const productObject = {
    asin,
    productDimensions,
    rank,
    category
  }
  product = new Product(productObject)
}

/**
 * main scraper function that scrapes the amazon site
 * @param {*} asin 
 */
async function AmazonScraper(asin) {
  const url = 'https://www.amazon.com/dp/' + asin;
  console.log(url)

  const driver = new Builder().forBrowser('chrome')
      .setChromeOptions(new chrome.Options()
      .headless()
      .windowSize({width:1000, height:8000}))
      .build()
  
    await driver.get(url);
    await driver.getPageSource()
      .then((html) => {
        const $ = cheerio.load(html);

        // check if page exists:
        const pageNotFound = $('#g > div > a > img').attr('alt') || $('#h > div > a > img').attr('alt')
        
        if (pageNotFound) {
          driver.quit()
          throw new Error('page not found')
        }

        processHtml(html, asin)
        driver.quit()
      }).catch((error) =>  {
        console.log('error', error)
      })

  return product
}

module.exports = AmazonScraper
