var global = ['Global', 30, 20, 50, 40, 60, 50];
var chart;

Template.garden.rendered = function () {
	blurlib();
	loadd3();
	loadc3();

	$('blur').each(function(){
		console.log("in blur");
		$(this).blurjs({
			source: 'body',
			radius: 20,
			overlay: 'rgba(255,255,255,0.4)'
		});
	});

	var user = loadData("Your Garden");

	chart = c3.generate({
    data: {
        x: 'x',
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            global,
            user

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
		var user = loadData("Your Garden");
		redraw(user);
		
	});
};

function loadData(name){
	var data = Gardens.findOne({}).temp;

	data.unshift(name);
	return data;
}

function redraw(user){
	
	chart.load({
        columns: [
         ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            global,
            user
        ]
    });
}