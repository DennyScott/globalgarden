Template.humidity.events({

	'click #humidityruleButton' : function () {
		//SET RULE TRUE, AUTO FALSE
	},
	'click #humidityautoButton' : function() {
		//SET AUTO TRUE, RULE FALSE
	}
});

Template.humidity.helpers({
	isAuto: function () {
		return "in";
	},
	isRules: function() {
		return false;
	}
});