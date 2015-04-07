var React = require("react");
var Reflux = require("reflux");
var Image = require("./Image");
var ImageStore = require("../../../stores/ImageStore");
var ImageActions = require("../../../actions/ImageActions");

var Images = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    filterTag: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      images: ImageStore.getAll()
    };
  },

  componentDidMount: function () {
    if (this.state.images.length === 0) {
      ImageActions.getAllImages();
      $(".search-tag-form").before("<div class='loading'></div>");
    }
    this.listenTo(ImageStore, this.onStoreChange);

    $(".load-more-btn").on("click", this.loadMoreImages);
    $(window).on("resize", this.startResizingWindow);

    if ( $('.image-container') ){
      this.masonize();
      this.parralaxize();
    }
  },

  startResizingWindow: function() {
    window.parallax.disable();
  },

  doneResizingWindow: function() {
    window.parallax.enable();
  },

  masonize: function() {
    var imageGrid = document.querySelector('.columns');
    var masonedImages = new Masonry(imageGrid, {
      columnWidth: 300,
      itemSelector: '.image-container',
      isFitWidth: true,
      gutter: 20
    });
    masonedImages.on("layoutComplete", this.doneResizingWindow);
  },

  parralaxize: function() {
    var scene = document.getElementById('scene');
    window.parallax = new Parallax(scene);
  },

  loadMoreImages: function() {
    ImageActions.getNewPage();
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ images: ImageStore.getAll() });
    }

    // jQuery actions after images load
    this.parralaxize();
    this.masonize();
  },

  render: function() {
    var images = [];
    var self = this;
    // create all idea components
    this.state.images.forEach(function(image, index) {
      var tagsArray = image.tags;
      var foundTag = false;
      for (var i = 0; i < tagsArray.length; i++) {
        var tag = tagsArray[i];
        if (tag.toLowerCase().indexOf(self.props.filterTag.toLowerCase()) !== -1) {
          foundTag = true;
        }
      }
      if (foundTag) {
        images.push(<Image key={index} id={index} _id={image.id} imgSrc={image.url} imgThumbnail={image.thumbnail} imgCaption={image.caption} username={image.username} avatar={image.avatar} tags={image.tags} votes={image.votes} hearts={image.hearts} />);
      }
    });



    return (

    <div className="image-columns">
      <div id="scene" className="columns">
        { images }
      </div>
      <br/>
      <br/>
      <div className="load-more-btn blue darken-3 waves-effect waves-light btn">Want more?</div>
    </div>
    );
  },

  componentDidUpdate: function() {
    if ($(".loading")) {
      $(".loading").remove();
    }
    this.masonize();
  }



});

module.exports = Images;
