import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class ProductRow extends Component {
  constructor(props) {
    super(props)


    this.state = {
      isLoading: false,
    }
  }

  async componentDidMount() {

  }

  render() {
    const { product } = this.props
    return (
      <Table.Row>
        <Table.Cell>{product.asin}</Table.Cell>
        <Table.Cell>{product.category}</Table.Cell>
        <Table.Cell>{product.rank}</Table.Cell>
        <Table.Cell>{product.productDimensions}</Table.Cell>
      </Table.Row>
    )
  }
}