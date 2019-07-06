var productController =  require('../controllers/product.controller');

const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let Product = require('../models/product.model');


const request = require('supertest');

const server = 'http://localhost:8080';

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

  // beforeEach((done) => {
  //   done();
  // })

  describe('POST /products/add', () => {
    it('should add products', (done) => {
      request(server)
        .post('/api/product/add')
        .send(productsArr[0])
        .expect(200)
        .expect((res) => {
          res.body.asin.should.equal('1234')
          res.body.productDimensions.should.equal('6.5 x 4.3 x 2.1 inches')
          res.body.category.should.equal('morty')
          res.body.rank.should.equal('#1 in dogs')
        })
        .end((err, res) => {
          if(err) throw err;
          done();
        })
    })
  })

  describe('GET /products/', () => {
    it('should get all products', (done) => {
      // create products first
      // get products
      // check status equals 200
      // check products length 
      // check property keys

      request(server)
        .get('/api/product/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          console.log(res.body)
          res.body.should.be.a('array')
          res.body.length.should.be.equal(2)
          res.body[0].should.have.all.keys('asin', 'category', 'productDimensions', 'rank')
        })
        .end((err, res) => {
          if(err) throw err;

          done();
        })
    })
  })

  describe('POST /products/scrape/add', () => {
    it('should scrape and save product', (done) => {
      request(server)
        .get('/api/product/scrape/add')
    })
  })
})