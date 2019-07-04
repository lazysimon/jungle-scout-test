import React, { Component } from 'react'
import axios from 'axios'
import { Container, Table, Message } from 'semantic-ui-react'
import ProductRow from './ProductRow'
import isEmpty from 'lodash/isEmpty';

export default class ProductTable extends Component {
  constructor(props) {
    super(props)


    this.state = {
      products: []
    }
    // this.getProductData = this.getProductData.bind(this)
    this.renderProducts = this.renderProducts.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderProductsLogic = this.renderProductsLogic.bind(this);
  }

  async componentDidMount() {
    console.log('mount product')
    // await this.getProductData()
  }

  // async getProductData() {
  //   axios.get('http://localhost:8080/api/product/')
  //     .then((products) => {
  //       this.setState({products: products.data})
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
    
  // }

  renderEmpty() {
    return (
      <Message
        size="large"
        warning
      >
          <Message.Header>Uh oh, seems like you have no product data...</Message.Header>
          <p>Fill out the form above to add some data!</p>
      </Message>
    )
  }

  renderProducts() {
    const { products } = this.props
    return (
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
            products.map((product) => {
              return (
                <ProductRow key={product.id} product={product}/>
              )
            })
          }
        </Table.Body>
      </Table>
    )
  }

  renderProductsLogic() {
    if (isEmpty(this.props.products) === true) {
        return (this.renderEmpty())
    } else {
        return (this.renderProducts())
    }
}


  render() {
    console.log('render product table')
    return (
      <Container className='product-table-container'>
        {this.renderProductsLogic()}
      </Container>
    )
  }
}