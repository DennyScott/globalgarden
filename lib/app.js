Router.configure({
  layoutTemplate: 'default',
  yieldTemplates: {
	'navbar': {to: 'navbar'},
	'footer': {to: 'footer'}
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
		before: function () {
			Session.set("data", Gardens.findOne().temp);
		}
	});
});