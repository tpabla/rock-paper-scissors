Meteor.methods({
  createGame: function(nickname) {
    activeGame = Games.findOne({active: true});
    if (activeGame !== undefined) {
      throw new Meteor.Error(409, "Game Already Active, Cannot Create New Game");
      return activeGame;
    }
    curr_game = Games.insert({
      "player1": {
        name: nickname,
        move: null
      },
      player2: {
        name: null,
        move: null,
      },
      createdAt: new Date().valueOf(),
      active: true,
    });
    return curr_game;
  },

  joinGame: function(id, nickname) {
    return Games.update({"_id": id}, {"$set": {"player2.name": nickname}});
  },

  makeMove: function(id, action, nickname) {
    console.log(id)
    console.log(action)
    console.log(nickname)
    game = Games.findOne({"_id": id});
    console.log(game)
    if (game.player1.name == nickname) {
      Games.update({"_id": id}, {"$set": {"player1.move": action}});
    }else if (game.player2.name == nickname) {
      Games.update({"_id": id}, {"$set": {"player2.move": action}});
    }else {
      throw new Meteor.Error(401, "Unauthorized update of game");
    }
  }
});
