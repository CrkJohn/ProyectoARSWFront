app=(function(){
    return{
        getUsuarioByCorreo:function(correo){
            console.log("APP",correo);
            return apiclient.getUsuarioByCorreo(correo, function(usuario){
                console.log(usuario);
            });
        }, 
        login:function(loginData){
            console.log("APP-LOGIN",loginData);
            return apiclient.login(loginData, function(result){
                console.log(result);
                alert("HAS SIDO LOGEADO SATISFACTORIAMENTE");
            });
        }
    }
})();