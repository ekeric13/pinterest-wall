var React = require("react");
var Reflux = require("reflux");
var Image = require("./Image");

var ImageStore = require("../../../stores/ImageStore");
var ImageActions = require("../../../actions/ImageActions");


var Images = React.createClass({

  mixins: [Reflux.ListenerMixin],

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
    console.log("images component mount", this.state.images.length);
    if (this.state.images.length === 0) {
      ImageActions.getAllImages();
    }
    this.listenTo(ImageStore, this.onStoreChange);
  },

  onStoreChange: function(){
    var self = this;
    if(this.isMounted()) {
      this.setState({ images: ImageStore.getAll() });
      console.log("store change", this.state.images);
    }
  },

  render: function() {
    var images = [];
    var self = this;
    // create all idea components
    this.state.images.forEach(function(image) {
      console.log("in state for loop", image);
      // if (idea.name.toLowerCase().indexOf(self.props.filterText.toLowerCase()) !== -1)
        // if (idea.ownerName.toLowerCase().indexOf(self.props.filterNames.toLowerCase()) !== -1)
      images.push(<Image key={image.id} _id={image.id} imgSrc={image.url} imgThumbnail={image.thumbnail} imgCaption={image.caption} username={image.username} avatar={image.avatar} tags={image.tags} votes={image.votes} hearts={image.hearts} />);
    });
    console.log("imgage array", images);
    return (

    <div>
      <div>
        { images }
      </div>
    </div>
    );
  }



});

module.exports = Images;
