package com.example.controller;

import org.json.JSONObject;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class SessionController{

    @GetMapping("/hola")
    public ResponseEntity<?> hola(){
		try {
	        return new ResponseEntity<>("HOLA",  org.springframework.http.HttpStatus.OK); 
	    } catch (Exception ex) {
	        return new ResponseEntity<>("ERROR", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

    @PostMapping(value = "/pasajero/login")
    public ResponseEntity<?> postloginPasajero(HttpServletRequest req, HttpSession session){
		try {
            String correo = req.getParameter("correo");
            int response = POSTRequest(correo, req.getParameter("clave"), "pasajeros");
            if(response==200){
                session.setAttribute("correo", correo);
                session.setAttribute("rol", "pasajero");
                //System.out.println("OBTUVO LA SESION DEL PASAJERO CORRECTAMENTE");
                return new ResponseEntity<>("OK",  org.springframework.http.HttpStatus.OK); 
            }
	        return new ResponseEntity<>("CREDENCIALES ERRONAS",  org.springframework.http.HttpStatus.NOT_FOUND);
	    } catch (Exception ex) {
	        return new ResponseEntity<>("ERROR", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
	    }
    }
    
    @PostMapping(value = "/conductor/login")
    public ResponseEntity<?> postloginConductor(HttpServletRequest req, HttpSession session){
		try {
            String correo = req.getParameter("correo");
            int response = POSTRequest(correo, req.getParameter("clave"), "conductores");
            if(response==200){
                session.setAttribute("correo", correo);
                session.setAttribute("rol", "conductor");
                //System.out.println("OBTUVO LA SESION DEL CONDUCTOR CORRECTAMENTE");
                return new ResponseEntity<>("OK",  org.springframework.http.HttpStatus.OK); 
            }
	        return new ResponseEntity<>("CREDENCIALES ERRONAS",  org.springframework.http.HttpStatus.NOT_FOUND);
	    } catch (Exception ex) {
	        return new ResponseEntity<>("ERROR", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
	    }
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<?> postlogout(HttpServletRequest request){
		try {
            //System.out.println("SALIENDO SESION");
            request.getSession().removeAttribute("correo");
            request.getSession().removeAttribute("rol");
            request.getSession().invalidate();
            return new ResponseEntity<>("OK",  org.springframework.http.HttpStatus.OK); 
	    } catch (Exception ex) {
	        return new ResponseEntity<>("ERROR", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
	    }
    }

    /**
     * Realiza una peticion https a un servidor, revisa si las credenciales son correctas
     * @param correo
     * @param clave
     * @param extension
     * @return
     * @throws IOException
     */
    private static int POSTRequest(String correo, String clave, String extension) throws IOException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("correo", correo);
        jsonObject.put("clave", clave);
        //String strJson = "'"+jsonObject.toString()+"'";
        final String POST_PARAMS = jsonObject.toString();
        //System.out.println(POST_PARAMS);

        URL obj = new URL("https://backarsw.herokuapp.com/v1/"+extension+"/login");
        HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
        postConnection.setRequestMethod("POST");
        //postConnection.setRequestProperty(correo, clave);
        postConnection.setRequestProperty("Content-Type", "application/json");
        postConnection.setDoOutput(true);

        OutputStream os = postConnection.getOutputStream();

        os.write(POST_PARAMS.getBytes());
        os.flush(); os.close(); 
        int responseCode = postConnection.getResponseCode();
        //System.out.println("POST Response Code : " + responseCode);
        //System.out.println("POST Response Message : " + postConnection.getResponseMessage());

        if (responseCode == HttpURLConnection.HTTP_OK) { //success
            BufferedReader in = new BufferedReader(new InputStreamReader( postConnection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in .readLine()) != null){
                response.append(inputLine);
            }
            in .close(); // print result
            //System.out.println(response.toString());
        } else {
            //System.out.println("POST NOT WORKED");
        }
        return responseCode;
    }
    
}

