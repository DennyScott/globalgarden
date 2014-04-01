Template.newgarden.events({
	'click #createGarden': function () {
		var name = $('#gardenname').val();
		var type = $('#gardentype').val();

		if(name === "" || type === ""){
			$('#create-error').toggle();
		}else{
			var found = Gardens.find({user_id: Meteor.userId()}).count();
			Meteor.call('createGarden', {name: name, type: type});
			$('#create-error').hide();
			$('#newgarden').modal('hide');
			if(found === 0){
				location.reload();
			}
		}
	}
});