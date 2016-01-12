Meteor.methods({
  createGame: function(nickname, playerNum) {
    activeGame = Games.findOne({active: true});
    if (activeGame !== undefined) {
      throw new Meteor.Error(409, "Game Already Active, Cannot Create New Game");
      return activeGame;
    }

    record = {
      player1: {
        name: null,
        move: null
      },
      player2: {
        name: null,
        move: null,
      },
      winner: null,
      createdAt: new Date().valueOf(),
      active: true,
    }

    if (playerNum == 1) {
      record.player1.name = nickname;
    } else if (playerNum == 2) {
      record.player2.name = nickname;
    } else {
      throw Meteor.Error(415, "Invalid Player");
    }
    console.log(record);
    curr_game = Games.insert(record);
    return curr_game;
  },

  joinGame: function(id, nickname, playerNum) {
    activeGame = Games.findOne({active: true});
    
    if (playerNum !== null) {
      if (playerNum == 1 && activeGame.player1.name === null) {
        console.log('setting player 1 with player num');
        Games.update({"_id": id}, {"$set": {"player1.name": nickname}});
      } else if (playerNum == 2 && activeGame.player2.name === null) {
        console.log('setting player 2 with player num');
        Games.update({"_id": id}, {"$set": {"player2.name": nickname}});
      } else {
        throw new Meteor.Error(415, "Invalid Player");
        return null;
      }
    } else {
      if (activeGame.player1.name === null) {
        console.log('setting player 1');
        return Games.update({"_id": id}, {"$set": {"player1.name": nickname}});
      } else if (activeGame.player2.name === null) {
        console.log('setting player 2');
        Games.update({"_id": id}, {"$set": {"player2.name": nickname}});
      } else {
        throw new Meteor.Error(409, "Game active, nickname invalid");
        return null;
      }
    }
    return Games.findOne({"_id": id});

  },
  
  endGame: function(id) {
    return Games.update({"_id": id}, {"$set": {"active": false}});
  },

  makeMove: function(id, action, nickname) {
    game = Games.findOne({"_id": id});
    validMoves = ['rock', 'paper', 'scissors'];
    if (!action in validMoves) {
      throw new Meteor.Error(415, "Invalid Action");
    }

    determineWiner = (playerOneMove, playerTwoMove) => {
      winTable = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
      }
      console.log(game);
      if (playerOneMove === playerTwoMove) {
        return "tie";
      } else {
        if (winTable[playerOneMove] === playerTwoMove) {
          return 'player1';
        } else {
          return 'player2';
        }
      }
      return null;
    };

    winner = null;
    active = true;

    if (game.player1.name == nickname && game.player1.move === null) {
      if (game.player2.move !== null) {
        winner = determineWiner(action, game.player2.move);
      }

      if (winner !== null) {
        active = false;
      }

      Games.update({"_id": id}, {"$set": {"player1.move": action, "winner": winner, "active" : active}});
    }else if (game.player2.name == nickname && game.player2.move === null) {
      if (game.player1.move !== null) {
        winner = determineWiner(game.player1.move, action);
      }
      
      if (winner !== null) {
        active = false;
      }

      Games.update({"_id": id}, {"$set": {"player2.move": action, "winner": winner, "active": active}});
    }else {
      throw new Meteor.Error(401, "Unauthorized update of game");
      return false
    }
    
    game = Games.findOne({"_id": id});
    return true;
  }
});
