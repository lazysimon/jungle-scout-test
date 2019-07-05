import React, { Component } from 'react'
import ProductTable from './ProductTable'
import ASINInput from './ASINInput'
import axios from 'axios'
import reverse from 'lodash/reverse'
import ErrorMessage from './ErrorMessage'

export default class ASINProductData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      errorMessage: ''
    }

    this.getProductData = this.getProductData.bind(this)
    this.scrapeAndSave = this.scrapeAndSave.bind(this)
  }

  async componentDidMount() {
    await this.getProductData()
  }

  async getProductData() {
    axios.get('http://localhost:8080/api/product/')
      .then((products) => {
        const data = reverse(products.data)
        this.setState({products: data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async scrapeAndSave(asin) {
    this.setState({ errorMessage: '' })
    return axios.post('http://localhost:8080/api/product/scrape/add', 
      {
        asin: asin
      }).then((res) => { 
        this.getProductData()
      })
      .catch((error) => {
        this.setState({ errorMessage: 'We\'re sorry, we couldn\'t find that product. Please try another ASIN.' })
      })
  }

  render() {
    const { products, errorMessage } = this.state
    return (
      <div>
        <ASINInput scrapeAndSave={(asin) => this.scrapeAndSave(asin)}/>
        {
          errorMessage && <ErrorMessage message={errorMessage}/>
        }
        <ProductTable
          products={products}
          deleteProduct={(id) => this.deleteProduct(id)}
        />
      </div>
    )
  }
}