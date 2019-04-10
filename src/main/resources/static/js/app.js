app=(function(){

    var onSuccessLogin = function(data){
        console.log(data);
        if(data=="pasajero"){
            location.href = "userHome";
        }else{
            location.href = "perfil";
        }
    }

    var onErrorLogin = function(data){
         alert("El correo o la contraseña son incorrectas.");
    }

    var onSuccessRegister = function(data){
        alert("Ha sido registrado satisfactoriamente");
        location.href = "login";
    }

    var onErrorRegister = function(data){
        alert("El correo electrónico o el celular ingresado ya está asociado con una cuenta.");
    }

    var onErrorConductorRegister = function(data){
        alert("El automóvil ya está asociado a otra cuenta");
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
            return apiclient.login(correo, clave, onSuccessLogin, onErrorLogin);
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
        
        register:function(name){
            if(!this.validateRegister()) return; //validationRegister fails
            var user = {
                nombres: $('#nombresRegister').val(),
                fechaNacimiento: $('#fechaNacimientoRegister').val(),
                celular: $('#telefonoRegister').val(),
                correo: $('#correoRegister').val(),
                clave: $('#claveRegister').val()
            }
            //console.log(user);
            user = JSON.stringify(user); //pasa por cadena para que pueda ser guardado en localStorage
            localStorage.setItem('user', user); //guarda el dato
            if($('#conductorCheckbox').is(':checked')){
                console.log("registrarse como conductor");
                location.href = "conductorRegister";
            }else{
            	console.log("registarse como pasajero");
                apiclient.registerPasajero(user, onSuccessRegister, onErrorRegister);
            }
        },
        
        validateRegister:function(name){
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
        	/*var fechaNacimiento=$('#fechaNacimientoRegister');
        	if(fechaNacimiento.val()==""){
        		window.alert("Por favor ingrese su fecha de nacimiento");
        		fechaNacimiento.focus();
        		return false;
            }*/
            var celular=$('#telefonoRegister');
            if(celular.val()==""){
                window.alert("Por favor ingrese su número telefónico");
                telefono.focus();
                return false;
            }
        	var correo = $('#correoRegister');
        	if(correo.val()==""){
        		window.alert("Por favor ingrese su correo");
        		correo.focus();
        		return false;
        	}
        	var clave = $('#claveRegister');
        	if(clave.val()==""){
        		window.alert("Por favor ingrese sus clave");
        		clave.focus();
        		return false;
        	}
        	var reclave = $('#reclaveRegister');
        	if(reclave.val()==""){
        		window.alert("Por favor confirme su clave.");
        		reclave.focus();
        		return false;
            }
            if(clave.val()!=reclave.val()){
                window.alert("Las contraseñas no coinciden.");
                reclave.focus();
                return false;
            }
            return true;
        },

        conductorRegister:function(name){
            console.log("A REGISTRAR OME");
            if(!this.validateConductorRegister()) return;
            var user = JSON.parse(localStorage.getItem('user'));
            var automovil = {
                placa: $('#placaCarroRegister').val(),
                modelo: $('#modeloCarroRegister').val(),
                tipo: $('#marcaCarroRegister').val()
            }
            //user.automovil = automovil;
            console.log(user);
            user = JSON.stringify(user);
            console.log(user);
            apiclient.registerConductor(user, onSuccessRegister, onErrorConductorRegister);
        },

        validateConductorRegister:function(name){
            var placa=$('#placaCarroRegister');
            if(placa.val()==""){
        		window.alert("Por favor ingrese la placa del carro");
        		placa.focus();
        		return false;
            }
            var modelo=$('#modeloCarroRegister');
            if(modelo.val()==""){
                window.alert("Por favor ingrese el modelo del carro");
                modelo.focus();
                return false;
            }
            var marca=$('#marcaCarroRegister');
            if(marca.val()==""){
                window.alert("Por favor ingrese la marca del carro");
                marca.focus();
                return false;
            }
            return true;
        }
    }
})();
