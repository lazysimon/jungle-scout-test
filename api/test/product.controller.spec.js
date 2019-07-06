const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Product = require('../models/product.model');
const supertest = require('supertest');
const server =  require('../server');
const request = supertest(server);
const should = chai.should();

describe('Products', function() {
  const productsArr = [
    {
      asin: '1234',
      productDimensions: '6.5 x 4.3 x 2.1 inches',
      category: 'morty',
      rank: '#1 in dogs'
    },
    {
      asin: '4321',
      productDimensions: '1.2 x 3.4 x 4.6 inches',
      category: 'topy',
      rank: '#2 in dogs'
    }
  ];

  after(() => {
    console.log('Done executing all tests... Dropping all collections');
    Product.db.dropCollection('products');
    server.close((err) => console.log('Unable to close the server : ', err));
  })

  describe('POST /products/add', () => {
    it('should add products', (done) => {
      request
        .post('/api/product/add')
        .send(productsArr[0])
        .expect(200)
        .expect((res) => {
          res.body.product.asin.should.equal('1234')
          res.body.product.productDimensions.should.equal('6.5 x 4.3 x 2.1 inches')
          res.body.product.category.should.equal('morty')
          res.body.product.rank.should.equal('#1 in dogs')
        })
        .end((err, res) => {
          if(err) throw err;
          done();
        })
    })
  })

  describe('POST /products/scrape/add', () => {
    it('should scrape and save product', (done) => {
      request
        .post('/api/product/scrape/add')
        .send({asin: 'B003AIM52A'})
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          res.body.should.be.a('object')
          res.body.product.asin.should.equal('B003AIM52A')
          res.body.product.productDimensions.should.equal('7.5 x 8 x 1.4 inches')
          res.body.product.category.should.equal('Toys & Games')
        })
        .end((err, res) => {
          if(err) throw err;
          done();
        })
    })
  })

  describe('GET /products/', () => {
    it('should get all products', (done) => {
      request
        .get('/api/product/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          res.body.should.be.a('array')
          res.body.length.should.be.equal(2)
          res.body[0].should.contain.keys('asin', 'category', 'productDimensions', 'rank')
        })
        .end((err, res) => {
          if(err) throw err;
          done();
        })
    })
  })

})