 get_history_days = function(gardenId, numberOfDays, type){
		var found = Gardens.findOne(gardenId);
		type = type.toLowerCase();
		var history;
		if(found){
			if(type === "temperature"){
				history = getHistoryFromArray(numberOfDays, found.temp.dateHistory);
			} else if(type === "humidity"){
				history = getHistoryFromArray(numberOfDays, found.humidity.dateHistory);
			} else if(type === "moisture"){
				history = getHistoryFromArray(numberOfDays, found.moisture.dateHistory);
			} else if(type === "light"){
				history = getHistoryFromArray(numberOfDays, found.light.dateHistory);
			}
		}
		return history;
};

getHistoryFromArray = function(days, findArray){
	var start = new Date(new Date().setDate(new Date().getDate()-days));
	returnArray = [];
	for(var i =0; i < findArray.length; i++){
		if(findArray[i].date >= start){
			returnArray[returnArray.length] = findArray[i];
		}
	}
	return returnArray;
};