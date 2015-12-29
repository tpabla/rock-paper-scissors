NickName = React.createClass({
  getInitialState() {
    return {};
  },

  setNick(event) {
    event.preventDefault();
    Session.set('nickname', this.refs.nick.value);
    
    player = null;
    queryParams = this.props.location.query;
    if ('player' in queryParams) {
      player = queryParams['player'];
    }
    this.props.enterGame(player);
  },

  render() {
    nickname = Session.get('nickname');
    return (
      <div className = 'nick-container'>
        <div className = 'nickname'>
          <form onSubmit = {this.setNick}>
            Please Enter a Nickname:<br/>
            <input type="text" name="nick" ref = 'nick'></input>
            <br/>
          </form>
        </div>
      </div>
    );
  }
});
