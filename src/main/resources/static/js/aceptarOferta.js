var aceptarOferta =(function () {

    var stompClient = null;
    var contador=0;
    function connect() {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/contraoferta', function (oferta) {
                console.log('Soy una oferta');
                
            });
        });
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
