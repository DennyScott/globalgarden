Router.configure({
  layoutTemplate: 'default',
  yieldTemplates: {
	'navbar': {to: 'navbar'},
  }
});

Router.map(function() {
	this.route('home',{
		path: '/',
		template: 'garden'
	});

	this.route('analytics',{
		path: '/analytics',
		template: 'analytics',
		onBeforeAction: function () {
			Session.set("data", Gardens.findOne().temp);
		}
	});
});