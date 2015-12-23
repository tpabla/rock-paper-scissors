Meteor.startup(function() {
  const {Router, Route, IndexRoute, Link} = ReactRouter;

  const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

  //<LandingPage activeGame = {this.state.activeGame} changeGameState = {this.changeGameState} />
  ReactDOM.render((
    <Router history={history}>
      <Route path = "/" component = {App}>
        <IndexRoute component = {LandingPage} />
        <Route path = "/player1" component = {ActiveGame} />
        <Route path = "/player2" component = {ActiveGame} />
        <Route path = "/nick" component = {NickName} />
      </Route>
    </Router>
    ), document.getElementById("render-target")
  );
});
