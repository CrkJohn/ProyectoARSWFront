var aceptarOferta =(function () {

    var stompClient = null;
    
    var sendTopic = function (message) {
      var respuesta = {
        pasajero: username = JSON.parse( Cookies.get('pasajero')).correo,
        conductor : $("#usr"+message).text().split(":")[1]
      }
      console.log("Se envia la informacion del viaje aceptado");
      console.log(respuesta);
      stompClient.send("/topic/aceptarViaje", {}, JSON.stringify(respuesta));
  
    };
    
  var connectAndSubscribe = function () {
    console.info('Connecting to WS...');
    var url = 'stompendpoint';
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/aceptarViaje', function (eventbody) {
        alert("Se acepto el viaje");
      });
    });
  };
    
    function connect() {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/contraoferta', function (oferta) {
                showOffers(JSON.parse(oferta.body));
                
            });
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

    function showOffers(message){
        var uuid = guid();
        var message=message;
        var  newOffer = '<div id="'+uuid+'" class="card text-center">'+
                            '<div class="card-body">' +
                                '<h5 id="usr'+uuid+'" class="card-title">Usuario ofertante : '+ message.usr + '</h5>' +
                                    '<p id="costo'+uuid+'">Precio ofrecido : '+message.costo+'</p>'+  
                                        '<p class="card-text"><small class="text-muted"></small></p>' +
                            '</div>'+   
                            '<div class="card-footer text-center">' +
                                '<button onclick="aceptarOferta.aceptarViaje('+"'"+uuid+"'"+')" type="button" class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Aceptar</button>' +
                                '<button onclick="aceptarOferta.eliminar('+"'"+uuid+"'"+')" type="button"  class="btn btn-danger btn-lg btn-block" >Rechazar</button>'+
                            '</div>'+
                        '</div>'
        $("#listaDeOfertas").append(newOffer);
    }

    return {

        init: function () {
            connect();
            connectAndSubscribe();

        },
        
        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },

        eliminar : function(uuid){
            $('#'+uuid).remove();
        },

        aceptarViaje : function(message){
            sendTopic(message);
            location.href='subasta';
        }

    };

})();
