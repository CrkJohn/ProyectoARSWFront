perfil  = (function(){

    var tipoUsuario;

    var onSuccessUpdate = function(data){
        if(tipoUsuario=="conductor"){
            window.location.href = "perfilConductor";
        }else{
            window.location.href = "perfilPasajero";
        }
    }

    var onErrorUpdate = function (data){
        Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Su informacion no fue actualizada, intentelo de nuevo',
            showConfirmButton: false,
            width: 500, 
            timer: 2000
        })
    }

    var cargarInformacion = function(){

        console.log("ACTUALIZANDO")

        var usuario;
        var URL;
        if(Cookies.get("conductor")){
            usuario = JSON.parse(Cookies.get("conductor"));
            tipoUsuario = "conductor";
            URL = "https://backarsw.herokuapp.com/v1/conductores/";
        }else{
            usuario = JSON.parse(Cookies.get("pasajero"));
            tipoUsuario = "pasajero";
            URL = "https://backarsw.herokuapp.com/v1/pasajeros/";
        }
        console.log("EL TIPO DE USUARIO -> "+tipoUsuario);
        var correo = usuario.correo;
        $.get(URL+ correo, function(data) {
            var json = data;
            var cache = $('#telefonoBtn').children();
            $("#telefonoBtn").text(json.celular).append(cache);
            $("#nombre").text(json.nombres);
            var cache = $('#fechaBtn').children();
            $("#fechaBtn").text(json.fechaNacimiento).append(cache);           
            $("#tipoUsuario").text(json.tipoUsuario);
            var cache = $('#correoBtn').children();            
            $("#correoBtn").text(json.correo).append(cache);

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
        var json="",rol="";
        if(tipoUsuario=="conductor"){
            json = JSON.parse(Cookies.get('conductor'));
            rol="v1/conductores";
        }else{
            json = JSON.parse(Cookies.get('pasajero'));
            rol="v1/pasajeros";
        }
        var correo = json.correo, clave = json.clave;
        var datos = {
			"correo" : correo,
			"clave" : clave,
			"nuevaFechaNacimiento" :$("#cambiarFecha").val()
        }        
        var JSON1 = JSON.stringify(datos);
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/"+rol+"/"+correo+"/update/fechaNacimiento",
            data: JSON1,
            success: onSuccessUpdate,
            error: onErrorUpdate
        });
    };

    
    var updateNumber = function(){
        var newNumber = $("#cambiarTelefono").val();
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
            var json="",rol="";
            if(tipoUsuario=="conductor"){
                json = JSON.parse(Cookies.get('conductor'));
                rol="v1/conductores";
            }else{
                json = JSON.parse(Cookies.get('pasajero'));
                rol="v1/pasajeros";
            }
            var correo = json.correo, clave = json.clave;
            var datos = {
                "correo" : correo,
                "clave" : clave,
                "nuevoCelular" :$("#cambiarTelefono").val()
            }
            var JSON1 = JSON.stringify(datos);
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "https://backarsw.herokuapp.com/"+rol+"/"+correo+"/update/celular",
                data: JSON1,
                success: onSuccessUpdate,
                error: onErrorUpdate
            });
        }
    };

    var updateHome = function(){
        var json="",rol="";
        if(tipoUsuario=="conductor"){
            json = JSON.parse(Cookies.get('conductor'));
            rol="v1/conductores";
        }else{
            json = JSON.parse(Cookies.get('pasajero'));
            rol="v1/pasajeros";
        }
        var correo = json.correo, clave = json.clave;
        var datos = {
            "correo" : correo,
            "clave" : clave,
            "nuevaCasa" :$("#cambiarResidencia").val()
        }
        var JSON1 = JSON.stringify(datos);
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/"+rol+"/"+correo+"/update/casa",
            data: JSON1,
            success: onSuccessUpdate,
            error: onErrorUpdate            
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