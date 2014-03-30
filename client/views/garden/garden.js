var globalTemperature = ['Global', 30, 20, 50, 40, 60, 50];
var temperature,humidity,moisture,light, globalHumidity, globalMoisture, globalLight;
var chart;


Template.garden.created = function () {

    Session.set("gardenID", '2iNfRdWWnCfTzo2XX');
};


Template.garden.helpers({
    getTemp: function() {
        if(this.temp){
            if(this.temp[this.temp.length-1]){
                return this.temp[this.temp.length-1];
            }
        }
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
	blurlib();
	loadd3();
	loadc3();
    
    Session.set("temperature", true);
    Session.set("humidity", false);
    Session.set("moisture", false);
    Session.set("light", false);
    $('blur').each(function(){
      console.log("in blur");
      $(this).blurjs({
         source: 'body',
         radius: 20,
         overlay: 'rgba(255,255,255,0.4)'
     });
  });

    temperature = loadData("Your Garden - Temp", "temperature");
    humidity = loadData("Your Garden - Humidity", "humididty");

    moisture = loadData("Your Garden - Moisture", "moisture");
    light = loadData("Your Garden - Light", "light");

    chart = c3.generate({
        data: {
          x: 'x',
          columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
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
    x : {
        type : 'timeseries'
    }
},
tooltip: {
   show: false
}
});



    Deps.autorun(function() {

       temperature = loadData("Your Garden - Temp", "temperature");
       humidity = loadData("Your Garden - Humidity", "humididty");

       moisture = loadData("Your Garden - Moisture", "moisture");
       light = loadData("Your Garden - Light", "light");
       redraw();

   });
};

function loadData(name, attribute){
    var data;
    if(!Session.get(attribute)){
     data = [];
 }else{
    data = get_history_days(Session.get('gardenID'),30, attribute);
}
data.unshift(name);
return data;
}

function redraw(){
	
	chart.load({
        columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        globalTemperature,
        temperature,
        humidity,
        moisture,
        light
        ]
    });
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
