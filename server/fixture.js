//TIME VARIABLES
var runId;
var timeScale = 1;
var baseIterationTime = 7000;
var iterationTime = 7000;
var minimumIntervalTime = 3000;

//TEMPERATURE VARIABLES
var tempInc = 0;
var tempUpOdd = 1; //Out of 10
var tempMax = 28;
var tempMin = 17;
var tempVariance = 0.8;

//HEATER VARIABLES
var tempIterations = 3;
var heaterTempIncrease = 0.6;
var heaterMoistureDecrease = 0.1;

//MOISTURE VARIABLES
var moistInc = 0;
var moistUpOdd = 1; //Out of 10
var moistMax = 28;
var moistMin = 0;
var moistVariance = 0.2;

//SPINKLER VARIABLES
var sprinklerIterations = 4;
var sprinklerTempIncrease = 1;
var sprinklerHumIncrease = 1;
var sprinklerMoistureLightIncrease = 20;
var sprinklerMoistureMediumIncrease = 40;
var sprinklerMoistureHeavyIncrease = 60;

//HUMIDITY VARIABLES
var humInc = 0;
var humUpOdd = 2; //Out of 10
var humMax = 28;
var humMin = 16;
var humVariance = 0.3;
var humFixMult = 4;

//HUMIDIFIER VARIABLES
var humIterations = 5;
var humidHumidIncrease = 1;
var humidTempIncrease = 0.1;

//LIGHT VARIABLES
var lightInc = 0;
var lightUpOdd = 5; //Out of 10
var lightMax = 28;
var lightMin = 21;
var lightVariance = 0.01;

// LIGHTS VARIABLES
var lightIterations = 3;
var lightsTempIncrease = 0.1;
var lightMoistureDecrease = 0.2;

setThing = false;

