# ESCENARIOS DE CALIDAD

### Escenario 1:
- Fuente: Cliente
- Estimulo: Entrar a la página principal de la aplicación por primera vez
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La página cargó en menos de 3 segundos 
- Artefacto: Módulo index.html
- Respuesta: La aplicación carga la página index

### Escenario 1.1:
- Fuente: Cliente
- Estimulo: Entrar a la página principal de la aplicación por primera vez
- Entorno: Condiciones malas de internet, menos de 3 MBPS
- Métrica: La página cargó en menos de 20 segundos 
- Artefacto: Módulo index.html
- Respuesta: La aplicación carga la página index

### Escenario 2:
- Fuente: Pasajero
- Estimulo: Click en el botón pasajero en la página principal de la aplicación
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La página cargó en menos de 3 segundos
- Artefacto: Modulo login pasajero
- Respuesta: La aplicación carga la página para el login del pasajero 

### Escenario 2.1:
- Fuente: Pasajero
- Estimulo: Click en el botón pasajero en la página principal de la aplicación
- Entorno: Condiciones malas de internet
- Métrica: La página cargó en menos de 20 segundos
- Artefacto: Modulo login pasajero
- Respuesta: La aplicación carga la página para el login del pasajero 

### Escenario 3:
- Fuente: Conductor
- Estimulo: Click en el botón conductor en la página principal de la aplicación
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La página cargó en menos de 3 segundos
- Artefacto: Módulo login conductor. 
- Respuesta: La aplicación redirige al usuario al login del conductor.

### Escenario 3.1:
- Fuente: Conductor
- Estimulo: Click en el botón conductor en la página principal de la aplicación
- Entorno: Condiciones malas de internet
- Métrica: La página cargó en menos de 20 segundos
- Artefacto: Módulo login conductor. 
- Respuesta: La aplicación redirige al usuario al login del conductor.

### Escenario 4:
- Fuente: Cliente
- Estimulo: Click en el botón de iniciar sesión
- Entorno: Condiciones óptima de internet, aproximadamente 15 MBPS
- Métrica: La página cargó en menos de 3 segundos
- Artefacto: Módulo login
- Respuesta: La aplicación redirige al usuario a la página de inicio según el rol en el cual se logue (ya sea como pasajero o como conductor).

### Escenario 4.1:
- Fuente: Cliente
- Estimulo: Click en el botón de iniciar sesión para cualquier login
- Entorno: Condiciones malas de internet
- Métrica: La página cargó en menos de 5 segundos
- Artefacto: Módulo login
- Respuesta: La aplicación redirige al usuario a la página de inicio según el rol en el cual se logue (ya sea como pasajero o como conductor)

### Escenario 5:
- Fuente: Cliente
- Estimulo: Click en el enlace registrarse en la página de login
- Entorno:  Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: Se realizaron todos los registros en menos de 3 segundos
- Artefacto: Módulo de registrar
- Respuesta: La aplicación notifica al usuario que su registro ha sido satisfactorio, y además lo redirige al login correspondiente (si se registró como pasajero lo redirige al login pasajero, y si se registró como conductor lo redirige al login del conductor). Pero si el usuario no se registró adecuadamente lo redirige a la página del registro. Además de esto, tenemos algunas validaciones, por ejemplo, si se deja algún input en blanco la aplicación me notificará que ese campo no puede estar vacío.

### Escenario 6:
- Fuente: Pasajero
- Estimulo: Click en el botón de pedir en pedirViajeUser.html
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: Se realiza la petición del viaje en menos de 3 segundos
- Artefacto: Módulo de pedir viaje
- Respuesta: La aplicación notifica al pasajero que su viaje fue pedido satisfactoriamente y además traza la ruta del viaje.

### Escenario 6.1:
- Fuente: Conductor
- Estimulo: Un pasajero pide un viaje
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La información de un nuevo viaje llega en menos de 3 segundos
- Artefacto: Módulo de pedir viaje
- Respuesta: La aplicación le muestra al conductor la información del viaje solicitado por un pasajero, incluyendo correo del pasajero, dirección de origen, dirección de destino y costo.

