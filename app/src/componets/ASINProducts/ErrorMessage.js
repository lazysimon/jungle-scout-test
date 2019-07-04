import React, { Component } from 'react'
import { Container, Message } from 'semantic-ui-react'

export default class ErrorMessage extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Container className='error-message-container'>
        <Message negative>
          <Message.Header>{this.props.message}</Message.Header>
        </Message>
      </Container>
    )
  }
}