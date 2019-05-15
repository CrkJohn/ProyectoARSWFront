app=(function(){

    var onSuccessLoginPasajero = function(data){
        var info = {
            correo : $('#correoLogin').val(),
            clave : $('#claveLogin').val()
        }
        Cookies.set('pasajero' , JSON.stringify(info));
        location.href = "perdirViajeUser";
    }
    
    var onSuccessLoginConductor = function(data){
        var info = {
            correo : $('#correoLogin').val(),
            clave : $('#claveLogin').val()
        }
        Cookies.set('conductor' , JSON.stringify(info));
    	location.href = "perfilConductor";
    }
    
    var onErrorLogin = function(data){
        alert("El correo o la contraseña no son correctas.");
    }

    var onErrorConductorRegister = function(data){
        alert("El automóvil ya está asociado a otra cuenta");
    }

    var onSucessRegistroConductor = function (data){
        alert("Ha sido registrado exitosamente como conductor de Evern Driver");
        location.href = "loginConductor";
    }

    var onSucessRegistroPasajero = function(data){
        alert("Ha sido registrado exitosamente como pasajero de Evern Driver");
        location.href = "loginPasajero";
    }

    var onErrorRegistroPasajero = function(data){
        alert("No se pudo realizar el registro del pasajero correctamente, el correo o el celular ingresado ya existe en\
            EVERN DRIVER");
        location.href = "registroPasajero";
    }

    var onErrorRegistroConductor = function(data){
        alert("No se pudo realizar el registro del conductor correctamente, el correo o el celular ingresado ya existe en\
            EVERN DRIVER");
        location.href = "registroConductor";
    }

    return{
        getUsuarioByCorreo:function(correo){
            return apiclient.getUsuarioByCorreo(correo, function(usuario){
                console.log(usuario);
            });
        },
        
        loginPasajero:function(name){
        	if(!this.validateLogin()) return; //validateLogin fails
            var login = {
                "correo": $('#correoLogin').val(),
                "clave": $('#claveLogin').val()
            }
            login = JSON.stringify(login);
            return apiclient.loginPasajero(login, onSuccessLoginPasajero, onErrorLogin);
        },

        logoutPasajero: function(name){
            Cookies.remove('pasajero');
        },
        
        loginConductor:function(name){
            if(!this.validateLogin()) return; //validateLogin fails
            var login = {
                "correo": $('#correoLogin').val(),
                "clave": $('#claveLogin').val()
            }
            login = JSON.stringify(login);
            return apiclient.loginConductor(login, onSuccessLoginConductor, onErrorLogin);
        },

        logoutConductor:function(name){
            Cookies.remove('conductor');
        },

        validateLogin:function(name){
        	var correo=$('#correoLogin');
        	if(correo.val()==""){
        		window.alert("Por favor ingrese su correo");
        		correo.focus();
        		return false;
        	}
        	var clave=$('#claveLogin');
        	if(clave.val()==""){
        		window.alert("Por favor ingrese su contraseña");
        		clave.focus();
        		return false;
        	}
        	return true;
        },

        registroPasajero:function(name){
            var pasajero = {
                "nombres": $('[name=nombres]').val(),
                "apellidos": $('[name=apellidos]').val(),
                "correo": $('[name=correo]').val(), 
                "clave": $('[name=clave]').val(),
                "celular": $('[name=telefono]').val()					
            };
            pasajero = JSON.stringify(pasajero); //parsea a formato JSON
            return apiclient.registroPasajero(pasajero, onSucessRegistroPasajero,
                onErrorRegistroPasajero);
        },

        registroConductor:function(name){
            var conductor = {
                "nombres": $('[name=nombres]').val(),
                "apellidos": $('[name=apellidos]').val(),
                "correo": $('[name=correo]').val(), 
                "clave": $('[name=clave]').val(),
                "celular": $('[name=telefono]').val()					
            };
            var automovil = {
                "placa": $('[name=placaAutomovil]').val(),
                "modelo": $('[name=modeloAutomovil]').val(),
                "color": $('[name=colorAutomovil]').val(),
                "tipo": $('[name=tipoAutomovil]').val()
            }
            conductor.automovil = automovil;
            conductor = JSON.stringify(conductor); //parsea a formato JSON
            return apiclient.registroConductor(conductor, onSucessRegistroConductor,
                onErrorRegistroConductor);
        }
    }
})();