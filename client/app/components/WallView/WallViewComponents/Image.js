var React = require("react");
// var Lightbox = require("./Lightbox");
var ReactBootstrap = require("react-bootstrap");
var mui = require('material-ui');
var Dialog = mui.Dialog;
var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var LightboxModal = require("./LightboxModal");
// var NewDialog = require("./NewDialog");

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
    // every other image (or at least some) is a bit smaller
    // $("#" + this.props._id).css("left", 275*(+this.props.id) +"px" );
    // if (this.props._id % 2 === 0) {
    //   $("#" + this.props._id).addClass("w2");
    // }
  },

  componentDidUpdate: function() {
    // if (this.state.lightbox) {
    //   //activate materialize modal
    //    $('#modal1').openModal();
    //    // this.setState({lightbox : !this.state.lightbox});
    // }
  },

  render: function(){
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

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
    var imageClasses = cx('image', h2Img ,'modal-trigger');
    var captionClasses = cx('image-caption', h2Cap);

    // if (this.state.lightbox) {
    // }
    // if (lightboxModal === undefined) {
    //   this.setState({lightbox : !this.state.lightbox});
    // }
    return (
    <div id={this.props._id} className={classes}>
      <LightboxModal {...this.props} />
      <div id={imageId} className={imageClasses} onClick={this.lightboxOpen} />
      <div className={captionClasses}>
        <span> {caption} </span>
      </div>
      <div className="row favorite">
        <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 hearts-number">{this.props.hearts}</span>
        <span className="col s2 m2 l2 ion-heart hearts-icon" />
        <span className="col offset-s2 s1 offset-m2 m1 offset-l2 l1 votes-number">{this.props.votes}</span>
        <span className="col s2 m2 l2 ion-android-arrow-up votes-icon"/>
      </div>
      <div className="tags">{this.props.tags}</div>


    </div>
    );
  },

  lightboxOpen: function(e) {
    e.preventDefault();
    var selector = '#modal' +this.props.id;
    $(selector).openModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    });
    // if (this.isMounted()) {
    //   this.setState({lightbox : !this.state.lightbox});
    // }
  }

  // handleStandardDialogTouchTap: function() {
  //   console.log("here");
  //   // if (this.isMounted ()) {
  //   //   this.setState ({lightbox : !this.state.lightbox});
  //   // }
  //     this.refs.standardDialog.show();
  // }

});

module.exports = Image;
