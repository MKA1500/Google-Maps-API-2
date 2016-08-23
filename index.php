<?php 
if(!empty($_GET['location'])){
	$maps_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='. urlencode($_GET['location']);
	
	$maps_json = file_get_contents($maps_url);
	$maps_array = json_decode($maps_json, true);
	
	$lat = $maps_array['results'][0]['geometry']['location']['lat'];
	
	$lng = $maps_array['results'][0]['geometry']['location']['lng'];
}
if(!empty($_GET['tytul']) && !empty($_GET['opis'])){	
	$tytul = $_GET['tytul'];

    $opis = $_GET['opis'];	
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Wybierz lokalizację</title>
	   <!--[if IE]>
         <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
       <![endif]-->
	<link href='https://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
	<link href="css/style.css" rel="stylesheet">
</head>
<body>
   <div id="head">
   <h1>Choose location:</h1>
   
   <form action="">
      <span>Lokalizacja: </span><input type="text" name="location" id="location"/>
	  <span>Typ: </span><select name="typ" id="typ"  >
 	         <option value="inwest">Inwestycje</option>
 	         <option value="zajecie">Zajęcie pasa drogowego</option>
 	         <option value="remonty">Remonty</option>
 	         <option value="zm_org">Zmiana organizacji ruchu</option>
			 <option value="inne">Inne</option>
	  </select>
	  <span>Tytuł: </span><input type="text" name="tytul" id="tytul" />
	  <span>Opis: </span><textarea name="opis" id="opis"></textarea>
	  
      <button type="submit" id="submit">Submit</button>
	  
	  <?php 	
if(!empty($_GET['location'])){	  
	  echo "<br>". $lat . "<br>". $lng . "<br>";
}

if(!empty($_GET['tytul'])){	 
	  echo $tytul . "<br>";
}

if(!empty($_GET['opis'])){	 
	  echo $opis;
}
	  ?>
   </form>
   </div>
   
   <div id="wrapper">
      <div id="map"></div>
   </div>
   

   
<script type="text/javascript" async defer src="http://maps.google.com/maps/api/js?key=AIzaSyBPyfVuKK_LM7mL56q_u4j0mZgL1z_qHTc& language=pl&callback=initMap"></script>
<script type="text/javascript" src="js/script.js"></script>
<?php
if(!empty($_GET['location'])){	

echo '<script type="text/javascript">';
echo 'createMarker('. $lat .', '. $lng .', "asjkde jweji", "j jsdfj DIBDF FBVUI");';
echo '</script>';

}
?>
<!-- OSTATNI KOD NIE DZIAŁA! SPRAWDZIĆ INNE OPCJE:

http://stackoverflow.com/questions/23740548/how-to-pass-variables-and-data-from-php-to-javascript
http://stackoverflow.com/questions/3613186/what-is-the-safest-way-of-passing-arguments-from-server-side-php-to-client-side
-->
</body>
</html>
