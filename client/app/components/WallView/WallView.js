var React = require("react");
var Images = require("./WallViewComponents/Images");
var SearchBar = require("./WallViewComponents/SearchBar");

var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var WallView = React.createClass({

  mixins: [PureRenderMixin],


  getInitialState: function() {
    return {
      filterTag: ''
    };
  },

  handleUserInput: function(filterTag) {
      this.setState({
          filterTag: filterTag
      });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterTag={this.state.filterTag}
          onUserInput={this.handleUserInput}
         />
        <Images filterTag={this.state.filterTag} />
      </div>
    )
  }
});

module.exports = WallView;
