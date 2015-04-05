var Reflux = require("reflux");
var ImageActions = require("../actions/ImageActions");

var ImageStore = Reflux.createStore({

  listenables: ImageActions,

  _images: [],

  getAll: function() {
    return this._images;
  },

  getAllImages: function() {

    // to get more data:
    // http://getchute.com/v2/albums/aus6kwrg/assets?per_page=10
    $.ajax({
      type: 'GET',
      url: 'http://getchute.com/v2/albums/aus6kwrg/assets?per_page=20'
    })
    .done(function (images) {
      var imageData = JSON.parse(images).data;


      for (var i = 0; i < imageData.length; i++) {
        var imageAttributes = {};
        var currentImageData = imageData[i];
        imageAttributes["id"] = currentImageData.id;
        imageAttributes["url"] = currentImageData.source.source_url;
        imageAttributes["thumbnail"] = currentImageData.thumbnail;
        imageAttributes["caption"] = currentImageData.caption;
        imageAttributes["username"] = currentImageData.username;
        imageAttributes["avatar"] = currentImageData.user.avatar;
        imageAttributes["votes"] = currentImageData.votes;
        imageAttributes["hearts"] = currentImageData.hearts;
        imageAttributes["tags"] = currentImageData.tags;

        this._images.push(imageAttributes);
      }
      // broadcast that _images has changed
      this.trigger();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  getImage: function(imageId) {
    console.log("got image");
    // $.ajax({
    //   type: 'GET',
    //   url: '/brainswarms/' + idea_id
    // })
    // .done(function (brainswarmsData) {
    // //reflux call to update
    //   this.trigger();
    //   if (brainswarmsData) {
    //     return callback(brainswarmsData[0]);
    //   }
    // }.bind(this))
    // .fail(function(error) {
    //   console.error(error);
    // });
  }

});

module.exports = ImageStore;
