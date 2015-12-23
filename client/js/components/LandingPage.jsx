LandingPage = React.createClass({
    getInitialState() {
      return {};
    },

    render() {
      var mainpage;
      console.log(this.props.activeGame);
      if (this.props.activeGame !== undefined) {
        mainpage = <button onClick = {this.props.enterGame}> Join Active Game </button>;
      }else {
        mainpage = <button onClick = {this.props.enterGame}> Start New Game </button>;
      }
      
      return (
        <div className = 'landing-page'>
          <h3>Welcome to the one and only destination on the web to play realtime Rock Paper Scissors!</h3>
          {mainpage}
          <h4> All Games </h4>
        </div>
      );
    }
});
