var sbStomp =(function () {
    
    var formatAMPM=function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };            
    var insertChat=function (who, text, time){
        if (time === undefined){
            time = 0;
        }
        var control = "";
        var date = formatAMPM(new Date());
        
        if (who == "me"){
            control = '<li style="width:100%">' +
                            '<div class="msj macro">' +
                            '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                                '<div class="text text-l">' +
                                    '<p>'+ text +'</p>' +
                                    '<p><small>'+date+'</small></p>' +
                                '</div>' +
                            '</div>' +
                        '</li>';                    
        }else{
            control = '<li style="width:100%;">' +
                            '<div class="msj-rta macro">' +
                                '<div class="text text-r">' +
                                    '<p>'+text+'</p>' +
                                    '<p><small>'+date+'</small></p>' +
                                '</div>' +
                            '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                      '</li>';
        }
        setTimeout(
            function(){                        
                $("#scroll").append(control).scrollTop($("#scroll").prop('scrollHeight'));
            }, time);
        
    };
    

    var resetChat= function(){
        $("#scroll").empty();
    };
    var stompClient = null;
    var channel;
    
    var sendTopic = function(){
        $(".mytext").on("keydown", function(e){
            if (e.which == 13){
                var text = $(this).val();
           stompClient.send("/topic/newpoint.channel", {}, JSON.stringify(text)); 
           if (text !== ""){
                insertChat("me", text);              
                $(this).val('');
                }
            }
        });
}

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
                $(".mytext").on("keydown", function(e){
                    if (e.which == 13){
                        var text = $(this).val();
                        if (text !== ""){
                            insertChat("you", text);              
                            $(this).val('');
                        }
                    }
                });
                
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