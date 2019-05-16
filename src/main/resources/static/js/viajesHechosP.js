viajesHechosP = (function(){

    var loadViajes = function(){
        var usuario = JSON.parse(Cookies.get("pasajero"));
        var correo = usuario.correo;

        $.get("https://backarsw.herokuapp.com/v1/pasajeros/" + correo + "/viajes",function(data){
            var json = data;
            var directionsService = new google.maps.DirectionsService;
            if(Object.keys(json).length){
                $("#noHayViajes").css({'display': 'none'});
                $("#viaje").css({'padding' : '3em'});
            }
            for(var i = 0 ; i < Object.keys(json).length ; i++){
                $("#noHayViajes").css({'display': 'none'});
                var a = durationAndDistance(json[i]);
                function durationAndDistance(json){
                    directionsService.route({
                        origin:  json.lugarOrigen,
                        destination: json.lugarDestino,
                        travelMode: 'DRIVING' , 
                    },function(response, status) {
                        if (status === 'OK') {
                        var route = response.routes[0];
                        var leg = response.routes[0].legs[0];
                        duration =  route.legs[0].duration.text
                        distance = route.legs[0].distance.text;
                        var p =  { du : duration , di :  distance}

                        console.log(json);
                        console.log(p)
                        $("#viaje").append(
                            '<li class="notes"><a class="anotes" href="#">'+
                            '<h2> En la fecha '+json.fecha.substring(0,10)+ ' </h2>'+
                            '<p>  El viaje inicio en ' + json.lugarOrigen + ' donde tuvo un desplazamiento de '+ distance +' hacia el '+
                                'destino ' + json.lugarDestino + ' tardando ' + duration+' y teniendo un costo ' +json.costo +'</p>'+
                            '</a>'+
                            '</li>'
                        );

                        return p;              
                    }});
                }         
                
            }

            
        });

    }
    
    

    return {
        init : function (){
            $("#viajesDisponibles").click (function() {
                location.href = "perdirViajeUser";
             })
            loadViajes();
            
        }
    }

})();