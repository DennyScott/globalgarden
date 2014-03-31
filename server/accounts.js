Meteor.startup(function() {
	AccountsEntry.config({
		defaultProfile: {
			someDefault: 'default'
		}
	});
});

Accounts.onCreateUser(function(options, user) {
  Meteor.call("createFirstGarden", {name: "Kitchen-Demo", type: "Tulips"}, user);
  return user;
});