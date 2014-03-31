var tempType = "auto";
Template.light.events({

	'click #ruleButton' : function () {
		tempType = "rules";
	},
	'click #autoButton' : function() {
		tempType = "auto";
	},
	'click #saveChanges' : function() {
		if (tempType === "auto"){
			Meteor.call("newLightMax", this._id, 19);
			Meteor.call("newLightMin", this._id, 7);
			Meteor.call("autoLightOn", this._id);
		}
	}
});

Template.light.helpers({
	isAuto: function () {
		return "in";
	},
	isRules: function() {
		return false;
	}
});