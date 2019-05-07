viajesHechos = (function(){

    var loadViajes = function(){
        var usuario = JSON.parse(Cookies.get("conductor"));
        var correo = usuario.correo;

        $.get("https://backarsw.herokuapp.com/v1/conductores/" + correo + "/viajes",function(data){
            var json = data;
            console.log(data)
            for(var i = 0 ; i < Object.keys(json).length ; i++){
                $("#viaje").append(
                    '<div class="card">'+
				'<b class="top"><b class="b1t"></b><b class="b2"></b></b>'+ 
				'<div class="card-body"> ' + 
			    '	<div id="tooglePedirViaje" class="form-header blue accent-1">'  + 
				'		<h3><i class="fa fa-flag"></i></i> Viaje fecha : </h3>'+ 
				'	</div>' + 
				'	<br>' + 
				'	<div class="md-form">' + 
				'		<input type="text" id="pac-output" class="form-control">' + 
				'	</div>' + 
				'</div>' + 
				'    <b class="bottom"><b class="b2"></b><b class="b1b"></b></b>' + 
			    '</div>' + 
                '</br>'
                );
            }
        });

    }
    
    

    return {
        init : function (){
            loadViajes();
        }
    }

})();