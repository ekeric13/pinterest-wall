var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
var Reflux = require("reflux");
var Images = require("./WallViewComponents/Images");
var SearchBar = require("./WallViewComponents/SearchBar");

// var UserStore = require("../../stores/UserStore");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var WallView = React.createClass({

  mixins: [Navigation, PureRenderMixin],


  getInitialState: function() {
    return {
      filterTag: ''
    };
  },

  componentDidMount: function() {
    // this.listenTo(UserStore, this.onStoreChange);
  },

  onStoreChange: function() {
    // if(this.isMounted()) {
    //   this.setState({ currentUser: UserStore.get() });
    // }
 },

  componentDidUpdate: function() {
    // if(this.state.currentUser){
    //   this.transitionTo('/rooms');
    // }
  },

  handleUserInput: function(filterTag) {
      this.setState({
          filterTag: filterTag
      });
  },


  render: function() {
    return (
      <div>
        <h1> Hey, this is wall view </h1>
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
