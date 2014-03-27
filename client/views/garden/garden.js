Template.garden.rendered = function () {
	blurlib();

	$('blur').each(function(){
		console.log("in blur");
		$(this).blurjs({
			source: 'body',
			radius: 20,
			overlay: 'rgba(255,255,255,0.4)'
		});
	});
};