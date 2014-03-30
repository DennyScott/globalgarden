Template.light.events({

	'click #lightruleButton' : function () {
		//SET RULE TRUE, AUTO FALSE
	},
	'click #lightautoButton' : function() {
		//SET AUTO TRUE, RULE FALSE
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