var React = require("react");
var Reflux = require("reflux");
var Image = require("./Image");

var ImageStore = require("../../../stores/ImageStore");
var ImageActions = require("../../../actions/ImageActions");

// var MasonryMixin = require('react-masonry-mixin');
// var masonryOptions = {
//     transitionDuration: 0
// };
var Images = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    filterTag: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      images: ImageStore.getAll()
    };
    // var stub = [{_id: "1", url: "https://media.getchute.com/m/12I4gudgjf/c/2500342/500x300"}, {_id: "2", url: "https://media.getchute.com/m/12I4gudgjf/c/2500342/fit/500x300"}];
    // return {
    //   images: stub
    // };
  },

  componentDidMount: function () {
    if (this.state.images.length === 0) {
      ImageActions.getAllImages();
    }
    this.listenTo(ImageStore, this.onStoreChange);

    var self = this;
    $(window).on("scroll", this.onWindowScroll);
  },

  onWindowScroll: function() {
    var self = this;
    if($(window).scrollTop() + $(window).height() > $(document).height() - 30) {
      self.loadMoreImages();
      console.log("loading!");
    } else {
      var loading = $(".load-more-btn").html();
      if ( loading === "Loading more images") {
        $(".load-more-btn").html("Want more?");
      }
    }
  },

  loadMoreImages: function() {
    $(window).off("scroll");
    $(".load-more-btn").html("Loading more images");
    var self = this;
    window.setTimeout(function(){
      $(window).on("scroll", self.onWindowScroll);
    }, 3000);
    console.log("Here are the images");
    ImageActions.getNewPage();
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ images: ImageStore.getAll() });
    }

    // jQuery actions after images load
    var scene = document.getElementById('scene');
    window.parallax = new Parallax(scene);
    $(".load-more-btn").html("Want more?");
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

    this.sortImages();

    return (

    <div>
      <div id="scene" className="columns">
        { images }
      </div>
      <div className="load-more-btn"></div>
      <br/>
      <br/>
    </div>
    );
  },

  componentDidUpdate: function() {
    // console.log("update?");
    // this.sortImages();
  },

  sortImages: function() {
    var
      columns = $(".columns"),
      child = columns.find("div.image-container"),
      len = $(".image-container").length,
      frag = "", frag_origin = "",
      currentWidth = 320, // default minimum-width
      _activeWidth = 100;

      function columCountAction(activeWidth) {
        currentWidth = $(document).width();
        if(frag_origin == "")
          frag_origin = manipulateDom();
          if(currentWidth >= activeWidth) { // check condition width
              if(frag == "")
                frag += manipulateDom(1);
              columns.html(frag);

          } else { // apply original DOM
              columns.html(frag_origin);
          }
      } // columCountAction function
      function manipulateDom(check) {
        var i = k =0,container = "";
        if(typeof check === "undefined") {
          for(; i < len;i++)
                  container += child[i].outerHTML;
        } else {
          for(; i < len;i++) {
            if(i%2 == 0) {
              container += child[i].outerHTML;
            }
          }
          for(; k < len;k++) {
            if(k%2 != 0) {
                container += child[k].outerHTML;
            }
          }
        }
        return container;
      }
    columCountAction(_activeWidth);
  }



});

module.exports = Images;
