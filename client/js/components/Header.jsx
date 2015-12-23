const {Link} = ReactRouter;

Header = React.createClass({
    getInitialState() {
        return {};
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {};
    },

    render() {
        return (
          <header>
            <Link to="/"><h1>Rock, Paper, Scissors Battle!</h1></Link>
          </header>
        );
    }
});
