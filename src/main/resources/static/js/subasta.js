sb=(function(){
  var icons = {
    start: {
      icon: '../img/car.png',
    },
    end: {
      icon: '../img/flag.png',
    }
  };
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
        var viaje=JSON.parse(Cookies.get("subasta"));
        directionsService.route({
          origin: viaje.origin,
          destination: viaje.destination,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING' ,
          provideRouteAlternatives: true
          
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var leg = response.routes[0].legs[0];
            makeMarker(leg.start_location, icons.start.icon, 'start');
            makeMarker(leg.end_location, icons.end.icon, 'end');
            routeConsole = route;
            var duration =  route.legs[0].duration.text
            var distance = route.legs[0].distance.text;
            console.log(duration +  " " + distance);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
  function makeMarker(position, icon, title) {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title,
      animation: google.maps.Animation.DROP
    });  
  }
  
  function initMap(iniciarSBinit) {
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 4.782715, lng: -74.042611},
      zoom: 15
    });
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //alert(Cookies.get('subasta'));
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