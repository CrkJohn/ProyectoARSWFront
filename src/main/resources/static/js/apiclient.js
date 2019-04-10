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
		},

		registerPasajero:function(datos, succ, err){
			console.log("DATA PASAJERO -> ");
			console.log(datos);
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/pasajeros/savePasajero",
				data: datos,
				dataType : 'json',
				success: succ,
				error: err
			})
		},

		registerConductor:function(datos, succ, err){
			console.log("DATA CONDUCTOR ->");
			console.log(datos);
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/conductores/saveConductor",
				//url: "http://localhost:8080/v1/conductores/saveConductor",
				data: datos,
				dataType : 'json',
				success: succ,
				error: err
			})
		}
	}
})();
