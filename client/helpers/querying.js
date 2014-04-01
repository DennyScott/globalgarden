get_history_days = function(gardenId, days){
	// if(!Session.get('currentID')){
	// 	var garden = Gardens.findOne({user_id: Meteor.userId()});
	// 	if(typeof garden !== 'undefined'){
	// 		Session.set('currentID', garden._id);
	// 	}
	// 	Router.go('garden');
	// } else {
		var found = Gardens.findOne(gardenId);

		var start = new Date(new Date().setDate(new Date().getDate()-days));
		var history;
		var dateFound = false;
		var i = 0;
		var returnArray = [];
		if(found){
			if(found.date){
				while(!dateFound && i < found.date.length){
					if(found.date[i]>= start){
						dateFound = true;
					} else {
						i++;
					}
				}
				returnArray = found.date.slice(i);
			}
		}
		return returnArray;
	// }
};

get_history_attribute = function(gardenId, amount, attribute){
	var found = Gardens.findOne(gardenId);
	var i;
	var returnArray;
	if(attribute === "temperature"){
		i = found.temp.length - amount;
		returnArray = found.temp.slice(i);
	}else if(attribute === "humidity"){
		i = found.humidity.length - amount;
		returnArray = found.humidity.slice(i);
	}else if(attribute == "moisture"){
		i = found.moisture.length - amount;
		returnArray = found.moisture.slice(i);
	}else{
		i = found.light.length - amount;
		returnArray = found.light.slice(i);
	}
	return returnArray;
};

