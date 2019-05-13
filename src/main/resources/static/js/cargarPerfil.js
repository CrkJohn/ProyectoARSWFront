perfil  = (function(){

    var cargarInformacion = function(){
        var usuario = JSON.parse(Cookies.get("conductor"));
        var correo = usuario.correo;
        console.log(correo)
        $.get("https://backarsw.herokuapp.com/v1/conductores/" + correo, function(data) {
            console.log(data);
            var json = data;
            var cache = $('#tel').children();
            $("#tel").text(json.celular).append(cache);
            $("#nombre").text(json.nombres);

            $("#tipoUsuario").text(json.tipoUsuario);
            
            var cache = $('#correo').children();
            
            $("#correo").text(json.correo).append(cache);
            //$('.stars-inner').circleType({radius: 800});

            const ratings = {
                hotel_a : 3.5
              };

            const starTotal = 5;
 
            for(const rating in ratings) {  
                const starPercentage = (ratings[rating] / starTotal) * 100;
                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
                document.querySelector('.stars-inner').style.width = starPercentageRounded; 
            }
        });
    };


    var updateDate = function(){
       
        var datos = {

        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/v1/conductores/login",
            data: datos,
            success: succ,
            error: err
        });
    };

    var updateEmail = function(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/v1/conductores/login",
            data: datos,
            success: succ,
            error: err
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
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "https://backarsw.herokuapp.com/v1/conductores/login",
                data: datos,
                success: succ,
                error: err
            });
        }
    };

    var updateHome = function(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://backarsw.herokuapp.com/v1/conductores/login",
            data: datos,
            success: succ,
            error: err
        });
    };


    return {
        init : function(){ 
            //cargarInformacion();
            $("#telefonoBtn").on('click',function(){
                $("#telefono").modal('show');
            });
            $("#fechaBtn").on('click',function(){
                $("#nacimiento").modal('show'); 
            });
            $("#correoBtn").on('click',function(){
                $("#correo").modal('show');
            });
            $("#residenciaBtn").on('click',function(){
                $("#residencia").modal('show');
            });

            $("#telefonoGuardar").on('click',function(){
                updateNumber();
            })
			



        }
    }
})();