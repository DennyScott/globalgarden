var globalTemperature = [];
var temperature,humidity,moisture,light, globalHumidity, globalMoisture, globalLight;
var chart;
var gardenID = 'r4a9sQ5YHKkZ8sgvG';


Template.garden.created = function () {

};

getChart = function(){
    return chart;
};
Template.garden.helpers({
    getTemp: function() {
        if(this.temp){
            if(this.temp[this.temp.length-1]){
                return this.temp[this.temp.length-1];
            }
        }
    },

    gardens: function() {
      return Gardens.find();
  },

  getHumidity: function() {
    if(this.humidity){
        if(this.humidity[this.humidity.length-1]){
            return this.humidity[this.humidity.length-1];
        }
    }
},

getMoisture: function() {
    if(this.moisture){
        if(this.moisture[this.moisture.length-1]){
            return this.moisture[this.moisture.length-1];
        }
    }
},

getLight: function() {
    if(this.light){
        if(this.light[this.light.length-1]){
            return this.light[this.light.length-1];
        }
    }
},

isHeaterOn: function () {
    if(this.heaterOn){
        return "good";
    }else{
        return "danger";
    }
},

isLightsOn: function () {
    if(this.lightsOn){
        return "good";
    }else{
        return "danger";
    }
},

isHumidifierOn: function () {
    if(this.humidifierOn){
        return "good";
    }else{
        return "danger";
    }
},

isSprinklerOn: function () {
    if(this.sprinklerOn){
        return "good";
    }else{
        return "danger";
    }
}
});

Template.garden.rendered = function () {
	loadd3();
	loadc3();

    Session.set("temperature", false);
    Session.set("humidity", false);
    Session.set("moisture", false);
    Session.set("light", false);
    Session.set('days', 1);
    



Deps.autorun(function() {
   days = get_history_days(gardenID, Session.get('days'));
   temperature = loadData("Temperature", "temperature",days);
   humidity = loadData("Humidity", "humidity",days);

   moisture = loadData("Moisture", "moisture",days);
   light = loadData("Light", "light",days);
   if(typeof chart==='undefined'){
    chart = c3.generate({
        data: {
          // x: 'x',
          columns: [
          // ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
          globalTemperature,
          temperature,
          humidity,
          moisture,
          light

          ]
      },
      zoom: {
       enabled : true
   },
   axis : {
        // x : {
            // type : 'timeseries'
        // }
    },
    tooltip: {
       show: false
   }
});
}else{
   redraw();
}

});
};

function loadData(name, attribute, days){
    var data;
    if(!Session.get(attribute)){
     data = [];

 }else{
    data = get_history_attribute(gardenID,days, attribute);
}
data.unshift(name);
return data;
}

function redraw(){
    if(Session.get('temperature')){
        chart.load({
            columns: [
            temperature
            ]
        });
    }

    if(Session.get('humidity')){
        chart.load({
            columns: [
            humidity
            ]
        });
    }

    if(Session.get('moisture')){
        chart.load({
            columns: [
            moisture
            ]
        });
    }

    if(Session.get('light')){
        chart.load({
            columns: [
            light
            ]
        });
    }

    // chart.load({
    //     columns: [
    //     // ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
    //     globalTemperature,
    //     temperature,
    //     humidity,
    //     moisture,
    //     light
    //     ]
    // });
}

Template.garden.events({
    'click #toggle-sprinkler': function () {

        if(!this.sprinklerOn){

            Meteor.call("toggleSprinkler", this._id, "medium", "warm");
        }else{

        }
    },

    'click #toggle-heater': function () {

        Meteor.call("toggleHeater", this._id);
    },

    'click #toggle-humidifier': function () {

        Meteor.call("toggleHumidifier", this._id);

    },

    'click #toggle-lights': function () {
        Meteor.call("toggleLight", this._id);

    }
});
