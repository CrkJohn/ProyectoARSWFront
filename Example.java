private boolean anyFunction(){
	// más código
	if (isAttachment(attachment)) {
	//descarga el archivo
	}
}

private boolean isAttachment(MimeBodyPart attachment){
	String fileName = attachment.getFileName();
	boolean hasAttachment = (fileName != null) && fileName.matches(abstractEmailConfiguration.getPattern());
	hasAttachment &= (Part.ATTACHMENT.equalsIgnoreCase(attachment.getDisposition()) ||
						StringUtils.isNotBlank(attachment.getFileName()));
	return hasAttachment;
}
