var apiKey = '202a1e578200308633eb3a9efa8a9420';

function getLocalisation(){

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getData);
  }

  else {
    alert("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
  }
}

function getData(position){
  getWeather(position);
  getCity(position);
};

function getWeather(position){
  console.log("http://samples.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid="+apiKey);

  $.getJSON( "http://samples.openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22",
    function( json ) {
    console.log(JSON.stringify(json));
      $('#tmp').html(json['main']['main.temp']+"°F");

     });
}


function getCity(position){

  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude +'&key=AIzaSyC1VDOxeqIGd8yi0YC7ZG6p47s0_CzKkEM',function( city ){
     $('#city').html(city['results']['0']['address_components']['2']['long_name']);
     $('#cityUp').html(city['results']['0']['address_components']['3']['long_name']);
  });
};

function transformToF(tmpInCelsius){
  var tmpInF = ((tmpInCelsius*9)/5)+32;
  return tmpInF;
};

getLocalisation();
