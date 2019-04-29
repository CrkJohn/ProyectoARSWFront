var conductorViajes =(function () {

    var stompClient = null;

    function connect() {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/pedirViaje', function (viaje) {
                console.log('Hollaaaa');
                showRoute(JSON.parse(viaje.body));
            });
        });
    }

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

    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
    }

    function initMap(){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 4.782715, lng: -74.042611},
            zoom: 15
        });
    }

    function showRoute(message) {
        var uuid = guid();
        var  newRoute = '<div id="'+uuid+'" class="card text-center">'+
                            '<div class="card-body">' +
                                '<h5 id="usr'+uuid+'" class="card-title">Viaje pedido por el usario : '+ message.usr + '</h5>' +
                                    '<p class="card-text" id = "Inicio'+uuid+'"> El usuario se debe recoger en : '+ message.origin +'.</p>' +
                                    '<p class="card-text" id = "fin'+uuid+'"> El usuario tiene como destino :'+  message.destination +'</p>' +
                                        '<p>El usuario tiene una calificación 3 estrellas.</p>'+  
                                        '<p id="costo'+uuid+'">Precio ofrecido : '+message.costo+'</p>'+  
                                        
                                        '<p class="card-text"><small class="text-muted"></small></p>' +
                            '</div>'+   
                            '<div class="card-footer text-center">' +
                                '<button  onclick="conductorViajes.verRuta('+"'"+uuid+"'"+')" type="button"  class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Ver ruta</button>' +
                                '<button  onclick="conductorViajes.eliminar('+"'"+uuid+"'"+')" type="button"  class="btn btn-danger btn-lg btn-block" >Eliminar</button>'+
                                '<button  type="button"  class="btn btn-warning btn-lg btn-block" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Subastar</button>'+
                                '</p>'+
                                '<div class="collapse" id="collapseExample">'+
                                '<div class="card card-body">'+
                                        '<div class="opciones">'+
                                            '<button type="button" id="boton1" class="btn btn-outline-primary" >'+message.costo+'</button>'+
                                            '<button type="button" id="boton2" class="btn btn-outline-primary" >'+(parseInt(message.costo)+parseInt(5000))+'</button>'+
                                            '<button type="button" id="boton3" class="btn btn-outline-primary" >'+(parseInt(message.costo)+parseInt(7000))+'</button>'+
                                        '</div>'+
                                '</div>'+
                            '</div>'+

                            '</div>'+
                        '</div>'
        $("#listaDeViajes").append(newRoute);
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
        }
    };

})();



