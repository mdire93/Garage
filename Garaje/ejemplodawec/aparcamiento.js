//SISTEMA DE APARCAMIENTO
var plantas;
var filas;
var columnas;
var plantaglob;
miplanta = {dibujo: new Array()};

miCentroComercial = {};
miCentroComercial.indexedDB = window.indexedDB;
miCentroComercial.IDBKeyRange = window.IDBKeyRange;
miCentroComercial.IDBTransaction = window.IDBTransaction;

$(document).ready(function () {
    crearMiCentroComercial();
    $("#crear").click(function () {
        plantas = $("#plantas").val();
        filas = $("#filas").val();
        columnas = $("#columnas").val();
        var i = 0;

        $(".botonesplantas").html('');
        $(".tabla").html('');
        while (i < (parseInt(plantas))) {

            pintarPlantas(i);
            dibujar_tablerologico(filas, columnas, i);
            var boton = document.createElement('button');
            boton.setAttribute('name', 'planta' + i);
            boton.setAttribute('onclick', 'mostrarPlanta(' + i + ')');
            var plantaboton = document.createTextNode('Planta' + i);
            boton.appendChild(plantaboton);
            $(".botonesplantas").append(boton);
            i++;
        }
        i = 0;
    });

});


function pintarPlantas(p) {

    var i = 0;
    var fila;
    var columna;
    var planta;

    planta = document.createElement('div');
    planta.setAttribute('class', 'planta' + p);
    planta.setAttribute('style', 'display:none')
    var titulo = document.createElement("h1");
    var textotitulo = document.createTextNode("Planta " + p);
    titulo.appendChild(textotitulo);
    planta.appendChild(titulo);
    filas = parseInt(filas);
    columnas = parseInt(columnas);
    while (i < (filas)) {
        fila = document.createElement('div');
        fila.setAttribute('class', 'fila');
        planta.appendChild(fila);
        var j = 0;
        while (j < (columnas)) {
            columna = document.createElement('div');
            columna.setAttribute('class', 'columna');
            columna.setAttribute('id', j + ' ' + i);
            columna.setAttribute('onclick', 'aparco(this.id)');
            planta.appendChild(columna);
            j++;
        }

        i++;
    }

    $(".tabla").append(planta);

}
function dibujar_tablerologico(filas, columnas, p) {
    plantaglob = new Array(parseInt(filas));
    planta = parseInt(p);
    for (var icol = 0; icol < filas; icol++) {
        plantaglob[icol] = new Array(parseInt(columnas)).fill(0);

    }

    miplanta.dibujo = plantaglob;
    anadirPlanta(miplanta);
    alert(miplanta.toSource());
}

function mostrarPlanta(p) {
    i = 0;
    while (i < plantas) {
        $(".planta" + i).hide();
        i++;
    }
    $(".planta" + p).show();
}

function aparco(id) {

    var mifila = id.split(" ")[0];
    var micolumna = id.split(" ")[1];
    if (plantaglob[micolumna][mifila] == 0) {
        plantaglob[micolumna][mifila] = 1;
    } else {
        alert('no se puede aparcar - ocupado');
    }

}


function crearMiCentroComercial() {

    var bd_centroComercial = miCentroComercial.indexedDB.open("MiGaraje", 1);

    //Comprobamos si existe para no sobrescribir
    bd_centroComercial.onupgradeneeded = function (e) {
        var conexion = e.currentTarget.result;
        var misplazas = conexion.createObjectStore("misplazas", {keyPath: "id", autoIncrement: true});
        misplazas.createIndex("por_piso", "piso", {unique: true});
        conexion.close();
    };
}
function anadirPlanta(miplan) {

    var bd_centroComercial = miCentroComercial.indexedDB.open("MiGaraje", 7);
    bd_centroComercial.onsuccess = function (e) {
        var conexion = bd_centroComercial.result;
        var transaccion = conexion.transaction("misplazas", "readwrite");
        var coches = transaccion.objectStore("misplazas");
        var guardar_coches = coches.put(miplan);
        conexion.close();
    };
}




