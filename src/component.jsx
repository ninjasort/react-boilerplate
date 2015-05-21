import React from 'react';

class Component extends React.Component {

  constructor(props) {
    super(props);
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
      );
  }

}

export default Component;
