var tempType = "auto";
Template.humidity.events({
	'click #ruleButton' : function () {
		tempType = "rules";
		$('#humiditycollapseOne').collapse('hide');
	},
	'click #autoButton' : function() {
		tempType = "auto";
		$('#humidityCollapseTwo').collapse('hide');
	},
	'click #saveChanges' : function() {
		if(tempType === "rules"){
			var tempMin = $("#humMin").val();
			var tempMax = $("#humMax").val();
			if((!$.isNumeric(tempMin) && tempMin.length > 0) || (!$.isNumeric(tempMax) && tempMax.length > 0)){
				console.log("Incorrect Values");
			} else if (tempMin.length === 0 && tempMax.length === 0){
				Meteor.call("autoHumidifierOff", this._id);
			} else {
				tempMax = parseFloat(tempMax);
				tempMin = parseFloat(tempMin);
				Meteor.call("newHumidifierMax", this._id, tempMax);
				Meteor.call("newHumidifierMin", this._id, tempMin);
				Meteor.call("autoHumidifierOn", this._id);
				Meteor.call("humidityRulesOn", this._id);
			}
		} else if (tempType === "auto"){
			var tempCheck = $('#humCheck').val();
			console.log(tempCheck);
			console.log(tempCheck.length);
			if(!$.isNumeric(tempCheck) && tempCheck.length > 0){
				console.log("Incorrect Value");
			} else if (tempCheck.length === 0){
				Meteor.call("autoHumidifierOff", this._id);
			}else {
				tempCheck = parseFloat(tempCheck);
				Meteor.call("newHumidifierMax", this._id, tempCheck+1);
				Meteor.call("newHumidifierMin", this._id, tempCheck-1);
				Meteor.call("autoHumidifierOn", this._id);
				Meteor.call("humidityRulesOff", this._id);
			}
		}
	}
});

Template.humidity.helpers({
	isAuto: function () {
		var returnVal = "";
		if(this.autoHum === true && this.humidityRules === false)
			returnVal = "in";
		return returnVal;
	},
	isNeither: function () {
		var returnVal = "";
		if(this.autoHum === false)
			returnVal = "in";
		return returnVal;
	},
	isRules: function() {
		var returnVal = "";
		if(this.autoHum === true && this.humidityRules === true)
			returnVal = "in";
		return returnVal;
	},
	getHumidity: function() {
	    if(this.autoHum){
            	return this.autoHumMax-1;
    	}
	},
	getHumidityMax: function() {
	    if(this.autoHum){
            	return this.autoHumMax;
    	}
	},
	getHumidityMin: function() {
	    if(this.autoHum){
            	return this.autoHumMin;
    	}
	}
});