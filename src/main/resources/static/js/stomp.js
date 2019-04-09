var stomp =(function () {

   
    var stompClient = null;
   
    
    
    var sendTopic = function(){
    	
    	var viaje = {
    		 lugarOrigen : $('#direccionInicio').val(),
    		 lugarDestino : $('#direccionDestino').val(),
    		 costo : $('#precio').val()
    		
    	}
    	console.log(viaje);
        stompClient.send("/topic/newpoint", {}, JSON.stringify(viaje)); 
       
    };

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        
        var url = 'http://localhost:8080/stompendpoint';
        //var url = '/stompendpoint';
              
        var socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newpoint', function (eventbody) {
            	alert("Funcioan");	
            });
        });
    };
    
    

    return {

        init: function () {
            var btnPedirViaje  = document.getElementById("pedirViaje")
            btnPedirViaje.addEventListener('click',sendTopic);
            connectAndSubscribe();
            
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