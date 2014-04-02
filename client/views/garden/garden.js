var globalTemperature = [];
var temperature,humidity,moisture,light, globalHumidity, globalMoisture, globalLight;
var chart;


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
        return 0;
    },

    gardens: function() {
      return Gardens.find({user_id: Meteor.userId()});
  },

  getHumidity: function() {
    if(this.humidity){
        if(this.humidity[this.humidity.length-1]){
            return this.humidity[this.humidity.length-1];
        }
    }
    return 0;
},

getMoisture: function() {
    if(this.moisture){
        if(this.moisture[this.moisture.length-1]){
            return this.moisture[this.moisture.length-1];
        }
    }
    return 0;
},

getLight: function() {
    if(this.light){
        if(this.light[this.light.length-1]){
            return this.light[this.light.length-1];
        }
    }
    return 0;
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
},

setActive : function() {
    if(this._id === Session.get('currentID')){
        return 'active';
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
      runChart();
});

};

createChart = function(){
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
};

collectData = function(){
    temperature = loadData("Temperature", "temperature",days);
               humidity = loadData("Humidity", "humidity",days);

               moisture = loadData("Moisture", "moisture",days);
               light = loadData("Light", "light",days);
};

function runChart() {
      if(typeof Session.get('currentID') !== "undefined"){
            console.log(Session.get('currentID'));
           days = get_history_days(Session.get('currentID'), Session.get('days'));
           if(days){
               collectData();
               if(typeof chart==='undefined'){
                createChart();
            }else{
               redraw();
            }
        }
   }
}

function loadData(name, attribute, days){
    var data;
    if(!Session.get(attribute)){
     data = [];

 }else{
    data = get_history_attribute(Session.get('currentID'),days, attribute);
}
data.unshift(name);
return data;
}

unloadChart = function(){
    chart.unload("Temperature");
    chart.unload("Moisture");
    chart.unload("Humidity");
    chart.unload("Light");
};

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

    'click .garden' : function(evt, template){
        var garden = $(evt.target).attr('id');
        Session.set('currentID', garden);
        Router.go('garden');
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
