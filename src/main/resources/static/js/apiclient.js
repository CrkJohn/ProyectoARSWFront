apiclient=(function(){
	return {
		getUsuarioByCorreo:function(correo,callback){
			console.log("API CLIENT",correo);
			$.get("https://backarsw.herokuapp.com/v1/pasajeros/" + correo, function(data) {
				callback(data);
			});
		},
		login:function(loginData, callback){
			console.log(loginData);
			var arr = loginData.split('/');
			var correo = arr[0];
			var clave = arr[1];
			$.ajax({
			    type: "GET",  
			    url: "https://backarsw.herokuapp.com/v1/usuarios/"+correo+"/"+clave,
			    success: callback,
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
			        alert("Clave incorrecta");
			    }    
			});
		}
	}
})();