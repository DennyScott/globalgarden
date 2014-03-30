Template.moisture.events({

	'click #moistureruleButton' : function () {
		//SET RULE TRUE, AUTO FALSE
	},
	'click #moistureautoButton' : function() {
		//SET AUTO TRUE, RULE FALSE
	}
});

Template.moisture.helpers({
	isAuto: function () {
		return "in";
	},
	isRules: function() {
		return false;
	}
});