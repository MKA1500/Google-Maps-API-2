var id, typ, lat1, lng1, tytul, info, data_od, data_do, x, adres, czy_zapisane;

czy_zapisane = false; // żaden marker nie został zapisany
x = false; // zmienna sterująca 'czy już dodałem punkt', 
// by nie dodać dwóch (przed wniesieniem poprawki na mapę trzeba przestawić to na true, klikając w 'cofnij')
typ = 1; // domyślnie, typ markera


function initMap() {
	
// pierwszy widok:

        var krakow = {lat: 50.059334, lng: 19.937849};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
		  scrollwheel: false,
		  draggable: true, 
          center: krakow
        });

// który z 5 typów markera?:
		
$('div.iznak').bind('click', function(){
  $('div.iznak').removeClass('iznak-active');
  $(this).addClass('iznak-active');
  if($(this).hasClass('wyb-remonty')) {
	  typ = "remonty";
  } else if ($(this).hasClass('wyb-inwest')) {
	  typ = "inwestycje";
  } else if ($(this).hasClass('wyb-zzaj')) {
	  typ = "zajęcie pasa drogowego";
  } else if ($(this).hasClass('wyb-zmiana')) {
	  typ = "zmiana organizacji ruchu";
  } else if ($(this).hasClass('wyb-inne')){
	  typ = "inne";
  }
return typ;
});

var getInfo = function() {
tytul = $('#tytul').val(); 
info = $('#info').val();
adres = $('#address').val(); 
// return tytul, info, adres;
}

var getDates = function() {
	data_od = $('#termin_od').val();
	data_do = $('#termin_do').val();
}

getDates(); // trzeba wywołać po każdej zmianie dat w form...
		
// tworzymy punkt	
            var marker;
	
		    var createMarker = function(lat, lng, tytul, info, typ) {
				
			var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + tytul + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + info + '</p>' +
            '</div>'+
            '</div>';
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
			
			var image; 
			switch (typ) {
				case "remonty":			
				     image = 'img/remonty-m.png';
					 break;
				case "inwestycje":			
				     image = 'img/inwestycje-m.png';
					 break;
				case "zajęcie pasa drogowego":
				     image = 'img/zaj-pasa-m.png';
					 break;
				case "zmiana organizacji ruchu":
				     image = 'img/zmiana-org-m.png';
					 break;
				case "inne":
				     image = 'img/inne-m.png';
					 break;						 
			}
			
            marker = new google.maps.Marker({
                  position: {
					 lat: lat,
					 lng: lng
				  },
                  map: map,
                  title: tytul,
                  icon: image				  
                  });
	    
			marker.addListener('click', function() {
                 infowindow.open(map, marker);
                 })					  
				};

	
// przyciski marktype:

