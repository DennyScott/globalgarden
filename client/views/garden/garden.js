var globalTemperature = ['Global', 30, 20, 50, 40, 60, 50];
var temperature,humidity,moisture,light, globalHumidity, globalMoisture, globalLight;
var chart;

Template.garden.created = function () {

    Session.set("gardenID", 'vFab3DHPEPqhn4LYc');
};

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
    console.log(attribute);
    data = get_history_days(Session.get('gardenID'),30, attribute);
    console.log(data);
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

Template.garden.helpers({
    isSprinklerOn: function () {
        var gardenObject = Gardens.findOne({_id: Session.get('gardenID')});
        console.log(gardenObject);
        if(gardenObject.sprinklerOn){
            return "good";
        }else{
            return "danger";
        }
    }
});

Template.garden.events({
    'click #toggle-sprinkler': function () {
        var gardenObject = Gardens.findOne({_id: Session.get('gardenID')});
        if(!gardenObject.sprinklerOn){

            Meteor.call("toggleSprinkler", Session.get('gardenID'), "medium", "warm");
        }else{
            
        }
    }
});