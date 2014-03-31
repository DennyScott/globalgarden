Router.configure({
  layoutTemplate: 'default',
  yieldTemplates: {
	'navbar': {to: 'navbar'},
  }
});

Router.map(function() {
	this.route('garden',{
		path: '/',
		template: 'garden',
		data: function() {
			return Gardens.findOne({user_id: Meteor.userId()});
		},
		waitOn: function(){
			return Meteor.subscribe('gardens', Meteor.userId());
		}
	});

	this.route('home', {
		path:'/',
		template: 'home',
		layoutTemplate: ''
	});
});

//Check if user is logged in, if not, load Splash template.
var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			Router.go('home');
		this.stop();
	}
};

//Force all pages to load at the top of the page, and remove any styles to body
var loadAtTop = function() {
	window.scrollTo(0,0);
	var body = $('body');
	body.removeAttr('style'); //Static pages were being made larger by height attr.
};

Router.before(requireLogin, {except: ['home', 'entrySignIn', 'entrySignUp', 'sign-in', 'sign-up']});
Router.load(loadAtTop); //Load all pages from the top of the page.
