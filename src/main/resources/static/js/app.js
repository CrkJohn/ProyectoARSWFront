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
            var correo = $('#correoLogin').val();
            var clave = $('#claveLogin').val();
            console.log(correo+" - "+clave);
            return apiclient.login(correo, clave, onSuccess, onError);
        }
    }
})();
