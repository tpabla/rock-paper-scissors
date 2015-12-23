ActiveGame = React.createClass({
    getInitialState() {
      return {};
    },

    render() {
      nickname = Session.get('nickname');

      player1 = this.props.activeGame.player1.name;
      player2 = this.props.activeGame.player2.name;

      if (player2 === null) {
        player2 = "Waiting for Player to Join";
      }
      return (
        <div className = 'active-game'>
          <div className = "player1">
            <h3> Player 1 </h3>
            <h4>{player1}</h4>
              {React.cloneElement(<RPSIcons />, {activeGame: this.props.activeGame, makeMove: this.props.makeMove})}
          </div>
          <div className = "player2">
            <h3> Player 2 </h3>
            <h4>{player2}</h4>
              {React.cloneElement(<RPSIcons />, {activeGame: this.props.activeGame, makeMove: this.props.makeMove})}
          </div>
        </div>
      );
    }
});
