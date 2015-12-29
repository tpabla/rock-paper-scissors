LandingPage = React.createClass({
    getInitialState() {
      return {};
    },

    enterGame(playerNum) {
      return this.props.enterGame(playerNum);
    },

    render() {
      var mainpage;
      if (this.props.activeGame !== undefined) {
        mainpage = <button onClick = {this.enterGame.bind(this, 2)}> Join Active Game </button>;
      }else {
        mainpage = <button onClick = {this.enterGame.bind(this, 1)}> Start New Game </button>;
      }
      
      return (
        <div className = 'landing-page'>
          <div className = 'game-enter'>
            <h3>Welcome to the one and only destination on the web to play realtime Rock Paper Scissors!</h3>
            {mainpage}
          </div>
          <CurrentGame game = {this.props.lastGame} activeGame = {this.props.activeGame} />
        </div>
      );
    }
});
