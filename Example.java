try{
  String propertiesPath = propertiesLocation + "/" + PROPERTIES_FILE
  FileInputStream propertiesStream = new FileInputStream(propertiesPath)
  // más codigo
}catch(IOException e){
  // Si no hay archivos de propiedades significan que cargan las predeterminadas 
  
}
