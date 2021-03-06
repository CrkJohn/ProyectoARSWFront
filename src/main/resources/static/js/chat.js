chat=(function(){

    'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var topic  = null;
var stompClient = null;
var username = null;
var colors = [
    '#61ECB7','#FFE807','#FF6666','#99FFE3','#2196F3', '#40EFA4', '#1DE0F8', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {

    if(Cookies.get('pasajero')){
        username = JSON.parse( Cookies.get('pasajero')).correo
    }else{
        username = JSON.parse( Cookies.get('conductor')).correo
    }
    if(username) {
        chatPage.classList.remove('hidden');
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
    //event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    console.log(Cookies.get('subasta'));
    topic = JSON.parse(Cookies.get('subasta')).topic; 
    stompClient.subscribe('/topic/public.'+topic, onMessageReceived);
    // Tell your username to the server
    stompClient.send("/app/chat.addUser."+topic,{},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/topic/public."+topic, {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else if (message.type === 'END'){
        if(Cookies.get('pasajero')){
            location.href="perdirViajeUser";
            Cookies.remove('subasta');
        }else{
            location.href="viajesDisponiblesConductor";
            Cookies.remove('subasta');
        }
    
    } else {
        messageElement.classList.add('chat-message');
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

var cancelarViaje = function(){ 
    var chatMessage = {
        type: 'END'
    };
    stompClient.send("/topic/public."+topic, {}, JSON.stringify(chatMessage));
  };

return{

        
    init: function () {
       connect();
       messageForm.addEventListener('submit', sendMessage, true);
    },

    terminarViaje: function(){
        cancelarViaje();        
      
    }
}
})();
