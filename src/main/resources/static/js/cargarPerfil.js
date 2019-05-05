perfil  = (function(){

    var cargarInformacion = function(){
        var usuario = JSON.parse(Cookies.get("usuario"));
        var correo = usuario.correo;
        console.log(correo)
        $.get("https://backarsw.herokuapp.com/v1/conductores/" + correo, function(data) {
            console.log(data);
            var json = data;
            var cache = $('#tel').children();
            $("#tel").text(json.celular).append(cache);
            $("#nombre").text(json.nombres)
            var cache = $('#correo').children();
            
            $("#correo").text(json.correo).append(cache);
            //$('.stars-inner').circleType({radius: 800});

            const ratings = {
                hotel_a : json.calificacion
              };

            const starTotal = 5;
 
            for(const rating in ratings) {  
                const starPercentage = (ratings[rating] / starTotal) * 100;
                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
                document.querySelector('.stars-inner').style.width = starPercentageRounded; 
            }
        });
    };

    return {
        init : function(){ 
            cargarInformacion();
        }
    }
})();