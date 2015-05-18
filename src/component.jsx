'use strict';

var React = require('react');

var Component = React.createClass({

  render: function () {
    return (
        <blockquote className="component">
          <a href="https://twitter.com/home?status=“We shape our tools and thereafter our tools shape us” - Marshall McLuhan">
          “We shape our tools and thereafter our tools shape us”
          </a>
          - Marshall McLuhan
        </blockquote>
      );
  }

});

React.render(<Component />, document.querySelector('.inject'));