$('div.iznak').hover(function() {
  $(this).toggleClass('iznak-on-hover');
});

		
	// szukamy współrzędnych adresu:

      var geocoder = new google.maps.Geocoder();

      function geocodeAddress(geocoder) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
           // var marker = new google.maps.Marker();
			lat1 = results[0].geometry.location.lat();
			lng1 = results[0].geometry.location.lng();
			
          } else {
            alert('Najpierw wprowadź dane');
          }
        });
		return lat1, lng1;
      }		
	  

 var the_markers = [];

 var drukujTab = function(){
	   var wstaw_img;
			for (var a = 0; a < the_markers.length; a++) {               
			switch (the_markers[a].typ) {
				case "remonty":			
				     wstaw_img = 'img/remonty-m.png';
					 break;
				case "inwestycje":			
				     wstaw_img = 'img/inwestycje-m.png';
					 break;
				case "zajęcie pasa drogowego":
				     wstaw_img = 'img/zaj-pasa-m.png';
					 break;
				case "zmiana organizacji ruchu":
				     wstaw_img = 'img/zmiana-org-m.png';
					 break;
				case "inne":
				     wstaw_img = 'img/inne-m.png';
					 break;						 
			}
			
			    		
            $('.table-body').append('<tr class="rekord"><td class="id-tab">' 
			+ the_markers[a].id + '</td><td class="tytul-tab">' 
			+ the_markers[a].tytul + '</td><td class="typ-tab">'
			+ '<img src="' + wstaw_img + '" ><br />'
            + the_markers[a].typ + '</td><td class="adres-tab">'			
			+ the_markers[a].adres + '</td><td class="data-tab">'  
			+ the_markers[a].data_od + '</td><td class="data-tab">' 
			+ the_markers[a].data_do + '</td><td>' 
			+ the_markers[a].info + '</td>'
			+ '<td><div class="guzik-tab usun-z-tab">'
			+ '<img src="img/delete.png" alt="Usuń"></div></td>'
			+ '<td><div class="guzik-tab edyt-z-tab"><img src="img/edit.png" alt="Edytuj"></div>'
			+ '</td></tr>');
		
		}
   }
   
    $.getJSON('js/markers.json', function(ms) {
	for (var i = 0; i < ms.length; i++) {
		the_markers[i] = ms[i];
		
        the_markers.sort(function(a, b){
             return b.id - a.id;	
        });
	}
    drukujTab(); // drukuje tu domyślnie, gdy wchodzimy na stronkę
    });
	

// do przechowania nowego markera:

function new_marker(id, adres, lat1, lng1, typ, data_od, data_do, tytul, info) {
    this.id = id;
    this.adres = adres;
	this.lat1 = lat1;
	this.lng1 = lng1;
	this.typ = typ;
	this.data_od = data_od;
	this.data_do = data_do;
	this.tytul = tytul;
	this.info = info;
} 


		$('#awstaw').bind('click', function() {
			if(!x) {
		 	   geocodeAddress(geocoder); 
		  	   getInfo();
			   
		 	   setTimeout(function() {
	     	   createMarker(lat1, lng1, tytul, info, typ);
		 	   } , 100);
			x = true;			   
			} else {
		 	   marker.setMap(null);
		 	   
			   geocodeAddress(geocoder); 
		  	   getInfo();
			   
		 	   setTimeout(function() {
	     	   createMarker(lat1, lng1, tytul, info, typ);
		 	   } , 100);				
			}	
        });
		
		$('#acofnij').bind('click', function() {
		  marker.setMap(null);
		  x = false;
        });		
		
		$('#anowy').bind('click', function() {
		 // przygotowuje nowy ekran, czyści formulafrz 
		 if ((($('#tytul').val() !== "") || ($('#info').val() !== "") || ($('#address').val() !== "") || ($('#termin_od').val() !== "2016-09-08") || ($('#termin_do').val() !== "2016-09-26")) && (czy_zapisane == false)) {
			var nowy_ekran = confirm('Nie zapisałeś danych. Czy na pewno przejść do nowego punktu?');
			if (nowy_ekran == true) {
				location.reload();
				// marker.setMap(null);
		        // x = false;
				// initMap();
			} 
		 }
        });	
		

var markerek;

var saveMarker = function() {
	getDates(); 
	getInfo();
	id = the_markers.length+1;
	markerek = new new_marker(id, adres, lat1, lng1, typ, data_od, data_do, tytul, info);
}
		
	
		$('#azapisz').bind('click', function() {
		  if(!x) {
				alert('Najpierw wstaw nowy punkt na mapę.');
			} else {
             saveMarker();
         //    alert(markerek.id  + " " + markerek.data_od + " " + markerek.data_do + " " + markerek.adres + " " + markerek.typ + " " + markerek.tytul + " " + markerek.info + " " + markerek.lat1 + " " + markerek.lng1);
		    the_markers.unshift(markerek);
			setTimeout(function() {
			  $('.table-body').empty();
              drukujTab();
			} , 200);
			}		   
        });	

  }
