var Reflux = require("reflux");
var ImageActions = require("../actions/ImageActions");

var ImageStore = Reflux.createStore({

  listenables: ImageActions,

  _images: [],

  getAll: function() {
    console.log("got all images")
    return this._images;
  },

  getAllImages: function() {
    console.log("get all images");
    var stub = [{_id: "1", url: "https://media.getchute.com/m/12I4gudgjf/c/2500342/500x300"}, {_id: "2", url: "https://media.getchute.com/m/12I4gudgjf/c/2500342/fit/500x300"}];
    // return {
    //   images: stub
    // };
    this._images = stub;
    this.trigger();
    // $.ajax({
    //   type: 'GET',
    //   url: '/images'
    // })
    // .done(function (images) {
    //   this._images = images;
    //   // broadcast that _ideas has changed
    //   this.trigger();
    // }.bind(this))
    // .fail(function(error) {
    //   console.error(error);
    // });
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
