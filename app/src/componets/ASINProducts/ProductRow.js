import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class ProductRow extends Component {
  constructor(props) {
    super(props)


    this.state = {
      isLoading: false,
    }
  }


  render() {
    const { product } = this.props
    return (
      <Table.Row>
        <Table.Cell><a target='_blank' href={`https://www.amazon.com/dp/${product.asin}`}>{product.asin}</a></Table.Cell>
        <Table.Cell>{product.category}</Table.Cell>
        <Table.Cell>{product.rank}</Table.Cell>
        <Table.Cell>{product.productDimensions}</Table.Cell>
      </Table.Row>
    )
  }
}