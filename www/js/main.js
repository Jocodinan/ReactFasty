(function (window, document, $, React, undefined) {


    var Listado = React.createClass({
      getInitialState: function() {
        return {data: []};
      },
      callInfo : function(){
         $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      componentDidMount: function() {
        setInterval(this.callInfo, this.props.time);
      },
      render: function() {
        var personas = this.state.data.map(function (persona) {
          return (
              <li>{persona.author}</li>
          );
        });

        return (
          <ul className="commentBox">
            {personas}
          </ul>
        );
      }
    });

    React.render(
      <Listado url="js/json/nombres.json" time="2000" />,
      document.getElementById('content')
    );
        
} (this, document, jQuery, React));