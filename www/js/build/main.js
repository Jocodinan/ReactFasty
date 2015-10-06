"use strict";

(function (window, document, $, React, undefined) {

  var Listado = React.createClass({
    displayName: "Listado",

    getInitialState: function getInitialState() {
      return { data: [] };
    },
    callInfo: function callInfo() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: (function (data) {
          this.setState({ data: data });
        }).bind(this),
        error: (function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }).bind(this)
      });
    },
    componentDidMount: function componentDidMount() {
      setInterval(this.callInfo, this.props.time);
    },
    render: function render() {
      var personas = this.state.data.map(function (persona) {
        return React.createElement(
          "li",
          null,
          persona.author
        );
      });

      return React.createElement(
        "ul",
        { className: "commentBox" },
        personas
      );
    }
  });

  React.render(React.createElement(Listado, { url: "js/json/nombres.json", time: "2000" }), document.getElementById('content'));
})(undefined, document, jQuery, React);