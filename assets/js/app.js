function initMap() {
  var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById("map"),{
    zoom: 18,
		center: laboratoriaLima
  });

  var marcadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map,
    title:"Laboratoria-Lima"
  });

  function buscar() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(exito,error);
    }
  }

  document.getElementById("encuentrame").addEventListener("click",buscar);

	var latitud,longitud;
	var exito = function(posicion) {
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

    // var mapita2 = new google.maps.Map(document.getElementById("map"),{
    //   zoom: 18,
  	// 	center: {lat:latitud, lng:longitud}
    // });
		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map, // se usa mapita2 se crea un nuevo objeto map
      title:"Usted esta aquí",
      draggable:true,
		  });
        miUbicacion.setIcon('assets/images/icono1.png');
		    map.setZoom(18);
		    map.setCenter({lat:latitud, lng:longitud});

        var objConfigDR={
          map:map,
          suppressMarkers:true
        }

        var objConfigDS={
          origin:laboratoriaLima,
          destination:miUbicacion.position,
          travelMode:google.maps.TravelMode.DRIVING //puede ser WALKING, TRANSIT, BICYCLING
        }

        var dser= new google.maps.DirectionsService();//obtener coordenadas
        var dren= new google.maps.DirectionsRenderer(objConfigDR);//traduce las coordenadas en ruta visible

        dser.route(objConfigDS,funcionRutear);

        function funcionRutear(resultados, status){
          if(status=="OK"){
            dren.setDirections(resultados);
          }else{
            alert("error" + status)
          }
        }
	   }

	  var error = function (error) {
		    alert("Tenemos un problema con encontrar tu ubicación");
	   }

}
