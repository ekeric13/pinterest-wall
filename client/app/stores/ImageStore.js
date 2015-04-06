var Reflux = require("reflux");
var ImageActions = require("../actions/ImageActions");

// Needs to be a multiple of 5
var initialAmountOfImages = 20;

var currentPage = (20/5) + 1;

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
      url: 'http://getchute.com/v2/albums/aus6kwrg/assets?per_page=' + initialAmountOfImages
    })
    .done(function (images) {
      this.parseData(images);
      // broadcast that _images has changed
      this.trigger();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  getNewPage: function() {
    $.ajax({
      type: 'GET',
      url: 'http://getchute.com/v2/albums/aus6kwrg/assets?page=' + currentPage
    })
    .done(function (images) {
      this.parseData(images);

      // increase page number
      currentPage++;
      // broadcast that _images has changed
      this.trigger();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  parseData: function(images) {
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
    console.log(this._images);
  }

});

module.exports = ImageStore;
