var stomp =(function () {

   
    var stompClient = null;
   
    
    
    var sendTopicNewPt = function(){
        stompClient.send("http://localhost:8080/topic/newpoint", {}, JSON.stringify(pt)); 
    };

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('localhost:8080/stompendpoint');
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('localhost:8080/topic/newpoint', function (eventbody) {
                var ptn=JSON.parse(eventbody.body);
                addPointToCanvas(ptn);
            });
        });
    };
    
    

    return {

        init: function () {
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