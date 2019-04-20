var conductorViajes =(function () {

    var stompClient = null;

    function connect() {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/pedirViaje', function (viaje) {
                showRoute(JSON.parse(viaje.body));
                
            });
        });
    }

    function initMap(){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 4.782715, lng: -74.042611},
            zoom: 15
        });
    }

    function showRoute(message) {
        var  newRoute = '<div class="card text-center" ><div class="card-body">' +
            '<h5 class="card-title">Viaje pedido por el usario : '+ message.usr + '</h5>' +
            '<p class="card-text" id = "Inicio"> El usuario se debe recoger en : '+ message.origin +'.</p>' +
            '<p class="card-text" id = "fin">        El usuario tiene como destino :'+  message.destination +'</p>' +
            '<p>      El usuario tiene una calificaion 3 estrellas.  </p>     <p class="card-text"><small class="text-muted"></small></p>' +
            '</div>   <div class="card-footer text-center">' +
                '<button type="button" class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Ver ruta</button>' +
                '<button type="button" class="btn btn-danger btn-lg btn-block">Eliminar</button>'+
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
        }
    };

})();



