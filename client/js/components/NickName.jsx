NickName = React.createClass({
    getInitialState() {
      return {};
    },

    setNick(event) {
      event.preventDefault();
      Session.set('nickname', this.refs.nick.value);
      this.props.enterGame();
    },

    render() {
      nickname = Session.get('nickname');
      return (
        <div className = 'nick-container'>
          <div className = 'nickname'>
            <form onSubmit = {this.setNick}>
              Please Enter a Nickname:<br/>
              <input type="text" name="nick" ref = 'nick' value = {nickname}></input>
              <br/>
            </form>
          </div>
        </div>
      );
    }
});
