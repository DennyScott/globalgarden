Gardens = new Meteor.Collection('gardens');

Meteor.methods({
	/**
	 * This function will data validate the new project being passed
	 * and then if no errors occur, place this new project in
	 * the Project collection
	 * @param  {[object]} projectAttributes [A prelimeanry project object, containg the title, description, and url]
	 * @return {[string]}                   [A String of its ID in the collection]
	 */
	createGarden: function(gardenAttributes){

		var user = Meteor.user();
		// var userName = Meteor.user().profile.name;

		//Ensures that the user is logged in
		if (!user){
			throw new Meteor.Error(401, "You need to log in to create new projects");
		}

		if(!gardenAttributes.name){
			throw new Meteor.Error(422, 'Error 422: Project must have a name');
		}

		if(Gardens.findOne({"name" : gardenAttributes.name})) {
			throw new Meteor.Error(423, 'Must have a unique name');
		}

		//filling in other keys
		var proj = _.extend(_.pick(gardenAttributes, 'name', 'type'), {
			user_id: user._id,
			// user_name: userName,
			created: new Date().getTime(),
			temp: [],
			humidity: [],
			moisture: [],
			light: [],
			date: [],
			autoHeat: false,
			autoHeatMin: 20,
			autoHeatMax: 30,
			autoHum: false,
			autoHumMin: 20,
			autoHumMax: 30,
			autoWater: false,
			autoWaterMin: 20,
			autoWaterMax: 30,
			sprinklerOn: false,
			heaterOn: false,
			humidifierOn: false,
			lightsOn: false,
			sprinkler: {}
		});

		//Inserts new project into collection
		var gardenID = Gardens.insert(proj);
		//returns the ID of the new project
		return gardenID;
	},

	insertTemperature: function(gardenId, temp){
		found = Gardens.findOne(gardenId);
		if(found){
			found.temp[found.temp.length] = parseFloat(temp.toFixed(2));
			Gardens.update(gardenId, found);
		}
	},

	insertHumidity: function(gardenId, humidity){
		found = Gardens.findOne(gardenId);

		if(found){
			found.humidity[found.humidity.length] = parseFloat(humidity.toFixed(2));
			Gardens.update(gardenId, found);
		}
	},

	insertMoisture: function(gardenId, moisture){
		found = Gardens.findOne(gardenId);

		if(found){
			found.moisture[found.moisture.length] = parseFloat(moisture.toFixed(2));
			Gardens.update(gardenId, found);
		}
	},

	insertLight: function(gardenId, light){
		var found = Gardens.findOne(gardenId);

		if(found){
			found.light[found.light.length] = parseFloat(light.toFixed(2));
			Gardens.update(gardenId, found);
		}
	},

	insertDate: function(gardenId){
		var found = Gardens.findOne(gardenId);

		if(found){
			found.date[found.date.length] = new Date();
			Gardens.update(gardenId, found);
		}
	}

});