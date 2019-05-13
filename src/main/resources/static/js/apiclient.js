apiclient=(function(){
	return {
		getUsuarioByCorreo:function(correo,callback){
			console.log("API CLIENT",correo);
			$.get("https://backarsw.herokuapp.com/v1/pasajeros/" + correo, function(data) {
				callback(data);
			});
		},

		loginPasajero:function(datos, succ, err){
			console.log(datos);
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/pasajeros/login",
				data: datos,
			    success: succ,
			    error: err
			});
		},
		
		loginConductor:function(datos, succ, err){
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/conductores/login",
				data: datos,
			    success: succ,
			    error: err
			});
		},

		registroPasajero:function(datos, succ, err){
			console.log("DATA PASAJERO -> ");
			console.log(datos);
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/pasajeros/signup",
				data: datos,
				//dataType : 'json',
				success: succ,
				error: err
			})
		},

		registroConductor:function(datos, succ, err){
			console.log("DATA CONDUCTOR -> ");
			console.log(datos);
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/conductores/signup",
				data: datos,
				success: succ,
				error: err
			})
		}
	}
})();
