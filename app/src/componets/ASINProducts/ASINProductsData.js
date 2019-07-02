import React, { Component } from 'react'
import ProductTable from './ProductTable';
import ASINInput from './ASINInput';

export default class ASINProductData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  async componentDidMount() {

  }

  render() {
    return (
      <div>
        <ASINInput />
        <ProductTable />
      </div>
    )
  }
}