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

      activeGame = Games.findOne({active:true});
      lastGame = Games.findOne({}, {sort: {createdAt: -1}});

      return {
        lastGame: lastGame,
        activeGame: activeGame,
      };
    },

    enterGame(player = null) {
      nickname = Session.get('nickname');

      if (nickname === undefined) {
        this.props.history.pushState(null, '/nick');
      } else if (this.data.activeGame === undefined) {
        //create a game
        console.log('creating game');
        if (player === null) {
          player = 1;
        }

        Meteor.call('createGame', nickname, player, (err, result) => {
          if (err) {
            console.log(err);
          }
          if(result) {
            console.log(result);
            route = '/'
            if (player === 1) {
              route = '/player1';
            } else {
              route = '/player2';
            }
          }

          this.props.history.pushState(null, route);
        });

      } else { 
        if (this.data.activeGame.player1.name === nickname) {
          console.log("Player 1 Active");
          this.props.history.pushState(null, '/player1');
        } else if (this.data.activeGame.player2.name === nickname) {
          console.log("Player 2 Active");
          this.props.history.pushState(null, '/player2');
        } else if (this.data.activeGame.player2.name === null || this.data.activeGame.player1.name === null) {
          //Join Game Based on NickName
          Meteor.call('joinGame', this.data.activeGame._id, nickname, player, (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result) {
              console.log(result);
              console.log(Session.get('nickname'));
              if (Session.get('nickname') === result.player1.name) {
                this.props.history.pushState(null, '/player1');
              } else if (Session.get('nickname') === result.player2.name) {
                this.props.history.pushState(null, '/player2');
              } else {
                this.props.history.pushState(null, '/');
              }
            }
          });
        } else {
          alert("Game Currently In Progress Please Return to Home Screen");
        }
      }
    },


    render() {
        return (
            <div className = "container">
              <Header />
              {React.cloneElement(this.props.children, {activeGame: this.data.activeGame, lastGame: this.data.lastGame,  enterGame: this.enterGame, history: this.props.history})}
            </div>
        );
    }
});

