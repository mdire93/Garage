var planta;
var filas;
var columnas;
Miplanta={piso:"",misplazas:new Array()};
miCentroComercial = {};
miCentroComercial.indexedDB = window.indexedDB;
miCentroComercial.IDBKeyRange = window.IDBKeyRange;
miCentroComercial.IDBTransaction = window.IDBTransaction;


window.onload=iniciar;

function iniciar(){
 //preguntar dimensión();
 //filas=document.getElementById("fila").value;
 //columnas=document.getElementById("columna").value;
 filas=3;
 columnas=4;
 crearMiCentroComercial();
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
		boton.style.height="50px";
		boton.addEventListener("click",aparco);
		miParrafo.appendChild(boton);


	}

	document.getElementById("contenedor").appendChild(miParrafo);
}
}

function dibujar_tablerologico(logfilas,logcolumnas){
	
	planta=new Array(logfilas);
	for (var icolumnas=0;icolumnas<logfilas;icolumnas++){
		planta[icolumnas]=new Array(logcolumnas);
		
		}
alert (planta.toSource());
    //guardar el objeto en IndexedDB
    
    guardaPlanta("1",planta);

}
function aparco(e){

var nombreboton=e.currentTarget.id;
	var mifila=nombreboton.split(" ")[0];
	var micolumna=nombreboton.split(" ")[1];
    
	if ((planta[mifila][micolumna]==0) || (planta[mifila][micolumna]==undefined)){
		planta[mifila][micolumna]=1;
    }else{
		alert("aparcamiento ocupado");
}
    guardaPlanta("1",planta);

}
function crearMiCentroComercial() {

    var bd_centroComercial = miCentroComercial.indexedDB.open("MiGarajeInmaExplica", 1);

    //Comprobamos si existe para no sobrescribir
    bd_centroComercial.onupgradeneeded = function (e) {
        var conexion = e.currentTarget.result;
        var misplantas = conexion.createObjectStore("misplantas", {keyPath: "id", autoIncrement: true});
        misplantas.createIndex("por_piso", "piso", {unique: true});
        conexion.close();
    };
}
function guardaPlanta(IDBmipiso,IDBmidibujo) {
    Miplanta.piso=IDBmipiso;
    Miplanta.misplazas=IDBmidibujo;
    id=parseInt(IDBmipiso);
    Miplanta.id=id;
    var bd_centroComercial = miCentroComercial.indexedDB.open("MiGarajeInmaExplica", 1);
    bd_centroComercial.onsuccess = function (e) {
        var conexion = bd_centroComercial.result;
        var transaccion = conexion.transaction("misplantas", "readwrite");
        var coches = transaccion.objectStore("misplantas");
        var guardar_coches = coches.put(Miplanta);
        conexion.close();
    };
}


