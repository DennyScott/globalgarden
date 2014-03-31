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
		onBeforeAction: function() {
			if(!Session.get('currentID')){
				var garden = Gardens.findOne({user_id: Meteor.userId()});
				if(typeof garden !== 'undefined'){
					Session.set('currentID', garden._id);
				}
			}
		},
		data: function() {
			if(!Session.get('currentID')){
				var garden = Gardens.findOne({user_id: Meteor.userId()});
				if(typeof garden !== 'undefined'){
					Session.set('currentID', garden._id);
				} else {
					if(Meteor.user()){
						// garden = Gardens.findOne({user_id: Meteor.userId()});
						// Session.set('currentID', garden._id);
						// console.log(garden);
					}
				}
				return garden;

			}else{
				return Gardens.findOne({_id: Session.get('currentID')});
			}

			
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
