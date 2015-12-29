RPSIcons = React.createClass({
    getInitialState() {
      return {};
    },
    
    selectAction(action) {
      id = this.props.lastGame._id;
      nickname = Session.get('nickname');

      if (this.props.player == Session.get('nickname')) {
        Meteor.call('makeMove', id, action, nickname, (err, result) => {
          if (err) {
            console.log(err);
          };
        });
      };
    },

    render() {
      backgroundClass = "selected-background";

      game = this.props.lastGame;
      move = ''
      if(game.player1.name == this.props.player && game.player1.move !== null && this.props.hide == false) {
        move = game.player1.move;
      }else if(game.player2.name == this.props.player && game.player2.move !== null && this.props.hide == false) {
        move = game.player2.move;
      }

      return (
        <div className = 'rps-icons'>
          <div className = {"icon " + (move === 'rock' ? backgroundClass : '')} onClick = {this.selectAction.bind(this, 'rock')}>
            <i className="fa fa-hand-rock-o fa-5x" ></i>
            <p>Rock</p>
          </div>
          <div className = {"icon " + (move === 'paper' ? backgroundClass : '')} onClick = {this.selectAction.bind(this, 'paper')}>
            <i className="fa fa-hand-paper-o fa-5x" ></i>
            <p>Paper</p>
          </div>
          <div className = {"icon " + (move === 'scissors' ? backgroundClass : '')} onClick = {this.selectAction.bind(this, 'scissors')}>
            <i className="fa fa-hand-scissors-o fa-5x"></i>
            <p>Scissors</p>
          </div>
        </div>
      );
    }
});
