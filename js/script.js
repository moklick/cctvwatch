;(function(window,document,$,L){
	
	var config = {
		apiUrl : 'http://localhost:9000/cctvs',
		tileUrl: 'http://{s}.tiles.mapbox.com/v3/moklick.hh7gbc50/{z}/{x}/{y}.png'
		},
		// create map object
		map = new L.Map('map', {
		    center: new L.LatLng(52.520, 13.385),
		    zoom: 11
		}),
		// add tile layer
		tileLayer = new L.TileLayer(config.tileUrl,{
			attribution: '<a href="http://mapbox.com/about/maps" target="_blank">Mapbox</a> |  Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
		}).addTo(map);
		// add cctv cams
		$.ajax({
			url : config.apiUrl,
			dataType: 'json'
		}).done(function(data){
			addCams(data.cctvs);
		})

		function addCams(cctvs){
			cctvs.forEach(function(point,i){
				L.circle(point, 15,{
					fillColor: '#e74c3c',
					fillOpacity: 1,
					stroke: false
				}).addTo(map);
			});
		}
}(window,document,jQuery,L));