Meteor.methods({
	setTimeScale: function (newTimeScale){
		changeTimeScale(newTimeScale);
	},
	newSprinklerMin: function(gardenId, min){
		setSprinklerMin(gardenId, min);
	},
	newSprinklerMax: function(gardenId, max){
		setSprinklerMax(gardenId, max);
	},
	newHeaterMax: function(gardenId, max){
		setHeaterMax(gardenId, max);
	},
	newHeaterMin: function(gardenId, min){
		setHeaterMin(gardenId, min);
	},
	newHumidifierMin: function(gardenId, min){
		setHumidifierMin(gardenId, min);
	},
	newHumidifierMax: function(gardenId, max){
		setHumidifierMax(gardenId, max);
	},
	newLightMin: function(gardenId, min){
		setAutoLightMin(gardenId, min);
	},
	newLightMax: function(gardenId, max){
		setAutoLightMax(gardenId, max);
	},
	autoLightOn: function(gardenId){
		setAutoLightOn(gardenId);
	},
	autoLightOff: function(gardenId){
		setAutoLightOff(gardenId);
	},
	toggleSprinkler: function (gardenId, waterAmount, waterTemperature) {
		waterPlants(gardenId, waterAmount, waterTemperature);
	},
	toggleAutoSprinkler: function(gardenId){
		var val = switchAutoSprinkler(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Auto Sprinklers: " + val);
	},
	autoSprinklerOn: function(gardenId){
		var val ="ON";
		setAutoSprinklerOn(gardenId);
		console.log("Auto Sprinkler: " + val);
	},
	autoSprinklerOff: function(gardenId){
		var val ="OFF";
		setAutoSprinklerOff(gardenId);
		console.log("Auto Sprinkler: " + val);
	},
	checkAutoSpinkler: function (gardenId){
		return isAutoWatered(gardenId);
	},
	toggleAutoHeater: function(gardenId){
		var val =switchAutoHeater(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Auto Heater: " + val);
	},
	autoHeaterOn: function(gardenId){
		var val ="ON";
		setAutoHeaterOn(gardenId);
		console.log("Auto Heater: " + val);
	},
	autoHeaterOff: function(gardenId){
		var val ="OFF";
		setAutoHeaterOff(gardenId);
		console.log("Auto Heater: " + val);
	},
	checkAutoHeater: function (gardenId){
		return isAutoHeated(gardenId);
	},
	toggleAutoHumidifier: function(gardenId) {
		var val =switchAutoHumidifier(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Auto Humidifier: " + val);
	},
	autoHumidifierOn: function(gardenId){
		var val ="ON";
		setAutoHumdifierOn(gardenId);
		console.log("Auto Humidifier: " + val);
	},
	autoHumidifierOff: function(gardenId){
		var val ="OFF";
		setAutoHumdifierOff(gardenId);
		console.log("Auto Humidifier: " + val);
	},
	checkAutoHumidifier: function (gardenId){
		return isAutoHumidified(gardenId);
	},
	toggleHeater : function(gardenId){
		var val =switchHeater(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Heater Value: " + val);
	},
	checkHeater: function (gardenId){
		return isHeated(gardenId);
	},
	toggleHumidifier: function(gardenId){
		var val =switchHumidifier(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Humidifier Value: " + val);
	},
	checkHumidifier: function (gardenId){
		return isHumidified(gardenId);
	},
	toggleLight : function(gardenId){
		var val =switchLight(gardenId);
		if(val){
			val = "ON";
		} else {
			val = "OFF";
		}
		console.log("Light Value: " + val);
	},
	checkLight: function (gardenId){
		return isLit(gardenId);
	},
});

function updateRun(){
	var found = Gardens.find();
		//CYCLE THROUGH ALL GARDENS
		found.forEach(function (garden) {
			if(setThing){
				console.log("hello");
			}
			var temp;
			var moisture;
			var humidity;
			var light;

			//INITIALIZATION
			if(garden.date.length > 0){
				//IF GARDEN ALREADY HAS AN ORIGINAL VALUE
				temp = garden.temp[garden.temp.length-1];
				moisture = garden.moisture[garden.moisture.length-1];
				humidity = garden.humidity[garden.humidity.length-1];
				light = garden.light[garden.light.length-1];
			} else {
				//IF GARDEN HAS NEVER HAD AN INITIAL VALUE
				temp = parseFloat(Math.floor((Math.random()*(tempMax-tempMin))+tempMin).toFixed(2));
				moisture = parseFloat(Math.floor((Math.random()*(moistMax-moistMin))+moistMin).toFixed(2));
				humidity = parseFloat(Math.floor((Math.random()*(humMax-humMin))+humMin).toFixed(2));
				light = parseFloat(Math.floor((Math.random()*(lightMax-lightMin))+lightMin).toFixed(2));
			}

			//RANDOM ADJUSTMENT NUMBER GENERATOR
			var tempAdjust = parseFloat((Math.random()*tempVariance).toFixed(2));
			var moistureAdjust = parseFloat((Math.random()*moistVariance).toFixed(2));
			var humidityAdjust = parseFloat((Math.random()*humVariance).toFixed(2));
			var lightAdjust = parseFloat((Math.random()*lightVariance).toFixed(2));


			//RANDOM POITIVE NEGATIVE ADJUSTMENT GENERATORS
			var addSub = Math.floor((Math.random()*10));
			if(addSub >= tempUpOdd){
				tempAdjust = -1 * tempAdjust;
			}
			addSub = Math.floor((Math.random()*10));
			if(addSub >= moistUpOdd){
				moistureAdjust = -1 * moistureAdjust;
			}
			addSub = Math.floor((Math.random()*10));
			if(addSub >= humUpOdd){
				humidityAdjust = -1 * humidityAdjust;
			}
			addSub = Math.floor((Math.random()*10));
			if(addSub >= lightUpOdd){
				lightAdjust = -1 * lightAdjust;
			}

			//CHECK CONSISTENT MODIFIERS
			var heaterIsOn = garden.heaterOn;
			var humidifierIsOn = garden.humidifierOn;
			var lightsIsOn = garden.lightsOn;


			//TEMPERATURE
			var checkTemp = temp + tempAdjust;
			if(checkTemp <= tempMin){
				tempAdjust = Math.abs(tempAdjust);
			}

			//AUTO HEATER VARIABLES
			if(garden.autoHeat){
				if(temp <= garden.autoHeatMin){
					if(!heaterIsOn){
						heaterOn(garden._id);
					}
				}

				if (temp >= garden.autoHeatMax){
					if(heaterIsOn){
						heaterOff(garden._id);
					}
				}
			}

			if(heaterIsOn){
				console.log("Heater Is ON");
				tempAdjust += tempVariance * heaterTempIncrease;
			}
			if(lightsIsOn){
				console.log("Lights Are ON");
				tempAdjust += tempVariance * lightsTempIncrease;
			}
			if(humidifierIsOn){
				console.log("Humidifier Is ON");
				tempAdjust += tempVariance * humidTempIncrease;
			}
			if(temp < tempMin){
				tempAdjust = Math.abs(tempAdjust);
			}
			if(garden.sprinklerOn){
					tempAdjust = tempAdjust + garden.sprinkler.tempModifier;
			}

			temp += tempAdjust * timeScale;


			//MOISTURE
			var checkMoist = moisture + moistureAdjust;
			if(checkMoist <= moistMin){
				moistureAdjust = Math.abs(moistureAdjust);
			}
			if(lightsIsOn){
				moistureAdjust -= moistVariance * lightMoistureDecrease;
			}
			if(heaterIsOn){
				moistureAdjust -= moistVariance * heaterMoistureDecrease;
			}
			if(garden.autoWater){
				if(!garden.sprinklerOn){
					if(moisture < garden.autoWaterMin){
						waterPlants(garden._id, "medium", "warm");
					}
				}
			}
			if(garden.sprinklerOn){
					moistureAdjust = moistureAdjust + garden.sprinkler.moistModifier;
			}

			moisture += moistureAdjust * timeScale;


			//HUMIDITY
			var checkHum = humidity + humidityAdjust;
			if (checkHum <= humMin){
				humidityAdjust = Math.abs(humidityAdjust);
			}

			//AUTO HEATER VARIABLES
			if(garden.autoHum){
				if(humidity <= garden.autoHumMin){
					if(!humidifierIsOn){
						humidifierOn(garden._id);
					}
				}

				if (humidity >= garden.autoHumMax){
					if(humidifierIsOn){
						humidifierOff(garden._id);
					}
				}
			}

			if(humidifierIsOn){
				humidityAdjust += humVariance * humidHumidIncrease;
			}
			if(garden.sprinklerOn){
					humidityAdjust = humidityAdjust + garden.sprinkler.humModifier;
			}
			humidity += humidityAdjust * timeScale;

			
			//LIGHT
			if(garden.autoLight){
				var today = new Date().getHours();
				if (today >= garden.autoLightMin && today <= garden.autoLightMax) {
					if(!lightsIsOn){
						lightOn(garden._id);
					}
				} else {
					if(lightsIsOn){
						lightOff(garden._id);
					}
				}
			}
			if(lightsIsOn){
				light = 30;
			} else {
				light = 10;
			}
			light += lightAdjust;



			//SPRINKLER
			if(garden.sprinklerOn){
					garden.sprinkler.inc++;
					if(garden.sprinkler.inc > garden.sprinkler.totalInc){
						garden.sprinklerOn = false;
						garden.sprinkler = {};
					}
					Gardens.update(garden._id, garden);
			}

			//PRINT LEVELS
			console.log("TEMPERATURE: " + temp);
			console.log("MOISTURE: " + moisture);
			console.log("HUMIDITY: " + humidity);
			console.log("LIGHT: " + light);


			//UPDATE GARDEN
			Meteor.call('insertTemperature', garden._id, temp, function (error, result) {});
			Meteor.call('insertMoisture', garden._id, moisture, function (error, result) {});
			Meteor.call('insertHumidity', garden._id, humidity, function (error, result) {});
			Meteor.call('insertLight', garden._id, light, function (error, result) {});
			Meteor.call('insertDate', garden._id, function (error, result) {});
		});

	console.log("Next Iteration in: " + iterationTime);
}

runId = Meteor.setInterval(updateRun,iterationTime);


function waterPlants(gardenId, waterAmount, waterTemperature) {
	waterAmount = waterAmount.toLowerCase();
	waterTemperature = waterTemperature.toLowerCase();
	var found = Gardens.findOne(gardenId);

	sprinkler = {
		'inc' : 0,
		'totalInc' : 0,
		'tempModifier' : 0,
		'humModifier' : 0,
		'moistModifier': 0
	};

	if(waterAmount === "light"){
		sprinkler['tempModifier'] = tempVariance * sprinklerTempIncrease;
		sprinkler['humModifier'] = humVariance * sprinklerHumIncrease;
		sprinkler['moistModifier'] = moistVariance * sprinklerMoistureLightIncrease;
	} else if(waterAmount === "medium"){
		sprinkler['tempModifier']  = tempVariance * sprinklerTempIncrease * 2;
		sprinkler['humModifier'] = humVariance * sprinklerHumIncrease * 2;
		sprinkler['moistModifier'] = moistVariance * sprinklerMoistureMediumIncrease;
	} else if(waterAmount === "heavy"){
		sprinkler['tempModifier']  =  tempVariance * sprinklerTempIncrease * 3;
		sprinkler['humModifier'] = humVariance * sprinklerHumIncrease * 3;
		sprinkler['moistModifier'] =  moistVariance * sprinklerMoistureHeavyIncrease;
	}

	sprinkler.totalInc = sprinklerIterations;

	if(waterTemperature === "hot"){
	} else if (waterTemperature === "cold"){
		sprinkler['humModifier'] *= -1;
		sprinkler['tempModifier'] *= -1;
	} else if (waterTemperature === "warm"){
		sprinkler['humModifier'] *= 0;
		sprinkler['tempModifier'] *= 0;
	}

	found.sprinkler = sprinkler;
	found.sprinklerOn = true;

	Gardens.update(gardenId, found);
}

function switchHeater(gardenId) {
	var found = Gardens.findOne(gardenId);
	found.heaterOn = !found.heaterOn;
	var returnVal = found.heaterOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function heaterOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.heaterOn = true;
	var returnVal = found.heaterOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function heaterOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.heaterOn = false;
	var returnVal = found.heaterOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function isHeated(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = found.heaterOn;
	return returnVal;
}

function switchHumidifier(gardenId) {
	var found = Gardens.findOne(gardenId);
	found.humidifierOn = !found.humidifierOn;
	var returnVal = found.humidifierOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function humidifierOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.humidifierOn = true;
	var returnVal = found.humidifierOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function humidifierOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.humidifierOn = false;
	var returnVal = found.humidifierOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function isHumidified(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = found.humidifierOn;
	return returnVal;
}

function switchLight(gardenId) {
	var found = Gardens.findOne(gardenId);
	found.lightsOn = !found.lightsOn;
	var returnVal = found.lightsOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function setAutoLightOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoLight = true;
	Gardens.update(gardenId, found);
}

function setAutoLightOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoLight = false;
	Gardens.update(gardenId, found);
}

function setAutoLightMax(gardenId, max){
	var found = Gardens.findOne(gardenId);
	found.autoLightMax = parseFloat(max);
	Gardens.update(gardenId, found);
}

function setAutoLightMin(gardenId, min){
	var found = Gardens.findOne(gardenId);
	found.autoLightMin = parseFloat(min);
	Gardens.update(gardenId, found);
}

function lightOn(gardenId) {
	var found = Gardens.findOne(gardenId);
	found.lightsOn = true;
	var returnVal = found.lightsOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function lightOff(gardenId) {
	var found = Gardens.findOne(gardenId);
	found.lightsOn = false;
	var returnVal = found.lightsOn;
	Gardens.update(gardenId, found);
	return returnVal;
}

function isLit(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = found.lightsOn;
	return returnVal;
}

function setHeaterMax(gardenId, max){
	var found = Gardens.findOne(gardenId);
	found.autoHeatMax = parseFloat(max);
	Gardens.update(gardenId, found);
}

function setHeaterMin(gardenId, min){
	var found = Gardens.findOne(gardenId);
	found.autoHeatMin = parseFloat(min);
	Gardens.update(gardenId, found);
}

function switchAutoHeater(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoHeat){
		found.autoHeat = !found.autoHeat;
	} else {
		returnVal = true;
		found['autoHeat'] = true;
	}
	Gardens.update(gardenId, found);

	return returnVal;
}

function isAutoHeated(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoHeat){
		returnVal = true;
	}

	return returnVal;
}

function setAutoHeaterOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoHeat = true;
	Gardens.update(gardenId, found);
}

function setAutoHeaterOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoHeat = false;
	heaterOff(gardenId);
	Gardens.update(gardenId, found);
}

function setHumidifierMax(gardenId, max){
	var found = Gardens.findOne(gardenId);
	found.autoHumMax = parseFloat(max);
	Gardens.update(gardenId, found);
}

function setHumidifierMin(gardenId, min){
	var found = Gardens.findOne(gardenId);
	found.autoHumMin = parseFloat(min);
	Gardens.update(gardenId, found);
}

function switchAutoHumidifier(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoHum){
		found.autoHum = !found.autoHum;
	} else {
		returnVal = true;
		found['autoHum'] = true;
	}
	Gardens.update(gardenId, found);

	return returnVal;
}

function setAutoHumdifierOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoHum = true;
	Gardens.update(gardenId, found);
}

function setAutoHumdifierOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoHum = false;
	humidifierOff(gardenId);
	Gardens.update(gardenId, found);
}

