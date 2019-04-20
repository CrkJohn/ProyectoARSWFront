pedirViaje = (function () {
  var tmp = null;
  var pos = null;
  var icons = {
    start: {
      icon:'../img/car.png',
    },
    end: {
      icon:'../img/flag.png',
    }
  };
  var map = null;
  
  function initMap() {
    
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var strictBounds = document.getElementById('strict-bounds-selector');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    var autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var geocoder = new google.maps.Geocoder();
        var infowindowContent = document.getElementById('infowindow-content');
        var infowindow = new google.maps.InfoWindow();
        geocoder.geocode({ 'location': pos }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              tmp =  jQuery.parseJSON(JSON.stringify(results[0]));
              console.log('Geocode  '+ tmp);
              infowindow.setContent(infowindowContent);
              var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
              });
              var place2 = tmp;
              console.log(place2.geometry)
              infowindow.setPosition(pos);
              if (place2.geometry.viewport) {
                map.fitBounds(place2.geometry.viewport);
              } else {
                map.setCenter(place2.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
              }
              marker.setPosition(place2.geometry.location);
              marker.setVisible(true);
              var address = '';
              if (place2.address_components) {
                address = [
                  (place2.address_components[0] && place2.address_components[0].short_name || ''),
                  (place2.address_components[1] && place2.address_components[1].short_name || ''),
                  (place2.address_components[2] && place2.address_components[2].short_name || '')
                ].join(' ');
              }
      
              infowindowContent.children['place-icon'].src = place2.icon;
              infowindowContent.children['place-name'].textContent = place2.name;
              infowindowContent.children['place-address'].textContent = address;
              infowindow.open(map, marker);      
            }else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }, function () {
        handleLocationError(true, infowindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infowindow, map.getCenter());
    }
  }

  function geolocation(){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': pos }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
            return jQuery.parseJSON(JSON.stringify(results[0]));  
        }
      }
    }); 
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];

    console.log($('#place-address').text());
    directionsService.route({
      origin: $('#place-address').text(),
      destination: document.getElementById('pac-input').value,
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
        //mark = new google.maps.Marker({position:{lat:window.lat, lng:window.lng}, map:map,icon:icons.start.icon});
        //makeMarker({position:{lat:window.lat, lng:window.lng}},icons.start.icon,"init");
        makeMarker(leg.start_location, icons.start.icon,'start');
        makeMarker(leg.end_location, icons.end.icon,'end');
        
        routeConsole = route;
        console.log(route);
        var duration =  route.legs[0].duration.text
        console.log()
        var distance = route.legs[0].distance.text;
        
        
        console.log(duration +  " " + distance);
        /*route.legs.forEach( function(leg){
                duration += leg.duration.value;
        });*/
        //document.getElementById('duration').innerHTML = duration/60 + " minutos";              
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  function makeMarker(position, icon, title){
    new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title,
      //animation: google.maps.Animation.DROP
    });
  }

  function infoWindowsF(){
    var infowindowContent = document.getElementById('infowindow-content');
    var infowindow = new google.maps.InfoWindow(); 
    console.log(tmp);
    infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });
        console.log('Hola mundo')
        var place2 = tmp;
        console.log(place2.geometry)
        infowindow.setPosition(pos);
        if (place2.geometry.viewport) {
          map.fitBounds(place2.geometry.viewport);
        } else {
          map.setCenter(place2.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place2.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place2.address_components) {
          address = [
            (place2.address_components[0] && place2.address_components[0].short_name || ''),
            (place2.address_components[1] && place2.address_components[1].short_name || ''),
            (place2.address_components[2] && place2.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place2.icon;
        infowindowContent.children['place-name'].textContent = place2.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


  return {
    init: function () {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 4.782715, lng: -74.042611 },
        zoom: 18
      });
      initMap();
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
      var btn = document.getElementById('pedir');
      btn.addEventListener('click',function(){
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
      //initStomp();
    }
  }
})();

