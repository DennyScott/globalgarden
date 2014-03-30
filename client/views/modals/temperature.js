Template.temperature.events({

	'click #ruleButton' : function () {
		//SET RULE TRUE, AUTO FALSE
	},
	'click #autoButton' : function() {
		//SET AUTO TRUE, RULE FALSE
	}
});

Template.temperature.helpers({
	isAuto: function () {
		return "in";
	},
	isRules: function() {
		return false;
	}
});