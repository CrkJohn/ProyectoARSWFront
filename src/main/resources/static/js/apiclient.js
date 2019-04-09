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
			console.log("DATA PASAJERO -> "+datos);
			$.ajax({
				type: "POST",
				url: 'https://backarsw.herokuapp.com/v1/pasajeros',
				contentType: 'application/json', 
				data: datos,
				success: succ,
				error: err
			})
		},

		registerConductor:function(datos, succ, err){
			console.log("DATA CONDUCTOR -> "+datos);
			$.ajax({
				type: "POST",
				url: 'https://backarsw.herokuapp.com/v1/conductores',
				contentType: 'application/json',
				data: datos,
				success: succ,
				error: err
			})
		}
	}
})();
