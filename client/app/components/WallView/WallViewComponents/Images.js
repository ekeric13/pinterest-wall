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
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ images: ImageStore.getAll() });
    }
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
        // if (idea.ownerName.toLowerCase().indexOf(self.props.filterNames.toLowerCase()) !== -1)
    });
    return (

    <div>
      <div className="columns">
        { images }
      </div>
    </div>
    );
  }



});

module.exports = Images;
