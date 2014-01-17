
// Get current location
// Find closest BART station
// Redirect to URL for station

var regExp = /\(([^)]+)\)/;
var compressed_stations;
var bart_stations;
var my_location;

function doShit(currentPosition) {
	my_location = {};
	my_location = { latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude }
	$.getJSON("js/bart_stations.geojson", function(bart_stations) {
		compressed_stations = {};
		_.each(bart_stations.features, function(f) {
			name = regExp.exec(f.properties.name)[1]
			latlng = { latitude: f.geometry.coordinates[1], longitude: f.geometry.coordinates[0] }
			compressed_stations[name] = latlng
		})
		nearest_station_acronym = geolib.findNearest(my_location, compressed_stations).key
		url = "http://m.bart.gov/schedules/eta?stn=" + nearest_station_acronym;
		$("#bart_iframe").html("<iframe src='" + url +"' width=\"100%\" height=\"100%\" frameborder='0'></iframe>")
	})
}

navigator.geolocation.getCurrentPosition(doShit);
