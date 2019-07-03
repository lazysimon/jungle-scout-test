import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'

export default class ASINInput extends Component {
  constructor(props) {
    super(props)


    this.state = {
      isLoading: false,
    }
  }

  async componentDidMount() {

  }

  onSubmitInput(e) {
    this.props.input()
  }

  render() {
    return (
      <Container className='asin-input-container'>
        <Form>
        <Form.Input className='asin-input' placeholder='ASIN' />
          <Button className='asin-submit-btn' type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}