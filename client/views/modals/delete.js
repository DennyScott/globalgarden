Template.deleteTem.events({
	'click #saveChanges' : function() {
		var user = Meteor.user();

		var amount = Gardens.find({"user_id": user._id}).count();
		if(amount > 1){
			Meteor.call("removeGarden", this._id);
		} else {
			alert("You must have at least 1 garden");
		}
	}
});