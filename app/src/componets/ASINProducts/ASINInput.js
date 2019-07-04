import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import axios from 'axios'

export default class ASINInput extends Component {
  constructor(props) {
    super(props)


    this.state = {
      asin: ''
    }
  }

  async componentDidMount() {

  }

  /**
   * scrape data given asin and save it to db
   */
  scrapeAndSave() {
    const { asin } = this.state
    
    this.setState({isLoading: true})
    axios.post('http://localhost:8080/api/product/scrape/add', 
      {
        asin: asin
      })
      .then((product) => {
        console.log('-data', product.data)
        this.setState({isLoading: false})
        this.forceUpdate()
      })
      .catch((error) => {

      })

  }

  render() {
    const { isLoading } = this.state
    return (
      <Container textAlign='left' className='asin-input-container'>
        <Form onSubmit={() => this.scrapeAndSave()}>
        <h4>Get Product Data by ASIN:</h4>
        <Form.Input className='asin-input' disabled={isLoading} placeholder='ASIN' onChange={(event) => {
          console.log(event.target.value)
          this.setState({asin: event.target.value})}}/>
          <Button className='asin-submit-btn' type='submit' loading={isLoading}>Submit</Button>
        </Form>
      </Container>
    )
  }
}