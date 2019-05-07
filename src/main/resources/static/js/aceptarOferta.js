var aceptarOferta =(function () {

    var stompClient = null;
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
        var  newOffer = '<div id="'+uuid+'" class="card text-center">'+
                            '<div class="card-body">' +
                                '<h5 id="usr'+uuid+'" class="card-title">Usuario ofertante : '+ message.usr + '</h5>' +
                                    '<p id="costo'+uuid+'">Precio ofrecido : '+message.costo+'</p>'+  
                                        '<p class="card-text"><small class="text-muted"></small></p>' +
                            '</div>'+   
                            '<div class="card-footer text-center">' +
                                '<button type="button"  class="btn  btn-lg btn-block" style = "background-color: #5ccfb1; color : white">Aceptar</button>' +
                                '<button type="button"  class="btn btn-danger btn-lg btn-block" >Rechazar</button>'+
                            '</div>'+
                        '</div>'
        $("#listaDeOfertas").append(newOffer);
    }

    return {

        init: function () {
            connect();
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
