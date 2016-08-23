function initMap() {
        var krakow = {lat: 50.0646501, lng: 19.9449799};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
		  scrollWheel: false,
		  draggable: false, 
          center: krakow
        });

		
		    var createMarker = function(lat, lng, tytul, info) {
				
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
            var marker = new google.maps.Marker({
                  position: {
					 lat: lat,
					 lng: lng
				  },
                  map: map,
                  title: tytul				  
                  });
		    
			marker.addListener('click', function() {
                 infowindow.open(map, marker);
                 })					  
				};
		
		createMarker(50.0704991, 19.9847847, 'Arena', 'Jakiś tekst Jakiś Jakiś tekst tekst Jakiś tekst');
		createMarker(50.0698411, 19.9358211, 'Krowoderska', 'de werv Jakiś tekst Jakiś tekst wd wer fqef qer Jakiś tekst Jakiś tekst');
		
		

      }
