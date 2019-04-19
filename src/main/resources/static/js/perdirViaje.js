pedirViaje =(function(){
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 4.782715, lng: -74.042611},
            zoom: 18
        });
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
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);
        var infowindow = new google.maps.InfoWindow();
        var geocoder = new google.maps.Geocoder();
        var infowindowContent = document.getElementById('infowindow-content');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var placetmp;
                geocoder.geocode({'location': pos}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        placetmp =results[0];
                    }
                });
               

                infowindow.setContent(infowindowContent);
                    var marker = new google.maps.Marker({
                    map: map,
                    anchorPoint: new google.maps.Point(0, -29)
                }); 
        
                
                var place2 = JSON.parse(placetmp);
                infowindow.setPosition(pos);
                console.log(place2.geometry);
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
                


                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
        }else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
        }

            /*
            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
            });

        
        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          console.log(place);
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
          
        });*/


        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }


      }
      return {
            init: function(){
                initMap();
                //initStomp();
            }
      }
})();

    