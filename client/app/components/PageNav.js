var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
// var UserAuth = require("./UserAuth");
// var UserStore = require("../stores/UserStore");
var Link = Router.Link;
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var PageNav = React.createClass({

  mixins: [Navigation, PureRenderMixin],

  getInitialState: function() {
    return {
    //   currentUser: UserStore.get()
    };
  },

  onStoreChange: function() {
    // if(this.isMounted()) {
    //   this.setState({ currentUser: UserStore.get() });
    // }
  },

  componentDidMount: function() {
    // this.listenTo(UserStore, this.onStoreChange);
  },

  handleWelcome: function() {
    //if logged in, redirect to rooms
    if (this.state.currentUser){
      this.transitionTo('/rooms');
    } else {
      this.transitionTo('/');
    }
  },

  render: function() {
    return (
      <div>
        <header>
          <nav>
            <div className="blue darken-3">
              <ul className="left hide-on-med-and-down">
                <li>
                  <div>Pinterested</div>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }

});

module.exports = PageNav;
