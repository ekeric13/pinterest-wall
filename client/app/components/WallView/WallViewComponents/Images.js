var React = require("react");
var Reflux = require("reflux");
var Image = require("./Image");
var ImageStore = require("../../../stores/ImageStore");
var ImageActions = require("../../../actions/ImageActions");

var parallaxizedDone = false;
var gotImages = false;

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
    $(window).resize(_.debounce(this.doneResizingWindow, 2000));

    // short-term hack to get around history api
    if (gotImages){
      this.masonize();
      parallaxizedDone = false
      this.parralaxize();
    }
  },

  startResizingWindow: function() {
    window.parallax.disable();
  },

  doneResizingWindow: function() {
    windowResizeDone = true;
    this.enableParallaxAgain();
  },

  doneMasonizing: function() {
    masonizeDone = true;
    this.enableParallaxAgain();
  },

  enableParallaxAgain: function() {
    if (masonizeDone) {
      if (windowResizeDone) {
        window.parallax.enable();
        window.parallax.updateLayers();
      }
    }
  },

  masonize: function() {
    var imageGrid = document.querySelector('.columns');
    var height = $(".columns").height();

    if( height > 0 ) { // or some other number
        $(".columns").height( height );
    }
    var masonedImages = new Masonry(imageGrid, {
      columnWidth: 300,
      itemSelector: '.image-container',
      isFitWidth: true,
      gutter: 20
    });
    masonedImages.bindResize();
    masonedImages.reloadItems();
    masonedImages.on("layoutComplete", this.doneMasonizing);
  },

  parralaxize: function() {
    if (!parallaxizedDone) {
      var scene = document.getElementById('scene');
      window.parallax = new Parallax(scene);
      parallaxizedDone = true;
    }
  },

  loadMoreImages: function() {
    ImageActions.getNewPage();
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ images: ImageStore.getAll() });
    }

    gotImages = true;
    // jQuery actions after images load
    this.masonize();
    this.parralaxize();
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

    // avoid parallax while images are filtered
    if ( $(".image-container") >= 20){
      this.parralaxize();
    }
  }



});

module.exports = Images;
