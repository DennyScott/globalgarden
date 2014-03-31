 get_history_days = function(gardenId, days){
		var found = Gardens.findOne(gardenId);
		var start = new Date(new Date().setDate(new Date().getDate()-days));
		var history;
		var dateFound = false;
		var i = 0;
		while(!dateFound && i < found.date.length){
			if(found.date[i]>= start){
				dateFound = true;
				console.log("hit");
			} else {
				i++;
				console.log("inc");
			}
		}
		var returnArray = found.date.slice(i);
		return returnArray;
};

get_history_temp = function(gardenId, amount){
	var found = Gardens.findOne(gardenId);
	var i = found.temp.length - amount;
	var returnArray = found.temp.slice(i);
	return returnArray;
};

get_history_humidity = function(gardenId, amount){
	var found = Gardens.findOne(gardenId);
	var i = found.humidity.length - amount;
	var returnArray = found.humidity.slice(i);
	return returnArray;
};

get_history_moisture = function(gardenId, amount){
	var found = Gardens.findOne(gardenId);
	var i = found.moisture.length - amount;
	var returnArray = found.moisture.slice(i);
	return returnArray;
};

get_history_light = function(gardenId, amount){
	var found = Gardens.findOne(gardenId);
	var i = found.light.length - amount;
	var returnArray = found.light.slice(i);
	return returnArray;
};

