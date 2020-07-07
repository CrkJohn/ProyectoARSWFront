private boolean anyFunction(){
	// más código
	// verifica el si el archivo pertenece a red de pago
	if ((fileName != null) && fileName.matches(abstractEmailConfiguration.getPattern()) 
			      && (Part.ATTACHMENT.equalsIgnoreCase(attachment.getDisposition()) ||  
				StringUtils.isNotBlank(attachment.getFileName()))){
	 // descarga

	}
}
