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
});