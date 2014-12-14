angular.module('gmappolygons.services', []).factory('MapService', function($http) {

	return {
		submit : function(geodata) {
			
			console.log(geodata);
			
			retorno="";
			for(i=0;i<geodata.length;i++){
				if(i>0){
					retorno+=", ";
				}
				retorno+=geodata[i].D+" "+geodata[i].k;
			}
			retorno+=", "+geodata[0].D+" "+geodata[0].k;
			
			data = serializeData({polygon: retorno});
			console.log(data);
			
			return $http({
				url : "/gmappolygons/submit/",
				method : 'POST',
				data : data,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
				}
			}).then(function(result) {
				return result.data;
			});
		},
		show : function(id) {
			return $http({
				url : "/gmappolygons/show/" + id+"/",
				method : 'POST',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
				}
			}).then(function(result) {
				return result.data;
			});
		},
		search : function(lat, lng) {
			data = serializeData({point: lat+" "+lng});
			
			return $http({
				url : "/gmappolygons/search/",
				method : 'POST',
				data : data,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
				}
			}).then(function(result) {
				return result.data;
			});
		}
	}
}); 