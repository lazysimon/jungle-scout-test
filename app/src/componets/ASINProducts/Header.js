import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

export default class Header extends Component {

  render() {
    return (
      <Container textAlign='left'  className='header-container'>
        <h1>Amazon ASIN Product Data Scraper</h1>
      </Container>
    )
  }
}