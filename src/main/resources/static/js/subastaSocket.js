var stomp = (function () {


    var stompClient = null;
    var uuid = null;

    var onSucessRegistroViaje = function(data){
        alert("Se pudo registrar satisfactoriamente el viaje");
    }

    var onErrorRegistroViaje = function(data){
        alert("Oops!!, no se pudo registrar el viaje");
    }

    var sendTopic = function (value) {
        console.log("Jajajaj");
        stompClient.send("/topic/subasta." + uuid, {}, JSON.stringify(value));
    };
    function wait(ms) {
        var d = new Date();
        var d2 = null;
        do { d2 = new Date(); }
        while (d2 - d < ms);
    }

    var msj = function (json) {
        console.log(json);
        console.log(json.type);
        var cookie = Cookies.get('pasajero') ? 'pasajero' : 'coductor';
        console.log(cookie)
        if (json.type.localeCompare("enviar") == 0) {
            var value = {
                type: "recibir"
            }
            console.log("aca vamos")
            sendTopic(value);
        } else if (json.type.localeCompare("recibir") == 0 && cookie.localeCompare('pasajero') == 0) {
            var calificacionUsuario = 0;
            Swal.mixin({
                input: 'text',
                confirmButtonText: 'Enviar',
                showCancelButton: false,
            }).queue([
                {
                    title: 'Califica tu conductor',
                }
            ]).then((result) => {

                if (result.value) {
                    if (isNaN(result.value) || result.value == "") {
                        Swal.fire({
                            position: 'top-end',
                            type: 'error',
                            title: 'Número inválido o campo vacio',
                            showConfirmButton: false,
                            timer: 5000

                        })

                        var value = {
                            type: "recibir" , 
                            correo  : JSON.parse(Cookies.get('pasajero')).correo
                        }
                        msj(value);

                    } else if (parseInt(result.value, 10) < 0) {
                        wait(1000);
                        Swal.fire({
                            position: 'top-end',
                            type: 'error',
                            title: 'No se aceptan valores negativos',
                            showConfirmButton: false,
                            timer: 1000
                        })


                        var value = {
                            type: "recibir" , 
                            correo  : JSON.parse(Cookies.get('pasajero')).correo
                        }
                        msj(value);
                    } else {

                        calificacionUsuario = result.value;
                        var value = {
                            calificacionUsuario: calificacionUsuario,
                            correo  : JSON.parse(Cookies.get('pasajero')).correo,
                            type: 'END'
                        }
                        sendTopic(value);
                    }
                } else {
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Ah cancelado la solicitud',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })
        } else if (json.type.localeCompare("END") == 0 && cookie.localeCompare('coductor') == 0) {
            console.log("NO QUIERE FUNCIONAR ESTA MIERDA");
            console.log(json);
            Swal.mixin({
                input: 'text',
                confirmButtonText: 'Enviar',
                showCancelButton: false,
            }).queue([
                {
                    title: 'Califica tu pasajero',
                }
            ]).then((result) => {

                if (result.value) {
                    if (isNaN(result.value) || result.value == "") {
                        Swal.fire({
                            position: 'top-end',
                            type: 'error',
                            title: 'Número inválido o campo vacio',
                            showConfirmButton: false,
                            timer: 5000

                        })
                        var value = {
                            type: "END",
                            calificacionUsuario  : json.calificacionUsuario,
                            correo : json.correo
                        }
                        msj(value);

                    } else if (parseInt(result.value, 10) < 0) {
                        wait(1000);
                        Swal.fire({
                            position: 'top-end',
                            type: 'error',
                            title: 'No se aceptan valores negativos',
                            showConfirmButton: false,
                            timer: 1000
                        })


                        var value = {
                            type: "END",
                            calificacionUsuario  : json.calificacionUsuario,
                            correo : json.correo
                        }
                        msj(value);
                    }else {

                        var calificacionUsuario1 = result.value;
                        var gson = {
                            "aceptado" : true,
                            "lugarOrigen": JSON.parse(Cookies.get('subasta')).origin,
                            "lugarDestino": JSON.parse(Cookies.get('subasta')).destination,
                            "correoConductor": JSON.parse(Cookies.get('conductor')).correo,
                            "correoPasajero": json.correo,
                            "costo": parseInt(JSON.parse(Cookies.get('subasta')).costo,10),
                            "tiempo": 10,
                            "automovil": {
                                "placa": "AVG-123"
                            }
                        }
                        console.log(gson);
                        gson = JSON.stringify(gson);
                        console.log(gson);
                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            url: "https://backarsw.herokuapp.com/v1/viajes/save",
                            data: gson,  
                            success: onSucessRegistroViaje,
			                error: onErrorRegistroViaje                    
                        });
                        Cookies.remove('subasta');
                        chat.terminarViaje();

                            
                        
                        
                    }
                } else {
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Ah cancelado la solicitud',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })

        }
    }

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var url = 'stompendpoint';
        var socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/subasta.' + uuid, function (eventbody) {
                msj(JSON.parse(eventbody.body));


            });
        });
    };



    return {

        init: function () {
            uuid = JSON.parse(Cookies.get('subasta')).topic;
            connectAndSubscribe();
            if (Cookies.get('conductor')) {
                $('#terminarViaje').on('click', function () {
                    var mama = {
                        type: "enviar"
                    }
                    msj(mama)
                });
            }

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
