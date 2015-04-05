var Reflux = require("reflux");
var ImageActions = require("../actions/ImageActions");

var ImageStore = Reflux.createStore({

  listenables: ImageActions,

  _images: [],

  getAll: function() {
    console.log("got all images");
    return this._images;
  },

  getAllImages: function() {
    console.log("get all images");

    // to get more data:
    // http://getchute.com/v2/albums/aus6kwrg/assets?per_page=10
    $.ajax({
      type: 'GET',
      url: 'http://getchute.com/v2/albums/aus6kwrg/assets?per_page=20'
    })
    .done(function (images) {
      var imageData = JSON.parse(images).data;
      console.log("ajax complete2", JSON.parse(images));


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
      console.log("done with for loop", this._images);
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
