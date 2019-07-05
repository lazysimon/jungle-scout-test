import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'

export default class ASINInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      asin: '',
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const { asin } = this.state
    this.setState({ isLoading: true })
  
    this.props.scrapeAndSave(asin)
      .then(() => {
        this.setState({ isLoading: false, asin: ''})
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const { isLoading, asin } = this.state

    return (
      <Container
        textAlign='left'
        className='asin-input-container'
      >
        <Form onSubmit={() => this.onSubmit(asin)}>
          <h4>Get Product Data by ASIN:</h4>
          <Form.Input
            className='asin-input'
            value={asin} 
            disabled={isLoading} 
            placeholder='ASIN' 
            onChange={(event) => this.setState({asin: event.target.value})}
          />
          <Button
            className='asin-submit-btn'
            type='submit'
            loading={isLoading}
          >
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}