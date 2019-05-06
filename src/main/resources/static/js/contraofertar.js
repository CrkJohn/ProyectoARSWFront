contraofertar = (function () {
    var stompClient = null;
  
    var sendTopic = function () {
      var oferta = {
        costo: document.getElementById('boton').value,
        usr : document.cookie.split(';')[0]
      }
      console.log(oferta);
      stompClient.send("/topic/contraoferta", {}, JSON.stringify(oferta));
  
    };
  
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
        var btn = document.getElementById('boton');
        btn.addEventListener('click', function () {
          if($("#costo").val()>0){
            sendTopic();
          }   
        });
        connectAndSubscribe();
      }
    }
  })();
  
  