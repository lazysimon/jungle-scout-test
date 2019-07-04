import React, { Component } from 'react'
import ProductTable from './ProductTable';
import ASINInput from './ASINInput';
import axios from 'axios'

export default class ASINProductData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      products: []
    }

    this.getProductData = this.getProductData.bind(this)
  }

  async componentDidMount() {
    await this.getProductData()
  }

  async getProductData() {
    axios.get('http://localhost:8080/api/product/')
      .then((products) => {
        this.setState({products: products.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async scrapeAndSave(asin) {
    console.log('scrape and save', asin)
    return axios.post('http://localhost:8080/api/product/scrape/add', 
      {
        asin: asin
      }).then((res) => {
        this.getProductData()
      })
      .catch((error) => {
        console.log(error)
      })
  }


  render() {
    const { products } = this.state
    return (
      <div>
        <ASINInput scrapeAndSave={(asin) => this.scrapeAndSave(asin)}/>
        <ProductTable products={products}/>
      </div>
    )
  }
}