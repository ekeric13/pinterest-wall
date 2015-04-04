var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
var Reflux = require("reflux");
// var UserStore = require("../../stores/UserStore");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var IndexView = React.createClass({

  mixins: [Navigation, Reflux.ListenerMixin, PureRenderMixin],

  getInitialState: function() {
    // return {
    //   currentUser: UserStore.get()
    // }
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


  render: function() {
    return (
      <div>
        <h1> Hey, this is index view </h1>
      </div>
    )
  }
});

module.exports = IndexView;