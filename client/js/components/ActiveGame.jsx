const {Link} = ReactRouter;

ActiveGame = React.createClass({
    componentWillMount() {
      if (this.props.activeGame !== undefined) {
        Session.set('curr_game_id', this.props.activeGame._id);
      }
    },

    getInitialState() {
      return {};
    },

    render() {
      if (this.props.activeGame !== undefined && this.props.activeGame._id !== Session.get('curr_game_id')) {
        return (
          <div className = "active-game">
            <div className = "winner">
              <div className = "header">
                <h1> Game Over </h1>
              </div>
              <div className = "content">
                <p> New Game Has Begun </p>
              </div>
              <div className = "bottom-button">
                <Link to="/"><button>Go Home</button></Link>
              </div>
            </div>
          </div>
        );
      } else if (this.props.lastGame.active === false) {
        return (
          <div className = "active-game">
            <div className = "winner">
              <div className = "header">
                <h1> Game Over </h1>
              </div>
              <div className = "content">
                <p> Current Game Ended </p>
              </div>
              <div className = "bottom-button">
                <Link to="/"><button>Go Home</button></Link>
              </div>
            </div>
          </div>
        );
      } else {

        nickname = Session.get('nickname');

        player1 = this.props.lastGame.player1.name;
        player2 = this.props.lastGame.player2.name;
        playerOneMove = this.props.lastGame.player1.move;
        playerTwoMove = this.props.lastGame.player2.move;

        if (player2 === null) {
          player2 = "Waiting for Player to Join";
        } else if (player1 === null) {
          player1 = "Waiting for Player to Join";
        }
        
        //handle showing and hiding of rps game icons 
        playerOneHide = false;
        playerTwoHide = false;
        if (nickname == player1) {
          if (playerOneMove === null) {
            playerTwoHide = true;
          }
        }else if (nickname == player2) {
          if (playerTwoMove === null) {
            playerOneHide = true;
          }
        }

        isWon = this.props.lastGame.winner !== null;

        winnerClass = '';
        winnerContent = '';
        if (this.props.lastGame.winner == "tie") {
          winnerClass = "tie";
          winnerContent = "Tie Game!";
        } else if (this.props.lastGame.winner == null) {
          winnerClass = '';
          winnerContent = '';
        } else {
          winnerPlayer = this.props.lastGame.winner;
          winnerNick = this.props.lastGame[winnerPlayer].name;
          if (winnerNick === nickname) {
            winnerClass = "win";
            winnerContent = "Congratulations! You won!";
          } else {
            winnerClass = "lose";
            winnerContent = "Ouch! Looks like you lost!";
          }
        }

        return (
          <div className = 'active-game'>
            <div className = "player1">
              <h3> Player 1 </h3>
              <h4>{player1}</h4>
              <h4>{playerOneMove === null ? "(Selecting)" : "(Selected)"}</h4>
                {React.cloneElement(<RPSIcons />, {lastGame: this.props.lastGame, player: player1, history: this.props.history, hide: playerOneHide})}
            </div>
            <div className = "player2">
              <h3> Player 2 </h3>
              <h4>{player2}</h4>
              <h4>{playerTwoMove === null ? "(Selecting)" : "(Selected)"}</h4>
                {React.cloneElement(<RPSIcons />, {lastGame: this.props.lastGame, player: player2, history: this.props.history, hide: playerTwoHide})}
            </div>
            <div className = {"vs " + (isWon ? 'hidden' : '')}>
              <h1>VS.</h1>
            </div>
            <div className = {"winner " + (!isWon ? "hidden" : "")}>
              <div className = "header">
                <h1> Game Result </h1>
              </div>
              <div className = {"content " + winnerClass}>
                <p> {winnerContent} </p>
              </div>
              <div className = "bottom-button">
                <Link to="/"><button>Go Home</button></Link>
              </div>
            </div>
          </div>
        );
      }
    }
});
