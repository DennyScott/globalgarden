Template.temperature.events({

	'click #ruleButton' : function () {
		Session.set('tempType', 'rules');
	},
	'click #autoButton' : function() {
		Session.set('tempType', 'auto');
	}
});

Template.temperature.helpers({
	isAuto: function () {
		return false;
	},
	isRules: function() {
		return false;
	}
});