Template.newgarden.events({
	'click #createGarden': function () {
		var name = $('#gardenname').val();
		var type = $('#gardentype').val();

		if(name === "" || type === ""){
			$('#create-error').toggle();
		}else{
			Meteor.call('createGarden', {name: name, type: type});
			$('#create-error').hide();
			$('#newgarden').modal('hide');
		}
	}
});