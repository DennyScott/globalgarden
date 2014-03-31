get_history_days = function(gardenId, days){
	console.log('in days');
	console.log(gardenId);
	console.log(days);
	var found = Gardens.findOne(gardenId);
	console.log(found);
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

