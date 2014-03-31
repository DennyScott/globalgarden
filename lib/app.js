Router.configure({
  layoutTemplate: 'default',
  yieldTemplates: {
	'navbar': {to: 'navbar'},
  }
});

Router.map(function() {
	this.route('home',{
		path: '/',
		template: 'garden',
		data: function() {
			return Gardens.findOne({user_id: Meteor.userId()});
		},
		waitOn: function(){
			return Meteor.subscribe('gardens', Meteor.userId());
		}
	});

	this.route('analytics',{
		path: '/analytics',
		template: 'analytics',
		onBeforeAction: function () {
			Session.set("data", Gardens.findOne().temp);
		}
	});
});