### Escenario 7:
- Fuente: Conductor
- Estimulo: Click en alguna de las opciones desplegadas al darle click en el botón ofertar
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La oferta se manda en menos de 3 segundos
- Artefacto: Módulo de contraoferta
- Respuesta: La aplicación le notifica al conductor que su oferta fue enviada satisfactoriamente, y sólo queda esperar que el usuario acepte, rechace, o cancele el viaje.

### Escenario 7.1:
- Fuente: Pasajero
- Estimulo: Un conductor realiza una contraoferta por un viaje que fue pedido
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La oferta se recibe en menos de 3 segundos
- Artefacto: Módulo de contraoferta
- Respuesta: La aplicación le muestra al pasajero la información de la oferta realizada por el conductor, esta información abarca el correo del conductor y el precio ofertado. El pasajero queda con la opción de aceptar la oferta o rechazarla.

### Escenario 8:
- Fuente: Cliente
- Estimulo: Ver los viajes realizados
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: La página carga en aproximadamente menos de 3 segundos
- Artefacto: Módulo de viajes realizados
- Respuesta: El cliente podrá visualizar los viajes que ha realizado usando EVERN 

### Escenario 9:
- Fuente: Pasajero
- Estimulo: Click en el botón aceptar, cuando un conductor realiza una oferta
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: Se notifica el cambio de estado del viaje en menos de 3 segundos
- Artefacto: Módulo de aceptar oferta
- Respuesta: La aplicación redirige al pasajero a una página en donde se encuentre sólo con el conductor, en esta página se traza la ruta del viaje y además hay un chat para que se puedan ir comunicando antes de encontrarse.

### Escenario 9.1:
- Fuente: Conductor
- Estimulo: El pasajero aceptó la oferta que le propuse para el viaje que pidió
- Entorno: Condiciones óptimas de internet, aproximadamente 15 MBPS
- Métrica: Se notifica que la oferta fue aceptada en menos de 3 segundos
- Artefacto: Módulo de aceptar oferta
- Respuesta: La aplicación redirige al conductor a una página en donde se encuentre sólo con el pasajero, en esta página se traza la ruta del viaje y además hay un chat para que se puedan ir comunicando antes de encontrarse.

##  Disponibilidad:

### Escenario 10
- Fuente: Usuarios que acceden al portal web
- Estimulo: Ingresar a los recursos del portal web
- Entorno: Exploración del portal web
- Métrica: Tratar de denegar el servicio del sistema en el menor tiempo posible
- Respuesta: Visualización, interacción con el portal o denegación del servicio.

## Adaptabilidad
###  Escenario 11 
- Fuente: Agregación o actualización de un algoritmo
- Estimulo: Cambio de versión del algoritmo
- Entorno: Explotación
- Métrica: El funcionamiento de la aplicación debe ser igual al anterior sin modificaciones adicionales.
- Artefacto: El sistema
- Respuesta: Mantener el funcionamiento de la aplicación al realizar modificaciones en el código

## Seguridad 

### Escenario 12 

- Fuente: Cliente
- Estimulo: Entrar a la sesión de otro usuario
- Entorno: Aplicación web EVERN
- Métrica: El usuario no puede entrar a las url pertenecientes al rol conductor y viceversa, además de esto es totalmente necesario autenticarse para poder navegar sobre la aplicación.
- Artefacto: URL
- Respuesta: No autorizado 401

### Escenario 13

- Fuente: Persona
- Estimulo: Pedir un viaje
- Entorno: Aplicación web EVERN
- Métrica: La persona que no está logeada no puede pedir un viaje, ni aceptar viajes, no puede consumir los servicios que ofrece EVERN DRIVER
- Artefacto: login.html
- Respuesta: No autorizado 401
