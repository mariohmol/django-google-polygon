angular.module('gmappolygons', ['ngRoute', 'gmappolygons.services', 'gmappolygons.controllers']).config(function($routeProvider) {

	$routeProvider.when('/', {
		controller : 'MainCtrl',
		templateUrl : '/static/views/indexgoogle.html'

	}).when('/show/:areaid', {
		controller : 'ShowCtrl',
		templateUrl : '/static/views/showgoogle.html'

	}).when('/search/:areaid', {
		controller : 'SearchCtrl',
		templateUrl : '/static/views/search.html'

	}).otherwise({
		redirectTo : '/'
	});
	/*
	 $stateProvider.state('index', {
	 url : '/index',
	 templateUrl : 'templates/indexgoogle.html',
	 controller : 'MainCtrl'
	 })

	 .state('search', {
	 url : '/search',
	 templateUrl : 'templates/search.html',
	 controller : 'MainCtrl'
	 }).state('submit', {
	 url : '/submit',
	 templateUrl : 'templates/mercado.html',
	 controller : 'MainCtrl'
	 })
	 */
	;

	// if none of the above states are matched, use this as the fallback
	//$urlRouterProvider.otherwise('/index');

});

var poly, map;
var markers = [];
var path = new google.maps.MVCArray;

function serializeData(data) {

	// If this is not an object, defer to native stringification.
	if (! angular.isObject(data)) {
		return ((data == null ) ? "" : data.toString() );
	}

	var buffer = [];
	// Serialize each key in the object.
	for (var name in data ) {
		if (! data.hasOwnProperty(name)) {
			continue;
		}
		var value = data[name];
		buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null ) ? "" : value));
	}

	// Serialize the buffer and clean it up for transportation.
	var source = buffer.join("&").replace(/%20/g, "+");
	return (source );
}

var uniquemarker = null;

function removeMarker(marker) {
	marker.setMap(null);
	for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
	markers.splice(i, 1);
	path.removeAt(i);
}

function addUniquePoint(event) {
	if (uniquemarker != null)
		removeMarker(uniquemarker);

	path.insertAt(path.length, event.latLng);

	uniquemarker = new google.maps.Marker({
		position : event.latLng,
		map : map,
		draggable : true
	});
	markers.push(uniquemarker);
	uniquemarker.setTitle("#" + path.length);

	google.maps.event.addListener(uniquemarker, 'click', function() {
		removeMarker(marker);
	});

	google.maps.event.addListener(uniquemarker, 'dragend', function() {
		for (var i = 0, I = markers.length; i < I && markers[i] != uniquemarker; ++i);
		path.setAt(i, uniquemarker.getPosition());
	});
}

function addPoint(event) {
	path.insertAt(path.length, event.latLng);

	var marker = new google.maps.Marker({
		position : event.latLng,
		map : map,
		draggable : true
	});
	markers.push(marker);
	marker.setTitle("#" + path.length);

	google.maps.event.addListener(marker, 'click', function() {
		removeMarker(marker);
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
		path.setAt(i, marker.getPosition());
	});
}

function initialize(search) {
	var uluru = new google.maps.LatLng(-19.950299, -43.9967175);

	map = new google.maps.Map(document.getElementById("map"), {
		zoom : 16,
		center : uluru,
		mapTypeId : google.maps.MapTypeId.SATELLITE
	});

	if (search != null)
		google.maps.event.addListener(map, 'click', addUniquePoint);
	else {

		poly = new google.maps.Polygon({
			strokeWeight : 3,
			fillColor : '#5555FF'
		});
		poly.setMap(map);
		poly.setPaths(new google.maps.MVCArray([path]));
		google.maps.event.addListener(map, 'click', addPoint);
	}

}

function showmap(polyPath) {
	var uluru = new google.maps.LatLng(-19.950299, -43.9967175);

	map = new google.maps.Map(document.getElementById("map"), {
		zoom : 16,
		center : uluru,
		mapTypeId : google.maps.MapTypeId.SATELLITE
	});

	poly = new google.maps.Polygon({
		paths : polyPath,
		strokeWeight : 3,
		fillColor : '#5555FF'
	});
	poly.setMap(map);
	//poly.setPaths(new google.maps.MVCArray([path]));
	console.log(polyPath)
	//poly.setPaths(polyPath);
}

function coord_to_paths(coords) {
	var paths = [];
	//poly_bounds[bucket][location_id] = new google.maps.LatLngBounds();
	for (var i = 0; i < coords.length; i++) {
		for (var j = 0; j < coords[i].length; j++) {
			var path = [];

			var ll = new google.maps.LatLng(coords[i][j][1], coords[i][j][0]);
			//poly_bounds[bucket][location_id].extend(ll);
			//path.push(ll);

			paths.push(ll);
		}
	}

	return paths;
}

