sb=(function(){
    
    var map;
    function autocompleteFunction(val){
        var input = document.getElementById(val);
        //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.setComponentRestrictions(
          {'country': ['co']});
          
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);
    
        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
    
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING' ,
          provideRouteAlternatives: true
          
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            routeConsole = route;
            console.log(route);
            var duration =  route.legs[0].duration.text
            console.log()
            var distance = route.legs[0].distance.text;
     
            console.log(duration +  " " + distance);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    
      
    
    
      function initMap(iniciarSBinit) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 4.782715, lng: -74.042611},
          zoom: 15
        });
        if(iniciarSBinit == "true"){
          sbStomp.init();
        }
    } 

    


	return{

        
        init: function () {
           initMap();
        },
	}
})();