function isAutoHumidified(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoHum){
		returnVal = true;
	}

	return returnVal;
}

function setSprinklerMin(gardenId, min){
	var found = Gardens.findOne(gardenId);
	found.autoWaterMin = parseFloat(min);
	Gardens.update(gardenId, found);
}

function setSprinklerMax(gardenId, max){
	var found = Gardens.findOne(gardenId);
	found.autoWaterMax = parseFloat(max);
	console.log(found.autoWaterMax);
	Gardens.update(gardenId, found);
}

function switchAutoSprinkler(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoWater){
		found.autoWater = !found.autoWater;
	} else {
		returnVal = true;
		found['autoWater'] = true;
	}
	Gardens.update(gardenId, found);

	return returnVal;
}

function setAutoSprinklerOn(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoWater = true;
	Gardens.update(gardenId, found);
	console.log("auto on");
}

function setAutoSprinklerOff(gardenId){
	var found = Gardens.findOne(gardenId);
	found.autoWater = false;
	Gardens.update(gardenId, found);
}

function isAutoWatered(gardenId){
	var found = Gardens.findOne(gardenId);
	var returnVal = false;
	if(found.autoWater){
		returnVal = true;
	}

	return returnVal;
}

function changeTimeScale(newTimeScale){
	timeScale = newTimeScale;
	console.log("Time increased by scale of x" + newTimeScale);


	checkTime = baseIterationTime / Math.abs(timeScale);
	if(checkTime < minimumIntervalTime){
		iterationTime = minimumIntervalTime;
	} else {
		iterationTime = checkTime;
	}

	Meteor.clearInterval(runId);
	runId = Meteor.setInterval(updateRun, iterationTime);
}