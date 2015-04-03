var React = require("react");
var Router = require('react-router');
var BrainstormApp = require("./components/App");
var IndexView = require("./components/IndexView/IndexView");
var NotFoundView = require("./components/NotFoundView/NotFoundView");

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute  handler={IndexView} />
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
