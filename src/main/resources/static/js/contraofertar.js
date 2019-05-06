contraofertar = (function () {
    var stompClient = null;
  
    var sendTopic = function (uuid) {
    	
      var oferta = {
        costo: $("#"+uuid).text(),
        usr : JSON.parse( Cookies.get('conductor')).correo
      }
      console.log(oferta);
      stompClient.send("/topic/contraoferta", {}, JSON.stringify(oferta));
  
    };
    
    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
    }
    
   
  
    var connectAndSubscribe = function () {
      console.info('Connecting to WS...');
      var url = 'stompendpoint';
      var socket = new SockJS(url);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/contraoferta', function (eventbody) {
          alert("Se ha enviado su oferta correctamente");
        });
      });
    };
  
    return {
      init: function () {
    	  connectAndSubscribe(); 
      },
    
    ofertar:function(uuid){
    	sendTopic(uuid);
    
    }
    }
  })();
  
  