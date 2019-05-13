pedirViaje = (function () {
  var tmp = null;
  var pos = null;
  var icons = {
    start: {
      icon: '../img/car.png',
    },
    end: {
      icon: '../img/flag.png',
    }
  };
  var map = null;
  var stompClient = null;
  var directionsRenderers = [];


  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  var aceptarViaje = function (message) {
    var respuesta = {
      pasajero : username = JSON.parse( Cookies.get('pasajero')).correo,
      conductor : document.getElementById("usr"+message).textContent.split(":")[1],
      type : "acepto"
    }
    console.log("Se envia la informacion del viaje aceptado");
    console.log(message)
    console.log(respuesta);
    stompClient.send("/topic/canales."+message.substring(0,36), {}, JSON.stringify(respuesta));

  };

  var sendTopic = function () {
    var newTopicID = guid();
    var viaje = {
      origin: document.getElementById('pac-input').value,
      destination: document.getElementById('pac-output').value,
      costo: document.getElementById('costo').value,
      usr: JSON.parse(Cookies.get('pasajero')).correo,
      topic: newTopicID
    }
    console.log(viaje);
    stompClient.send("/topic/canales.1", {}, JSON.stringify(viaje));
    connectAndSubscribe(newTopicID);

  };

  function showOffers(message) {
   
    var message = message;
    var uuid = message.uuid + ':' + message.usr;
    var thereIsAnOffer = document.getElementById(uuid);
    if (thereIsAnOffer) {
        document.getElementById("costo"+uuid).textContent='Precio ofrecido :' + message.costo;
    } else {
    
        var newOffer = '<div id="' + uuid + '" class="slide">' +
        '<div class="card-body">' +
        '<h5 id="usr' + uuid + '" class="card-title">Usuario ofertante : ' + message.usr + '</h5>' +
        '<p id="costo' + uuid + '">Precio ofrecido : ' + message.costo + '</p>' +
        '<p class="card-text"><small class="text-muted"></small></p>' +
        '</div>' +
        '<div class="card-footer text-center">' +
        '<button onclick="pedirViaje.aceptarViaje(' + "'" + uuid + "'" + ')" type="button" class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Aceptar</button>' +
        '<button onclick="pedirViaje.eliminar(' + "'" + uuid + "'" + ')" type="button"  class="btn btn-danger btn-lg btn-block" >Rechazar</button>' +
        '</div>' +
        '</div>'
        
        $("#listaDeOfertas").append(newOffer);
        document.dispatchEvent(event);
    }
    
  }

  var connectAndSubscribe = function (channel) {
    console.info('Connecting to WS...');
    var url = 'stompendpoint';
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/canales.' + channel, function (eventbody) {
        var json = JSON.parse(eventbody.body);
        if (json.channelUno == false) {
          showOffers(json);
          $("#noHayOfertas").css({'display': 'none'});
        }
        //alert("Se ha enviado su viaje correctamente, espera a que un conductor lo acepte");
      });
    });
  };



  function initMap() {
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var tgt = document.getElementById('pac-output');
    var strictBounds = document.getElementById('strict-bounds-selector');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocomplete2 = new google.maps.places.Autocomplete(tgt);
    autocomplete.bindTo('bounds', map);
    autocomplete2.bindTo('bounds', map);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete2.setFields(['address_components', 'geometry', 'icon', 'name']);
    var geocoder = new google.maps.Geocoder();
    var infowindowContent = document.getElementById('infowindow-content');
    var infowindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        geocoder.geocode({ 'location': pos }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              tmp = jQuery.parseJSON(JSON.stringify(results[0]));
              console.log('Geocode  ' + tmp);
              infowindow.setContent(infowindowContent);
              var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29),
                animation: google.maps.Animation.DROP

              });
              var place2 = tmp;
              console.log(place2.geometry)
              //infowindow.setPosition(pos);
              if (place2.geometry.viewport) {
                map.fitBounds(place2.geometry.viewport);
              } else {
                map.setCenter(place2.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
              }
              marker.setPosition(place2.geometry.location);
              marker.setVisible(true);
              marker.addListener('click', toggleBounce);
              var address = '';
              if (place2.address_components) {
                address = [
                  (place2.address_components[0] && place2.address_components[0].short_name || ''),
                  (place2.address_components[1] && place2.address_components[1].short_name || ''),
                  (place2.address_components[2] && place2.address_components[2].short_name || '')
                ].join(' ');
              }
              /*
              infowindowContent.children['place-icon'].src = place2.icon;
              infowindowContent.children['place-name'].textContent = place2.name;
              infowindowContent.children['place-address'].textContent = address;
              infowindow.open(map, marker);
              */
            } else {
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

  function geolocation() {
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
    for (var i = 0; i < directionsRenderers.length; i++) {
      directionsRenderers[i].setMap(null);
    }
    // clear out the directionsRenderers array
    directionsRenderers = [];

    console.log($('#place-address').text());
    directionsService.route({
      origin: document.getElementById('pac-input').value,
      destination: document.getElementById('pac-output').value,

      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true

    }, function (response, status) {
      if (status === 'OK') {
        for (var i = 0; i < response.routes.length; i++) {
          renderDirections(response, i);
        }
        var route = response.routes[0];
        var leg = response.routes[0].legs[0];
        makeMarker(leg.start_location, icons.start.icon, 'start');
        makeMarker(leg.end_location, icons.end.icon, 'end');
        routeConsole = route;
        console.log(route);
        var duration = route.legs[0].duration.text
        console.log()
        var distance = route.legs[0].distance.text;
        console.log(duration + " " + distance);
          
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  function renderDirections(result, routeToDisplay) {

    if (routeToDisplay == 0) {
        var _colour = '#00458E';
        var _strokeWeight = 4;
        var _strokeOpacity = 4;
        var _suppressMarkers = false;
    } else {
        var _colour = '#877f7f';
        var _strokeWeight = 4;
        var _strokeOpacity = 0.7;
        var _suppressMarkers = false;
    }

    // create new renderer object
    var directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: _colour,
            strokeWeight: _strokeWeight,
            strokeOpacity: _strokeOpacity
        }
    })
    directionsRenderer.setMap(map);
    directionsRenderer.setDirections(result);
    directionsRenderer.setRouteIndex(routeToDisplay);

    // push new renderer onto directionsRenderers array;
    directionsRenderers.push(directionsRenderer);
    if (routeToDisplay == 0){
      var infowindow2 = new google.maps.InfoWindow();
      infowindow2.setContent(""+((result.routes[routeToDisplay].legs[0].distance.value)/1000)+" KM");
      infowindow2.setPosition(result.routes[routeToDisplay].legs[0].steps[8].end_location);
      infowindow2.open(map);
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                        


  function makeMarker(position, icon, title) {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title,
      animation: google.maps.Animation.DROP
    });
    marker.addListener('click', toggleBounce);
  }

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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
      var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true });
      var btn = document.getElementById('pedir');
      btn.addEventListener('click', function () {

        if($("#costo").val()>0){
          sendTopic();
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
      });
      connectAndSubscribe(1);
    },

    eliminar: function (uuid) {
      $('#' + uuid).remove();
    },

    aceptarViaje: function (message) {
      aceptarViaje(message);
      location.href = "subasta";
    }

  }
})();

