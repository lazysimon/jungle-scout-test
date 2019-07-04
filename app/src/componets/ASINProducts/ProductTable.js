import React, { Component } from 'react'
import axios from 'axios'
import { Container, Table } from 'semantic-ui-react'
import ProductRow from './ProductRow'

export default class ProductTable extends Component {
  constructor(props) {
    super(props)


    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    console.log('mount product')
    await this.getProductData()
  }

  async componentDidUpdate() {
    // await this.getProductData()
  }

  async getProductData() {
    axios.get('http://localhost:8080/api/product/')
      .then((products) => {
        this.setState({products: products.data})
      })
      .catch((err) => {

      })
    
  }

  render() {
    const { products } = this.state
    console.log('render product table')
    return (
      <Container className='product-table-container'>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ASIN</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Product Dimensions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              products.length === 0 && <p>No data yet!</p>
            }
            {
              products.map((product) => {
                return (
                  <ProductRow key={product.id} product={product}/>
                )
              })
            }
          </Table.Body>
        </Table>
      </Container>
    )
  }
}