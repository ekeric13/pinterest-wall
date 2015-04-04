var React = require("react");


var Image = React.createClass({

  componentDidMount: function(){
    console.log("props " +this.props._id, this.props);
    $("#" + this.props._id).css({"background-image": "url('"+this.props.imgSrc+"')"});
    // every other image (or at least some) is a bit smaller
    if (this.props._id % 2 === 0) {
      $("#" + this.props._id).css({"height": "220px"});
    }
  },

  render: function(){
    var caption = this.props.imgCaption;
    console.log("caption? string?")
    console.log(caption.toString());
    return (
    <div className="image-container">
      <span> image is here </span>
      <div id={this.props._id} className="image" />
      <div className="image-caption">
        <span> {caption} </span>
      </div>
      <div>
        <span> {this.props.votes} </span>
        <span> {this.props.hearts} </span>
      </div>
    </div>
    );
  }
});

module.exports = Image;
