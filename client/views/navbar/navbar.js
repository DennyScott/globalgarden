Template.navbar.helpers({
	loggedIn: function () {
		return Meteor.user();
	},

	email: function() {
		return Meteor.user().emails[0].address;
	},

	"active":function(path){
		if(Router.current().path === path){
			return "active";
		}
	}
});

Template.navbar.events({
	'click #sign-out': function () {
		Meteor.logout();
		Router.go("home");
	}
});

Template.navbar.rendered = function () {
};

