Meteor.startup(function() {
	AccountsEntry.config({
		defaultProfile: {
			someDefault: 'default'
		}
	});
});