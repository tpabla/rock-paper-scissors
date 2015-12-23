Meteor.publish('getAllGames', function() {
    return Games.find({}, {limit: 10, createdAt: -1})
});
