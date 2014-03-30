var globalTemperature = ['Global', 30, 20, 50, 40, 60, 50];
var temperature,humidity,moisture,light, globalHumidity, globalMoisture, globalLight;
var chart;

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
            columns: [
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
        //     type : 'timeseries'
        // }
    },
    tooltip: {
    	show: false
    }
});



    Deps.autorun(function() {

     temperature = loadData("Your Garden - Temp", "temperature", function(){return Gardens.findOne().temp;});
     humididty = loadData("Your Garden - Humidity", "humididty", function(){return Gardens.findOne().humidity;});
     moisture = loadData("Your Garden - Moisture", "moisture", function(){return Gardens.findOne().moisture;});
     light = loadData("Your Garden - Light", "light", function(){return Gardens.findOne().light;});
     redraw();

 });
};

function loadData(name, attribute){
    var data;
    if(!Session.get(attribute)){
     data = [];
 }else{
    console.log(attribute);
    data = get_history_days('vFab3DHPEPqhn4LYc',30, attribute);
    console.log(data);
}

    var nameObject = {date: new Date(), val: name};
    data.unshift(nameObject);
return data;
}

function redraw(){
	
	chart.load({
        columns: [
        globalTemperature,
        temperature,
        humidity,
        moisture,
        light
        ]
    });
}