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
			temp: {
				current: 0,
				dateHistory: []
			},
			humidity: {
				current: 0,
				dateHistory: []
			},
			moisture: {
				current: 0,
				dateHistory: []
			},
			light: {
				current: 0,
				dateHistory: []
			},
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
			found.temp = insertIntoHistory(temp, found.temp);
			Gardens.update(gardenId, found);
		}
	},

	insertHumidity: function(gardenId, humidity){
		found = Gardens.findOne(gardenId);

		if(found){
			found.humidity = insertIntoHistory(humidity, found.humidity);
			Gardens.update(gardenId, found);
		}
	},

	insertMoisture: function(gardenId, moisture){
		found = Gardens.findOne(gardenId);

		if(found){
			found.moisture = insertIntoHistory(moisture, found.moisture);
			Gardens.update(gardenId, found);
		}
	},

	insertLight: function(gardenId, light){
		var found = Gardens.findOne(gardenId);

		if(found){
			found.light = insertIntoHistory(light, found.light);
			Gardens.update(gardenId, found);
		}
	},

});

function insertIntoHistory(val, insertArray){
	insertArray.current = val;
	newHistory = {
		'date': new Date(),
		'val': val
	};
	insertArray.dateHistory[insertArray.dateHistory.length] = newHistory;
	return insertArray;
}