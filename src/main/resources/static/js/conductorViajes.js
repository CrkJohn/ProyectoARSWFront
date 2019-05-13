var conductorViajes =(function () {

    var stompClient = null;
    var contador=0;
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
                $("#noHayViajes").css({'display': 'none'});
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
      stompClient.subscribe('/topic/canales.'+channel, function (eventbody) {
        var message = JSON.parse(eventbody.body);
        if(message.type =="acepto"){
          if(message.conductor.localeCompare(JSON.parse( Cookies.get('conductor')).correo)){
              var uuid = message.uuid;
              console.log(uuid);
              Cookies.remove('subasta');
              var info = {
                  correo : $('#usr'+uuid).text().split(':')[1],
                  origin : $('#Inicio'+uuid).text().split(':')[1],
                  destination: $('#fin'+uuid).text().split(':')[1],
                  costo : $('#costo'+uuid).text().split(':')[1],
              }
              Cookies.set('subasta' , JSON.stringify(info));
            }else{

            }
        }      
      });
      stompClient.subscribe('/topic/canales.199', function (eventbody) {
        var message = JSON.parse(eventbody.body);
        if(message.type == "cancelar"){
          var viajes = document.querySelectorAll('.card.text-center');
          console.log("estoy suscrito en cancelar");
          console.log(message);
          console.log("viajes"+viajes[0].textContent);
          for (var i = viajes.length-1; i >=0; i--) {
              var v=viajes[i].textContent;
              if(message.pasajero.localeCompare(v.split(":")[1])){
                alert("El usuario: "+message.pasajero+" ha cancelado su viaje");
                viajes[i].remove();
                if(document.getElementById('listaDeViajes').childElementCount==0){
                  $("#noHayViajes").css({'display': 'block'});
                }
              }
          }
        }
      });
    });
  };

  var sendOferta = function (uuid) {
    var oferta = {
      costo: $("#"+uuid).text(),
      usr : JSON.parse( Cookies.get('conductor')).correo ,
      uuid  :  uuid.substring(6,uuid.length ) ,
      channelUno : false,
      type : "subasta"
    }
    //console.log(uuid.substring(6,uuid.length ));
    stompClient.send("/topic/canales."+uuid.substring(6,uuid.length ), {}, JSON.stringify(oferta));
    alert("Su oferta ha sido enviada correctamente");
  };

  function calculateAndDisplayRoute(directionsService, directionsDisplay,uuid) { 
        directionsService.route({
          origin: $('#Inicio'+uuid).text().split(':')[1],
          destination: $('#fin'+uuid).text().split(':')[1],
          optimizeWaypoints: true,
          travelMode: 'DRIVING' ,
          provideRouteAlternatives: true
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


    function initMap(){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 4.782715, lng: -74.042611},
            zoom: 15
        });
    }

    function showRoute(message) {
        var uuid = message.topic;
        var  newRoute = '<div id="'+uuid+'" class="card text-center">'+
                            '<div class="card-body">' +
                                '<h5 id="usr'+uuid+'" class="card-title">'+ message.usr + ' ofrece:</h5>' +
                                    '<p class="card-text" id = "Inicio'+uuid+'"> El usuario se debe recoger en : '+ message.origin +'.</p>' +
                                    '<p class="card-text" id = "fin'+uuid+'"> El usuario tiene como destino :'+  message.destination +'</p>' +
                                        '<p>El usuario tiene una calificación 3 estrellas.</p>'+  
                                        '<p id="costo'+uuid+'">Precio ofrecido : '+message.costo+'</p>'+  
                                        
                                        '<p class="card-text"><small class="text-muted"></small></p>' +
                            '</div>'+   
                            '<div class="card-footer text-center">' +
                                '<button  onclick="conductorViajes.verRuta('+"'"+uuid+"'"+')" type="button"  class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Ver ruta</button>' +
                                '<button  onclick="conductorViajes.eliminar('+"'"+uuid+"'"+')" type="button"  class="btn btn-danger btn-lg btn-block" >Eliminar</button>'+
                                '<button  type="button"  class="btn btn-warning btn-lg btn-block" data-toggle="collapse" data-target="#collapseExample'+contador+'" aria-expanded="false" aria-controls="collapseExample">Subastar</button>'+
                                '</p>'+
                                '<div class="collapse" id="collapseExample'+contador+'">'+
                                '<div class="card card-body">'+
                                        '<div class="opciones">'+
                                            '<div class="btn-group">'+
                                            '<button onclick="conductorViajes.ofertar('+"'boton1"+uuid+"'"+')" type="button" id="boton1'+uuid+'" class="btn btn-outline-primary" >'+message.costo+'</button>'+
                                            '</div><div class="btn-group">'+
                                            '<button onclick="conductorViajes.ofertar('+"'boton2"+uuid+"'"+')" type="button" id="boton2'+uuid+'" class="btn btn-outline-primary" >'+(parseInt(message.costo)+parseInt(5000))+'</button>'+
                                            '</div><div class="btn-group">'+
                                            '<button onclick="conductorViajes.ofertar('+"'boton3"+uuid+"'"+')" type="button" id="boton3'+uuid+'" class="btn btn-outline-primary" >'+(parseInt(message.costo)+parseInt(7000))+'</button>'+
                                        '</div></div>'+
                                '</div>'+
                            '</div>'+

                            '</div>'+
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

        ofertar:function(uuid){
            sendOferta(uuid);
        },

        verRuta : function(uuid){
            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            calculateAndDisplayRoute(directionsService, directionsDisplay,uuid);
        },

        subastar : function(uuid){
            Cookies.remove('subasta');
            var info = {
                correo : $('#usr'+uuid).text().split(':')[1],
                origin : $('#Inicio'+uuid).text().split(':')[1],
                destination: $('#fin'+uuid).text().split(':')[1],
                costo : $('#costo'+uuid).text().split(':')[1],
            }
            Cookies.set('subasta' , JSON.stringify(info));
            location.href = 'subasta';
        },

        eliminar : function(uuid){
            $('#'+uuid).remove();
            if(document.getElementById('listaDeViajes').childElementCount==0){
              $("#noHayViajes").css({'display': 'block'});
            }
        }
    };

})();



