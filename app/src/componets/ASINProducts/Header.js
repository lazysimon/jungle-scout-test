import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react'
import  JungleScoutLogo from '../../images/jungle-scout-logo.png'
export default class Header extends Component {
  render() {
    return (
      <div>
        <Image className='jungle-scout-logo' src={JungleScoutLogo}/>
        <Container textAlign='left'  className='header-container'>
          <h1>Amazon ASIN Product Data Scraper</h1>
        </Container>
      </div>
    )
  }
}