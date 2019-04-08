app=(function(){

    var onSuccess = function(data){
         location.href = "userHome";
    }

    var onError = function(data){
         alert("El correo o la contraseña son incorrectas.");
    }

    return{
        getUsuarioByCorreo:function(correo){
            console.log("APP",correo);
            return apiclient.getUsuarioByCorreo(correo, function(usuario){
                console.log(usuario);
            });
        },
        
        login:function(name){
        	if(!this.validateLogin()) return; //validateLogin fails
            var correo = $('#correoLogin').val();
            var clave = $('#claveLogin').val();
            console.log("APP "+correo+" - "+clave);
            return apiclient.login(correo, clave, onSuccess, onError);
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
        }
        
        register:function(name){
        	
        }
        
        registerLogin:function(name){
        	
        	var nombres=$('#nombresRegister');
        	if(nombres.val()==""){
        		window.alert("Por favor ingrese sus nombres");
        		nombres.focus();
        		return false;
        	}
        	var apellidos=$('#apellidosRegister');
        	if(apellidos.val()==""){
        		window.alert("Por favor ingrese sus apellidos");
        		apellidos.focus();
        		return false;
        	}
        	var fechaNacimientoLogin=$('#fechaNacimientoLogin');
        	if(fechaNacimientoLogin.val()==""){
        		window.alert("Por favor ingrese su fecha de nacimiento");
        		fechaNacimientoLogin.focus();
        		return false;
        	}
        	var correoLogin = $('#correoLogin');
        	if(correoLogin.val()==""){
        		window.alert("Por favor ingrese su correo");
        		correoLogin.focus();
        		return false;
        	}
        	var claveLogin = $('#claveLogin');
        	if(claveLogin.val()==""){
        		window.alert("Por favor ingrese sus clave");
        		claveLogin.focus();
        		return false;
        	}
        	var reclaveLogin = $('#reclaveLogin');
        	if(reclaveLogin.val()==""){
        		window.alert("Por favor confirme su clave");
        		reclaveLogin.focus();
        		return false;
        	}
        	return true;
        }
    }
})();
