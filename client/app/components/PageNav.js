var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var PageNav = React.createClass({

  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div>
        <header>
          <nav>
            <div className="nav-wrapper blue darken-3 row">
              <div className="pinterested col s4 m3 l2"><span className="flow-text">Pinterested</span></div>
            </div>
          </nav>
        </header>
      </div>
    );
  }

});

module.exports = PageNav;
