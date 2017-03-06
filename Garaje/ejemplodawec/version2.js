var planta;
var filas;
var columnas;

window.onload=iniciar;

function iniciar(){
 //preguntar dimensión();
 filas=document.getElementById("fila").value;
 columnas=document.getElementById("columna").value;
 dibujar_tablerohtml(filas, columnas);
 dibujar_tablerologico(filas, columnas);
 


}

function dibujar_tablerohtml(html_filas,html_columnas){

  for (var ifilas=0;ifilas<html_filas;ifilas++){

	var miParrafo=document.createElement("p");
	for (var icolumnas=0;icolumnas<html_columnas;icolumnas++){
		var boton=document.createElement("button");
		boton.name="t_boton";
		boton.id=ifilas+" "+icolumnas;
		boton.style.width="50px";
		boton.style.heigth="50px";
		boton.addEventListener("click",aparco);
		miParrafo.appendChild(boton);


	}

	document.getElementById("tabla").appendChild(miParrafo);
}

function dibujar_tablerologico(logfilas,logcolumnas){
	
	planta=new Array(lfilas);
	for (var icolumnas=0;icolumnas<logfilas;lcolumnas++){
		planta[icolumna]=new Array(logcolumnas);
		
		}
alert (planta.toSource());

}
function aparco(e){

var nombreboton=e.currentTarget.id;
	var mifila=nombreboton.split(" ")[0];
	var micoluma=nombreboton.split(" ")[1];
	if (planta[mifila][micolumna]==0){
		planta[mifila][micolumna]=1;
	else{
		alert("aparcamiento ocupado");
}

}

}