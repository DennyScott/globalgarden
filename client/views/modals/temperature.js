var tempType = "auto";
Template.temperature.events({

	'click #ruleButton' : function () {
		tempType = "rules";
		$('#collapseOne').collapse('hide');
	},
	'click #autoButton' : function() {
		tempType = "auto";
		$('#collapseTwo').collapse('hide');
	},
	'click #saveChanges' : function() {
		if(tempType === "rules"){
			var tempMin = $("#tempMin").val();
			var tempMax = $("#tempMax").val();
			if((!$.isNumeric(tempMin) && tempMin.length > 0) || (!$.isNumeric(tempMax) && tempMax.length > 0)){
				console.log("Incorrect Values");
			} else if (tempMin.length === 0 && tempMax.length === 0){
				Meteor.call("autoHeaterOff", this._id);
			} else {
				tempMax = parseFloat(tempMax);
				tempMin = parseFloat(tempMin);
				Meteor.call("newHeaterMax", this._id, tempMax);
				Meteor.call("newHeaterMin", this._id, tempMin);
				Meteor.call("autoHeaterOn", this._id);
				Meteor.call("heatRulesOn", this._id);
			}
		} else if (tempType === "auto"){
			var tempCheck = $('#temp').val();
			if(!$.isNumeric(tempCheck) && tempCheck.length > 0){
				console.log("Incorrect Value");
			} else if (tempCheck.length === 0){
				Meteor.call("autoHeaterOff", this._id);
			}else {
				tempCheck = parseFloat(tempCheck);
				Meteor.call("newHeaterMax", this._id, tempCheck+1);
				Meteor.call("newHeaterMin", this._id, tempCheck-1);
				Meteor.call("autoHeaterOn", this._id);
				Meteor.call("heatRulesOff", this._id);
			}
		}
	}
});

Template.temperature.helpers({
	isAuto: function () {
		var returnVal = "";
		if(this.autoHeat === true && this.heatRules === false)
			returnVal = "in";
		return returnVal;
	},
	isRules: function() {
		var returnVal = "";
		if(this.autoHeat === true && this.heatRules === true)
			returnVal = "in";
		return returnVal;
	},
	getTemp: function() {
        if(this.autoHeat){
                return this.autoHeatMax-1;
        }
    },
    getTempMax: function() {
        if(this.autoHeat){
                return this.autoHeatMax;
        }
    },
    getTempMin: function() {
        if(this.autoHeat){
                return this.autoHeatMin;
        }
    }
});