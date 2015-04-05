var React = require('react');
// var IdeaActions = require("../../../actions/IdeaActions");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


var LightboxModal = React.createClass({

  mixins: [PureRenderMixin],

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

  // delete: function(e) {
  //   e.preventDefault();
  //   //cancels call if id is empty or undefined
  //   if(this.props.id === '' || undefined){
  //     return;
  //   }
  //   if (this.isMounted()) {
  //      // IdeaActions.delete({ id: this.props.id, owner: this.props.owner });
  //   }
  // },

  componentDidMount: function() {
    // $(".modal").css("width", "80%");
    // var modalHeight = $(".lightbox").css("height");
    // var modalHeightNum = +modalHeight.substring(0, modalHeight.length -2);
    // var heightDifferential = Math.abs(window.innerHeight - modalHeightNum);
    // var height = Math.min(window.innerHeight, modalHeightNum) - heightDifferential;

    $("#image-" + this.props.id).css({"background-image": "url('"+this.props.imgSrc+"')"});
    $("#avatar-" + this.props.id).css({"background-image": "url('"+this.props.avatar+"')"});
  },
  componentDidUpdate: function() {
    // $(".modal").css("width", "80%");
    // $("#modal" + this.props.id).css({"top": "5%"});
  },

  render: function() {
    var modalId = "modal" + this.props.id;
    var imageId = "image-" + this.props.id;
    var avatarId = "avatar-" + this.props.id;
    return (
      <div>

        <div id={modalId} className="modal lightbox">
          <div className="modal-content">
            <div className="user row">
              <span id={avatarId} className="avatar col"/>
              <span className="username col s1 m1 l1"><span className="float-text">{this.props.username}</span></span>
            </div>
            <div id={imageId} className='lightbox-image' />
            <div className="lightbox-image-caption">
              <span> {this.props.imgCaption} </span>
            </div>
            <div className="row lightbox-favorite">
                    <span className="col offset-s1 s1 offset-m2 m1 offset-l2 l1 hearts-number">{this.props.hearts}</span>
                    <span className="col offset-s1 s2 m2 l1 ion-heart hearts-icon" />

                    <span className="col offset-s2 s1 offset-m2 m1 offset-l4 l1 votes-number">{this.props.votes}</span>
                    <span className="col offset-s1 s2 m2 l1 ion-android-arrow-up votes-icon"/>

            </div>
            <div className="lightbox-tags">{this.props.tags}</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LightboxModal;
