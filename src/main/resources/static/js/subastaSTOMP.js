var sbStomp =(function () {

    var stompClient = null;
    var channel;
    var sendTopic = function(){
        if($("#msg").val() ==""){
            alert("EL mensaje no puede ir vacio")
        }else{
            var msg = {
                msgText : $('#msg').val(),
           }
           stompClient.send("/topic/newpoint.channel", {}, JSON.stringify(msg)); 
           var newMsgChat = '<div class="outgoing-chats">'+
               '<div class="outgoing-chats-msg">'+
                   '<p>' +$('#msg').val()+
                   '</p>'+
                   '<span class="time">11:30 pm</span>'+
               '</div>'+
           '</div>';
            $("#chat").append(newMsgChat);
        }
    };

    var connectAndSubscribe = function (channel) {
        console.info('Connecting to WS...');    
        //var url = 'http://localhost:8080/stompendpoint';
        var url = 'stompendpoint';
        var socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newpoint.channel', function (eventbody) {
                var textMsg =JSON.parse(eventbody.body);
                console.log(textMsg)
                var newMsgChat = '<div class="received-chats"><div class="received-msg"> <div class="received-msg-inbox"><p>'+
                        textMsg.msgText+'</p><span class="time"></span></div></div></div>';   
                $("#chat").append(newMsgChat);
            });
        });
    };
    
    

    return {

        init: function () {
            
            var btnPedirViaje  = document.getElementById("sendMsg")
            btnPedirViaje.addEventListener('click',sendTopic);
            channel = 1;
            connectAndSubscribe(1);
            
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