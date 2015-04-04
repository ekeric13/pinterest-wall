var React = require("react");


var Image = React.createClass({

  componentDidMount: function(){
    $(".image").css({"background-image": "url('"+this.props.imgSrc+"')"});
  },

  render: function(){
    return (
    <div className="image-container">
      <span> image is here </span>
      <div className="image" />
    </div>
    );
  }
});

module.exports = Image;
