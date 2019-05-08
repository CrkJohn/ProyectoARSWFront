viajesHechos = (function(){

    var loadViajes = function(){
        var usuario = JSON.parse(Cookies.get("conductor"));
        var correo = usuario.correo;

        $.get("https://backarsw.herokuapp.com/v1/conductores/" + correo + "/viajes",function(data){
            var json = data;
            console.log(json[0])
            var directionsService = new google.maps.DirectionsService;
            for(var i = 0 ; i < Object.keys(json).length ; i++){
                console.log(json[i].lugarOrigen + "  " + json[i].lugarDestino)
                var duration = null
                var distance = null
                directionsService.route({
                    origin:  json[i].lugarOrigen,
                    destination: json[i].lugarDestino,
                    travelMode: 'DRIVING' , 
                },function(response, status) {
                    if (status === 'OK') {
                      var route = response.routes[0];
                      var leg = response.routes[0].legs[0];
                      duration =  route.legs[0].duration.text
                      distance = route.legs[0].distance.text;
                      console.log(duration +  " " + distance); 
                      
                }});
                
                console.log(duration +  " " + distance);  
                $("#viaje").append(
                    '<li><a href="#">'+
                    '<h2> aqui </h2>'+
                    '<p>  El viaje inicio en ' + json[i].lugarOrigen + 'donde tuvo un desplazamiento de '+ distance +' hacia el'+
                        'destino' + json[i].lugarDestino + ' tardando ' + duration+'</p>'+
                    '</a>'+
                    '</li>'
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