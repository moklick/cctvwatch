;(function(window,document,$,undefined){
	'use strict';
	$('#addCam').on('click', function() {
		navigator.geolocation.getCurrentPosition(function(location) {
			// TODO: add fallback if location is not given

			openAddView(location.coords.latitude, location.coords.longitude);
		});
	});
	function openAddView(lat, long) {
		var map = window.map;
		map.setView([lat,long], 18);
		var circle = L.circle([lat,long],10);
		circle.addTo(map);
		var draggable = new L.Draggable(circle);
		draggable.enable();
	}
}(window,document,jQuery));