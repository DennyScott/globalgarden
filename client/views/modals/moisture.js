var tempType = "auto";
Template.moisture.events({

	'click #ruleButton' : function () {
		tempType = "rules";
		$('#moisturecollapseOne').collapse('hide');
	},
	'click #autoButton' : function() {
		tempType = "auto";
		$('#moistureCollapseTwo').collapse('hide');
	},
	'click #saveChanges' : function() {
		if(tempType === "rules"){
			var tempMin = $("#moistMin").val();
			var tempMax = $("#moistMax").val();
			if((!$.isNumeric(tempMin) && tempMin.length > 0) || (!$.isNumeric(tempMax) && tempMax.length > 0)){
				console.log("Incorrect Values");
			} else if (tempMin.length === 0 && tempMax.length === 0){
				Meteor.call("autoSprinklerOff", this._id);
			} else {
				tempMax = parseFloat(tempMax);
				tempMin = parseFloat(tempMin);
				Meteor.call("newSprinklerMax", this._id, tempMax);
				Meteor.call("newSprinklerMin", this._id, tempMin);
				Meteor.call("autoSprinklerOn", this._id);
				Meteor.call("moistureRulesOn", this._id);
			}
		} else if (tempType === "auto"){
			var tempCheck = $('#moistCheck').val();
			if(!$.isNumeric(tempCheck) && tempCheck.length > 0){
				console.log("Incorrect Value");
			} else if (tempCheck.length === 0){
				Meteor.call("autoSprinklerOff", this._id);
			}else {
				tempCheck = parseFloat(tempCheck);
				Meteor.call("newSprinklerMax", this._id, tempCheck+1);
				Meteor.call("newSprinklerMin", this._id, tempCheck-1);
				Meteor.call("autoSprinklerOn", this._id);
				Meteor.call("moistureRulesOff", this._id);
			}
		}
	}
});

Template.moisture.helpers({
	isAuto: function () {
		var returnVal = "";
		if(this.autoWater === true && this.moistureRules === false)
			returnVal = "in";
		return returnVal;
	},
	isNeither: function () {
		var returnVal = "";
		if(this.autoWater === false)
			returnVal = "in";
		return returnVal;
	},
	isRules: function() {
		var returnVal = "";
		if(this.autoWater === true && this.moistureRules === true)
			returnVal = "in";
		return returnVal;
	},
	getMoisture: function() {
	    if(this.autoWater){
	            return this.autoWaterMax-1;
	    }
	},
	getMoistureMin: function() {
	    if(this.autoWater){
	            return this.autoWaterMin;
	    }
	},
	getMoistureMax: function() {
	    if(this.autoWater){
	            return this.autoWaterMax;
	    }
	}
});