perfil  = (function(){

    var cargarInformacion = function(){
        var usuario = JSON.parse(Cookies.get("conductor"));
        var correo = usuario.correo;
        console.log(correo)
        $.get("https://backarsw.herokuapp.com/v1/conductores/" + correo, function(data) {
            console.log(data);
            var json = data;
            var cache = $('#telefonoBtn').children();
            $("#telefonoBtn").text(json.celular).append(cache);
            $("#nombre").text(json.nombres);
            var cache = $('#fechaBtn').children();
            $("#fechaBtn").text(json.fechaNacimiento).append(cache);           
            $("#tipoUsuario").text(json.tipoUsuario);
            var cache = $('#correoBtn').children();            
            $("#correoBtn").text(json.correo).append(cache);
            console.log(json.calificacion) 

            const ratings = {
                hotel_a : json.calificacion
              };
              
              var cache = $('#residenciaBtn').children();
              $("#residenciaBtn").text(json.casa).append(cache);           
              



            const starTotal = 5;
 
            for(const rating in ratings) {  
                const starPercentage = (ratings[rating] / starTotal) * 100;
                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
                document.querySelector('.stars-inner').style.width = starPercentageRounded; 
            }
            
            var input = document.getElementById('cambiarResidencia');
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 4.782715, lng: -74.042611 },
                zoom: 18
            });
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
            
        });
    };


    var updateDate = function(){
       
        var datos = {
			"correo" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).correo :  JSON.parse( Cookies.get('conductor')).correo,
			"clave" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).clave :  JSON.parse( Cookies.get('conductor')).clave,
			"nuevaFechaNacimiento" :$("#cambiarFecha").val()
        }
        var role =  Cookies.get('conductor') ? 'v1/conductores' : 'v1/pasajeros'
        var JSON1 = JSON.stringify(datos);
        console.log(JSON1);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/"+role+"/update/fechaNacimiento",
            data: JSON1,       
        });
    };

    
    var updateNumber = function(){
        var newNumber = $("#cambiarTelefono").val()
        if(isNaN(newNumber)){
            Swal.fire({
                position: 'top-end',
                type: 'error',
                title: 'No es un número lo que acabo de digitar',
                showConfirmButton: false,
                width: 500, 
                timer: 1000
              })

        }else{
            var datos = {
                "correo" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).correo :  JSON.parse( Cookies.get('conductor')).correo,
                "clave" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).clave :  JSON.parse( Cookies.get('conductor')).clave,
                "nuevoCelular" :$("#cambiarTelefono").val()
            }
            var role =  Cookies.get('conductor') ? 'v1/conductores' : 'v1/pasajeros'
            var JSON1 = JSON.stringify(datos);
            console.log(JSON1);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "https://backarsw.herokuapp.com/"+role+"/update/celular",
                data: JSON1,
              
            });
        }
    };

    var updateHome = function(){
        var datos = {
            "correo" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).correo :  JSON.parse( Cookies.get('conductor')).correo,
            "clave" : Cookies.get('pasajero') ?  JSON.parse(Cookies.get('pasajero')).clave :  JSON.parse( Cookies.get('conductor')).clave,
            "nuevaCasa" :$("#cambiarResidencia").val()
        }
        var JSON1 = JSON.stringify(datos);
        console.log(JSON1);
        var role =  Cookies.get('conductor') ? 'v1/conductores' : 'v1/pasajeros'
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/"+role+"/update/casa",
            data: JSON1,
            
        });
    };


    return {
        init : function(){ 
            cargarInformacion();
            $("#telefonoBtn").on('click',function(){
                $("#telefono").modal('show');
            });
            $("#fechaBtn").on('click',function(){
                $("#nacimiento").modal('show'); 
            });
           
            $("#residenciaBtn").on('click',function(){
                $("#residencia").modal('show');
            });

            $("#telefonoGuardar").on('click',function(){
                updateNumber();
            })
            
            $("#residenciaGuardar").on('click',function(){
                updateHome();
            })

           $("#nacimientoGuardar").on('click',function(){
            updateDate();
           })


        }
    }
})();