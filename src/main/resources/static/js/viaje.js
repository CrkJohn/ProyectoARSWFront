api=(
	function pedirViaje(){
		var viaje={
				direccionIni:$("#direccionRecogida").val,
				direccionFin:$("#direccionDestino").val,
				precio:$("#precio").val
		}
		/*$.ajax({
		        type: "POST",
		        url: 'v1/viajes',
		        contentType: 'application/json', 
		        data:{
		        	JSON.stringify(viaje),
		        },
		        success: callback,
		        error: function (XMLHttpRequest, textStatus, errorThrown){
		        	alert("Status: "+textStatus); alert("Error: "+ errorThrown);
		        }
		  });*/
	}
)();