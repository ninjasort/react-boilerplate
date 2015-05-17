var React = require('react');

var Component = React.createClass({

  render: function () {
    return (
        <blockquote className="component">
          “We shape our tools and thereafter our tools shape us”
          - Marshall McLuhan
        </blockquote>
      );
  }

});

React.render(<Component />, document.querySelector('.inject'));
