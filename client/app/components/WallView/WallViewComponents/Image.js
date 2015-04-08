var React = require("react");
var cx = React.addons.classSet;

var Image = React.createClass({

  displayName: 'Image',

  propTypes: {
    id: React.PropTypes.number,
    _id: React.PropTypes.number,
    imgSrc: React.PropTypes.string,
    imgThumbnail: React.PropTypes.string,
    imgCaption: React.PropTypes.string,
    avatar: React.PropTypes.string,
    username: React.PropTypes.string,
    votes: React.PropTypes.number,
    hearts: React.PropTypes.number,
    tags: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      lightbox: false
    };
  },

  componentDidMount: function(){
    $("#image-" + this.props._id).css({"background-image": "url('"+this.props.imgSrc+"')"});
  },


  render: function(){
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    var caption = this.props.imgCaption;
    var imageId = "image-"+this.props._id;
    var imageLightboxHref = this.props.imgSrc;
    var lightboxNum = this.props.id;
    var w2 = this.props._id % 3 === 0 ? 'w2' : '';
    // var w3 = this.props._id % 4 === 0 ? 'w3' : '';
    var h2Cap;
    var h2Img;
    if (this.props._id % 2 === 0) {
      h2Cap = 'height2Cap';
      h2Img = 'height2Img';
    }
    var classes = cx('image-container', 'layer', 'expand-width', w2);
    var imageClasses = cx('image', h2Img ,'modal-trigger');
    var captionClasses = cx('image-caption', h2Cap);

    var min = 0;
    var max = .2;
    var calculateRandomNum = Math.random() * ( max - min) + min;
    var dataDepth = calculateRandomNum.toString().substring(0,4);

    return (
    <div id={this.props._id} className={classes} data-depth={dataDepth}>
      <a href={imageLightboxHref} data-lightbox="image-1" data-title={caption} ><div id={imageId} className={imageClasses} onClick={this.lightboxOpen} /></a>
      <div className={captionClasses}>
        <span> {caption} </span>
      </div>
      <div className="row favorite">
        <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 hearts-number">{this.props.hearts}</span>
        <span className="col s2 m2 l2 ion-heart hearts-icon pop" />
        <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 votes-number">{this.props.votes}</span>
        <span className="col s2 m2 l2 ion-android-arrow-up votes-icon grow"/>
      </div>
      <div className="tags">{this.props.tags}</div>


    </div>
    );
  }

});

module.exports = Image;
