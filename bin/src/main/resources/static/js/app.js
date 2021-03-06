app=(function(){

    var onSuccessLoginPasajero = function(data){
        location.href = "perdirViajeUser";
    }
    
    var onSuccessLoginConductor = function(data){
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
        //console.log(data);
        alert("Ha sido registrado exitosamente como pasajero de Evern Driver");
        location.href = "loginPasajero";
    }

    var onErrorRegistroPasajero = function(data){
        console.log(data);
        alert("No se pudo realizar el registro del pasajero correctamente");
        location.href = "registroPasajero";
    }

    var onErrorRegistroConductor = function(data){
        alert("No se pudo realizar el registro del conductor correctamente");
        location.href = "registroConductor";
    }

    return{
        getUsuarioByCorreo:function(correo){
            console.log("APP",correo);
            return apiclient.getUsuarioByCorreo(correo, function(usuario){
                console.log(usuario);
            });
        },
        
        loginPasajero:function(name){
        	if(!this.validateLogin()) return; //validateLogin fails
            var correo = $('#correoLogin').val();
            var clave = $('#claveLogin').val();
            console.log("APP "+correo+" - "+clave);
            document.cookie=correo;
            //alert(document.cookie);
            return apiclient.loginPasajero(correo, clave, onSuccessLoginPasajero, onErrorLogin);
        },
        
        loginConductor:function(name){
        	if(!this.validateLogin()) return; //validateLogin fails
            var correo = $('#correoLogin').val();
            var clave = $('#claveLogin').val();
            document.cookie=correo;
            //alert(document.cookie);
            return apiclient.loginConductor(correo, clave, onSuccessLoginConductor, onErrorLogin);
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
            pasajero = JSON.stringify(pasajero);
            console.log("APP REGISTRO PASAJERO -> "+pasajero);
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
            console.log("APP REGISTRO AUTOMOVIL -> "+automovil);
            conductor = JSON.stringify(conductor);
            console.log("APP REGISTRO CONDUCTOR -> "+conductor);
            return apiclient.registroConductor(conductor, onSucessRegistroConductor,
                onErrorRegistroConductor);
        }
    }
})();