Meteor.publish("gardens", function(myId) {
	return Gardens.find({user_id: myId});
});