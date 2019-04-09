var stompConductor =(function () {
	var stompClient = null;

	function setConnected(connected) {
	    $("#connect").prop("disabled", connected);
	    if (connected) {
	        $("#conversation").show();
	    }
	    else {
	        $("#conversation").hide();
	    }
	    $("#greetings").html("");
	}
	

	function sendName() {
	    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
	}

	function connectAndSubscribe() {
	    var socket = new SockJS('/gs-guide-websocket');
	    stompClient = Stomp.over(socket);
	    stompClient.connect({}, function (frame) {
	        setConnected(true);
	        console.log('Connected: ' + frame);
	        stompClient.subscribe('/topic/greetings', function (greeting) {
	            showGreeting(JSON.parse(greeting.body).content);
	        });
	    });
	}



	function showGreeting(message) {
	    $("#greetings").append("<tr><td>" + message + "</td></tr>");
	}	
	return {

        init: function () {
        	$("form").on('submit', function (e) {
    	        e.preventDefault();
    	    });
    	    $("#connect").click(function() {
    	    	connect(); 
    	    });
    	    $("#disconnect").click(function() { 
    	    	disconnect(); 
    	    });    
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