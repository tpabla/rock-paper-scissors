CurrentGame = React.createClass({
  endGame() {
    id = this.props.activeGame._id;
    Meteor.call('endGame', id, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result);
      }
    });
  },

  render() {
    if (this.props.game !== undefined) {
      if (this.props.game.active === true) {
        winnerContent = <button onClick = {this.endGame}> End Game </button>;
      } else {
        winnerContent = "";
        if (this.props.game.winner === null) {
          winnerContent = "No Winner";
        } else if (this.props.game.winner === "tie") {
          winnerContent = "Tie Game";
        } else {
          winnerContent = this.props.game[this.props.game.winner].name;
        }
      }

      return (
        <div className = "current-game">
          <h1> Last Game </h1>
          <table>
            <thead>
              <tr>
                <th>Player 1 </th>
                <th>Player 2 </th>
                <th>{this.props.game.winner !== null ? "Winner" : "End Game"}</th>
              </tr>
            </thead>
            <tbody>
              <tr data-gameid = {this.props.game._id}>
                <td>{this.props.game.player1.name}</td>
                <td>{this.props.game.player2.name}</td>
                <td>{winnerContent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className = "current-game">
          <h1> Last Game </h1>
          <h3> No Previous Games </h3>
        </div>
      );
    }
  }
});
