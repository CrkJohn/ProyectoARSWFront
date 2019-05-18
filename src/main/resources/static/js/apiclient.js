apiclient=(function(){
	return {
		getUsuarioByCorreo:function(correo,callback){
			console.log("API CLIENT",correo);
			$.get("https://backarsw.herokuapp.com/v1/pasajeros/" + correo, function(data) {
				callback(data);
			});
		},

		/*
			FUNCIONES DE LOGIN - LOGOUT
		*/
		loginPasajero:function(succ, err){
			$.ajax({
				url : "/pasajero/login",
				type : "POST",
				data : $("#FormLoginPasajero").serialize(),
				success: succ,
				error : err
			});
		},
		
		loginConductor:function(succ, err){
			console.log($("#claveLogin").val());
			$.ajax({
				url : "/conductor/login",
				type : "POST",
				data : $("#FormLoginConductor").serialize(),
				success: succ,
				error : err
			});
		},
		
		logout:function(succ, err){
			$.ajax({
				url: "/logout",
				type: "GET",
				success: succ,
				error: err
			});
		},


		/*
			FUNCIONES DE REGISTRO
		*/
		registroPasajero:function(datos, succ, err){
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/pasajeros/signup",
				data: datos,
				//dataType : 'json',
				success: succ,
				error: err
			});
		},

		registroConductor:function(datos, succ, err){
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://backarsw.herokuapp.com/v1/conductores/signup",
				data: datos,
				success: succ,
				error: err
			});
		}
	}
})();
