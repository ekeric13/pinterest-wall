var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var SearchBar = React.createClass({

  mixins: PureRenderMixin,

  propTypes: {
    filterTag: React.PropTypes.string,
    onUserInput: React.PropTypes.func
  },

  handleChange: function() {
    this.props.onUserInput(
        this.refs.filterTagInput.getDOMNode().value
    );
  },

  handleSubmit: function(e){
    e.preventDefault();
  },

  render: function() {
      return (
          <form className="search-tag-form" onSubmit={this.handleSubmit}>
              <span> Filter by tags: </span>
              <input
                  type="text"
                  placeholder="Search for tag"
                  value={this.props.filterTag}
                  ref="filterTagInput"
                  onChange={this.handleChange}
              />
          </form>
      );
  }
});

module.exports = SearchBar;
