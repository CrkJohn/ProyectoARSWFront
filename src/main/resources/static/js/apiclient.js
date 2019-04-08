apiclient=(function(){
	return {
		getUsuarioByCorreo:function(correo,callback){
			console.log("API CLIENT",correo);
			$.get("https://backarsw.herokuapp.com/v1/pasajeros/" + correo, function(data) {
				callback(data);
			});
		},
		login:function(correo,clave, succ, err){
			console.log("APICLIENT -> ",correo,clave);
			$.ajax({
			    type: "GET",  
			    url: "https://backarsw.herokuapp.com/v1/usuarios/"+correo+"/"+clave,
			    success: succ,
			    error: err
			});
		}
	}
})();
