App = React.createClass({
    getInitialState() {
      return {
        activeGame: undefined,
      };
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
      //retrieve all games played (limited to 10)
      Meteor.subscribe('getAllGames');

      allGames = Games.find({});
      activeGame = Games.findOne({active:true});

      return {
        games: allGames.fetch(),
        activeGame: activeGame,
      };
    },

    enterGame() {
      nickname = Session.get('nickname');

      if (nickname === undefined) {
        this.props.history.replaceState(null, '/nick');
      } else if (this.data.activeGame === undefined) {
        //create a game
        console.log('creating game');
        Meteor.call('createGame', nickname);
        this.props.history.replaceState(null, '/player1');
      } else {
        if (this.data.activeGame.player1.name === nickname) {
          this.props.history.replaceState(null, '/player1');
        } else if (this.data.activeGame.player2.name === nickname) {
          this.props.history.replaceState(null, '/player2');
        } else if (this.data.activeGame.player2.name === null) {
          //Join Game Based on NickName
          Meteor.call('joinGame', this.data.activeGame._id, nickname);
        } else {
          alert("Game Currently In Progress Please Return to Home Screen");
        }
      }
    },

    makeMove(id, action, nickname) {
      winner = Meteor.call('makeMove', id, action, nickname);
    },

    render() {
        return (
            <div className = "container">
              <Header />
              {React.cloneElement(this.props.children, {activeGame: this.data.activeGame, enterGame: this.enterGame, makeMove: this.makeMove})}
            </div>
        );
    }
});

