import React, { Component } from 'react'

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '“We shape our tools and thereafter our tools shape us”'
    }
  }
  render() {
    return (
      <blockquote className="component">
        <a href="https://twitter.com/home?status=${this.state.quote} - Marshall McLuhan">
        {this.state.quote}
        </a>
        - Marshall McLuhan
      </blockquote>
      )
  }
}
