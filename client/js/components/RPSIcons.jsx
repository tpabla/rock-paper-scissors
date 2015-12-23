RPSIcons = React.createClass({
    getInitialState() {
      return {};
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
      return {};
    },

    selectAction(action) {
      console.log(action);
      id = this.props.activeGame._id;
      nickname = Session.get('nickname');
      this.props.makeMove(id, action, nickname);
    },

    selectRock(){
      this.selectAction('rock');
    },

    selectPaper(){
      this.selectAction('paper');
    },
    
    selectScissors(){
      this.selectAction('scissors');
    },

    render() {
      return (
        <div className = 'rps-icons'>
          <div className = "icon" onClick = {this.selectRock}>
            <i className="fa fa-hand-rock-o fa-5x" ></i>
            <p>Rock</p>
          </div>
          <div className = "icon" onClick = {this.selectPaper}>
            <i className="fa fa-hand-paper-o fa-5x" ></i>
            <p>Paper</p>
          </div>
          <div className = "icon" onClick = {this.selectScissors}>
            <i className="fa fa-hand-scissors-o fa-5x"></i>
            <p>Scissors</p>
          </div>
        </div>
      );
    }
});
