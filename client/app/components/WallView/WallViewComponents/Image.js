var React = require("react");

var cx = React.addons.classSet;


var Image = React.createClass({

  componentDidMount: function(){
    console.log("props " +this.props._id, this.props);
    $("#image-" + this.props._id).css({"background-image": "url('"+this.props.imgSrc+"')"});
    // every other image (or at least some) is a bit smaller
    // $("#" + this.props._id).css("left", 275*(+this.props.id) +"px" );
    // if (this.props._id % 2 === 0) {
    //   $("#" + this.props._id).addClass("w2");
    // }
  },

  render: function(){
    var caption = this.props.imgCaption;
    var imageId = "image-"+this.props._id;
    // var w2 = this.props._id % 2 === 0 ? 'w2' : '';
    var h2Cap;
    var h2Img;
    if (this.props._id % 2 === 0) {
      h2Cap = 'height2Cap';
      h2Img = 'height2Img';
    }
    var classes = cx('image-container');
    var imageClasses = cx('image', h2Img);
    var captionClasses = cx('image-caption', h2Cap);
    console.log("key?")
    console.log(this.props.id);
    return (
    <div id={this.props._id} className={classes}>
      <div id={imageId} className={imageClasses} />
      <div className={captionClasses}>
        <span> {caption} </span>
      </div>
      <div className="row favorite">
              <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 hearts-number">{this.props.hearts}</span>
              <span className="col s2 m2 l2 ion-heart hearts-icon"/>

              <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 votes-number">{this.props.votes}</span>
              <span className="col s2 m2 l2 ion-android-arrow-up votes-icon" />

      </div>
    </div>
    );
  }
});

module.exports = Image;
