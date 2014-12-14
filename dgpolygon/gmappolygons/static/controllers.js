angular.module('gmappolygons.controllers', []).controller('MainCtrl', function($scope, $location, MapService) {
	initialize();

	$scope.submit = function() {
		path = poly.getPath();

		if (path.length < 3) {
			alert("Please insert at least 3 points to make a area");
			return;
		}

		//poly.getPath().getArray()
		MapService.submit(path.getArray()).then(function(data) {
			$location.path('search/' + data);
		});

	};

}).controller('SearchCtrl', function($scope, $location,$routeParams, MapService) {
	$scope.areaid = $routeParams.areaid;
	initialize(true);

	$scope.search = function() {
		if (uniquemarker==null || uniquemarker.position ==null) {
			alert("You must select a point to search if is in the area or not");
			return;
		}
		MapService.search(uniquemarker.position.D, uniquemarker.position.k).then(function(data) {
			alert(data);
		});

	};

	$scope.show = function(id) {
		$location.path('show/' + id);

	};

}).controller('ShowCtrl', function($scope, $location, $routeParams, MapService) {

	var areaid = $routeParams.areaid;
	$scope.areaid=areaid;
	
	MapService.show(areaid).then(function(data) {
		console.log(data.data);
		polyService = JSON.parse(data.data['polygons'])
		var paths = coord_to_paths(polyService.coordinates);
		showmap(paths);
	});
	
	$scope.search = function(id) {
		$location.path('search/' + id);

	};

});
