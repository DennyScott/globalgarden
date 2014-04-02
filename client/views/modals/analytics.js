Template.analytics.rendered = function () {
	checkboxLoad();
};

Template.analytics.events({
	'click #saveAnalytics': function () {
		Session.set('temperature', $('#tempCheck').hasClass('active'));
		console.log($('#tempCheck').hasClass('active'));
		Session.set('moisture', $('#moistureCheck').hasClass('active'));
		Session.set('humidity', $('#humidityCheck').hasClass('active'));
		Session.set('light', $('#lightCheck').hasClass('active'));
		var intRegex = /^\d+$/;
		var days = $('#days').val();
		if(days === "" || !intRegex.test(days)){
			days = 1;
		}
		Session.set('days', days);

		var chartType = $("#chartType").val();
		collectData();
		createChart();

		if(chartType === "line"){
			getChart().toLine();
		}else if(chartType === "spline"){
			getChart().toSpline();
		}else if(chartType === "bar"){
			getChart().toBar();
		}else if(chartType === "area"){
			getChart().toArea();
		}else if(chartType === "areaspline"){
			getChart().toAreaSpline();
		}else if(chartType === "scatter"){
			getChart().toScatter();
		}


		
	}
});

Template.analytics.helpers({
	getDays: function () {
		return Session.get('days');
	}
});