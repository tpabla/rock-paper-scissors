Meteor.startup(function() {
  const {Router, Route, IndexRoute, Link} = ReactRouter;

  const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

  //<LandingPage activeGame = {this.state.activeGame} changeGameState = {this.changeGameState} />
  
  nickRedirect = (nextState, replaceState) => {
    if (Session.get('nickname') === undefined) {
      console.log("Redirecting to set nickname");
      
      query = '';
      if (window.location.pathname === "/player1") {
        query = "?player=1";
      } else if (window.location.pathname === "/player2") {
        query = "?player=2";
      }
      replaceState({nextPathName: nextState.location.pathname}, "/nick" + query);
    }
  }

  ReactDOM.render((
    <Router history={history}>
      <Route path = "/" component = {App}>
        <IndexRoute component = {LandingPage} />
        <Route path = "/player1" component = {ActiveGame} onEnter = {nickRedirect} />
        <Route path = "/player2" component = {ActiveGame} onEnter = {nickRedirect} />
        <Route path = "/nick" component = {NickName} />
      </Route>
    </Router>
    ), document.getElementById("render-target")
  );
});
