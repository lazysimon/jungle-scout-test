import React, { Component } from 'react'
import { Container, Table } from 'semantic-ui-react'
import axios from 'axios'

export default class ProductTable extends Component {
  constructor(props) {
    super(props)


    this.state = {
      isLoading: false,
      products: []
    }
  }

  async componentDidMount() {

  }

  async getProductData() {
    axios.get('http://localhost:8080/api/product/scrape')
    
  }

  render() {
    return (
      <Container>
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
            <Table.Row>
              <Table.Cell>No Name Specified</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}