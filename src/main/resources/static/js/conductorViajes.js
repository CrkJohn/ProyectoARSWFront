var conductorViajes = (function () {

  var stompClient = null;
  var contador = 0;
  var pos = null;
  var directionsRenderers = [];
  var originGlobal = null;


  function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/canales.1', function (viaje) {
        console.log('Hollaaaa');
        var json = JSON.parse(viaje.body);
        connectAndSubscribe(json.topic);
        showRoute(json);
        $("#noHayViajes").css({ 'display': 'none' });
      });
    });
  }

  var connectAndSubscribe = function (channel) {
    console.info('Connecting to WS...');
    var url = 'stompendpoint';
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/canales.' + channel, function (eventbody) {
        var message = JSON.parse(eventbody.body);
        if (message.type == "acepto") {
          if (message.conductor.localeCompare(JSON.parse(Cookies.get('conductor')).correo)) {
            var uuid = message.uuid;
            Cookies.remove('subasta');
            var info = {
              correo: $('#usr' + uuid).text().split(':')[1],
              origin: $('#Inicio' + uuid).text().split(':')[1],
              destination: $('#fin' + uuid).text().split(':')[1],
              costo: $('#costo' + uuid).text().split(':')[1],
            }
            Cookies.set('subasta', JSON.stringify(info));
            location.href = 'subasta';
          } else {

          }
        }
      });
      stompClient.subscribe('/topic/canales.199', function (eventbody) {
        var message = JSON.parse(eventbody.body);
        if (message.type == "cancelar") {
          var viajes = document.querySelectorAll('.card.text-center');
          for (var i = viajes.length - 1; i >= 0; i--) {
            var v = viajes[i].textContent;
            if (message.pasajero.localeCompare(v.split(":")[1])) {
              alert("El usuario: " + message.pasajero + " ha cancelado su viaje");
              viajes[i].remove();
              if (document.getElementById('listaDeViajes').childElementCount == 0) {
                $("#noHayViajes").css({ 'display': 'block' });
              }
            }
          }
        }
      });
    });
  };

  var sendOferta = function (uuid) {
    var oferta = {
      costo: $("#" + uuid).text(),
      usr: JSON.parse(Cookies.get('conductor')).correo,
      uuid: uuid.substring(6, uuid.length),
      channelUno: false,
      type: "subasta"
    }
    //console.log(uuid.substring(6,uuid.length ));
    stompClient.send("/topic/canales." + uuid.substring(6, uuid.length), {}, JSON.stringify(oferta));
    alert("Su oferta ha sido enviada correctamente");
  };

  function geolocation() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': pos }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log(jQuery.parseJSON(JSON.stringify(results[0])));
          return jQuery.parseJSON(JSON.stringify(results[0])).formatted_address;
        }
      }
    });
  }

  function calculateAndDisplayRoute(directionsService , uuid) {
    for (var i = 0; i < directionsRenderers.length; i++) {
      directionsRenderers[i].setMap(null);
    }
     // clear out the directionsRenderers array
    directionsRenderers = [];

    for(var p =  0 ; p < 2 ; p++){
      var origin = p == 0 ? $('#Inicio' + uuid).text().split(':')[1] : originGlobal.formatted_address;
      paint(origin,p);
      function paint(origin,p){
        directionsService.route({
          origin: origin,
          destination: $('#fin' + uuid).text().split(':')[1],
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          provideRouteAlternatives: true
        }, function (response, status) {
          if (status === 'OK') {
            console.log(origin  + "    " + p)
            for (var i = 0; i < response.routes.length; i++) {
              renderDirections(response, i , p);
              if(p  == 1)break;
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }
  }
  
  function renderDirections(result, routeToDisplay ,num) {

    if (routeToDisplay == 0) {
        var _colour =  (num == 0  ? '#00458E' : '#a8000b');
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
    directionsRenderers.push(directionsRenderer);
    if (routeToDisplay == 0){
      var infowindow2 = new google.maps.InfoWindow();
      infowindow2.setContent(""+((result.routes[routeToDisplay].legs[0].distance.value)/1000)+" KM");
      infowindow2.setPosition(result.routes[routeToDisplay].legs[0].steps[8].end_location);
      infowindow2.open(map);
    }
  } 


  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 4.782715, lng: -74.042611 },
      zoom: 15
    });

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
              originGlobal = jQuery.parseJSON(JSON.stringify(results[0]));
              console.log('Geocode  ' + originGlobal);
              infowindow.setContent(infowindowContent);
              var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29),
                animation: google.maps.Animation.DROP
              });
              var place2 = originGlobal;
              console.log(place2.geometry)
              if (place2.geometry.viewport) {
                map.fitBounds(place2.geometry.viewport);
              } else {
                map.setCenter(place2.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
              }
              marker.setPosition(place2.geometry.location);
              marker.setVisible(true);
              //marker.addListener('click', toggleBounce);
              
            } else {
              window.alert('No results found');
            }
          } else {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'La Geoposicion fallo.',
              showConfirmButton: false,
              timer: 100
            })
            //window.alert('Geocoder failed due to: ' + status);
          }
        });
      }, function () {
        handleLocationError(true, infowindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Este browser no soporta de geolocalizacion o GPS esta apagado.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


  function showRoute(message) {
    var uuid = message.topic;
    var newRoute = '<div id="' + uuid + '" class="card text-center">' +
      '<div class="card-body">' +
      '<h5 id="usr' + uuid + '" class="card-title">' + message.usr + ' ofrece:</h5>' +
      '<p class="card-text" id = "Inicio' + uuid + '"> El usuario se debe recoger en : ' + message.origin + '.</p>' +
      '<p class="card-text" id = "fin' + uuid + '"> El usuario tiene como destino :' + message.destination + '</p>' +
      '<p>El usuario tiene una calificación 3 estrellas.</p>' +
      '<p id="costo' + uuid + '">Precio ofrecido : ' + message.costo + '</p>' +

      '<p class="card-text"><small class="text-muted"></small></p>' +
      '</div>' +
      '<div class="card-footer text-center">' +
      '<button  onclick="conductorViajes.verRuta(' + "'" + uuid + "'" + ')" type="button"  class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Ver ruta</button>' +
      '<button  onclick="conductorViajes.eliminar(' + "'" + uuid + "'" + ')" type="button"  class="btn btn-danger btn-lg btn-block" >Eliminar</button>' +
      '<button  type="button"  class="btn btn-warning btn-lg btn-block" data-toggle="collapse" data-target="#collapseExample' + contador + '" aria-expanded="false" aria-controls="collapseExample">Subastar</button>' +
      '</p>' +
      '<div class="collapse" id="collapseExample' + contador + '">' +
      '<div class="card card-body">' +
      '<div class="opciones">' +
      '<div class="btn-group">' +
      '<button onclick="conductorViajes.ofertar(' + "'boton1" + uuid + "'" + ')" type="button" id="boton1' + uuid + '" class="btn btn-outline-primary" >' + message.costo + '</button>' +
      '</div><div class="btn-group">' +
      '<button onclick="conductorViajes.ofertar(' + "'boton2" + uuid + "'" + ')" type="button" id="boton2' + uuid + '" class="btn btn-outline-primary" >' + (parseInt(message.costo) + parseInt(5000)) + '</button>' +
      '</div><div class="btn-group">' +
      '<button onclick="conductorViajes.ofertar(' + "'boton3" + uuid + "'" + ')" type="button" id="boton3' + uuid + '" class="btn btn-outline-primary" >' + (parseInt(message.costo) + parseInt(7000)) + '</button>' +
      '</div></div>' +
      '</div>' +
      '</div>' +

      '</div>' +
      '</div>'
    $("#listaDeViajes").append(newRoute);
    contador++;
  }

  return {

    init: function () {
      connect();
      initMap();


    },

    disconnect: function () {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      setConnected(false);
      console.log("Disconnected");
    },

    ofertar: function (uuid) {
      sendOferta(uuid);
    },

    verRuta: function (uuid) {
      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      infowindow.setContent(infowindowContent);
      var directionsService = new google.maps.DirectionsService;
      calculateAndDisplayRoute(directionsService, uuid);
    },

    subastar: function (uuid) {
      Cookies.remove('subasta');
      var info = {
        correo: $('#usr' + uuid).text().split(':')[1],
        origin: $('#Inicio' + uuid).text().split(':')[1],
        destination: $('#fin' + uuid).text().split(':')[1],
        costo: $('#costo' + uuid).text().split(':')[1],
      }
      Cookies.set('subasta', JSON.stringify(info));
      //location.href = 'subasta';
    },

    eliminar: function (uuid) {
      $('#' + uuid).remove();
      if (document.getElementById('listaDeViajes').childElementCount == 0) {
        $("#noHayViajes").css({ 'display': 'block' });
      }
    }
  };

})();



