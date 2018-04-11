var apiKey = '7528a9b5ce72454ebb0111506180904';
var typeOfTmp = 'C';
var myPosition ='';
var lang = 'fr';
var weatherData ='';


function getLocalisation(){

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getData);
  }

  else {
    alert("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
  }
}

function changeTypeOfTemp(position,tmpUnity){
  if (tmpUnity == 'C'){
    typeOfTmp = 'F';
    $('#tmp').html(weatherData['current']['temp_f']+"°F");
  }
  else if (tmpUnity == 'F'){
    typeOfTmp = 'C';
  $('#tmp').html(weatherData['current']['temp_c']+"°C");
  }
}

function getData(position){
  getWeather(position,typeOfTmp);
  myPosition = position;
};

function getWeather(position,tmpUnity){
  $.getJSON( "http://api.apixu.com/v1/current.json?key="+apiKey+"&q="+position.coords.latitude+","+position.coords.longitude+'&lang='+lang,
    function( json ) {
      weatherData = json;
      if (tmpUnity === 'C'){
        $('#tmp').html(json['current']['temp_c']+"°C");
      } else if (tmpUnity === 'F'){
        $('#tmp').html(json['current']['temp_f']+"°F");
      }
      $('#condition').html(json['current']['condition']['text']);
      $('#illustration').attr('src',"http:"+json['current']['condition']['icon']);
      $('#whereCity').html(json['location']['name']);
      $('#whereCountry').html(json['location']['country']);
      $('#when').html(formatTheDate(json['location']['localtime']))
    });
}

function formatTheDate(theDate){
  var dateArray = theDate.split(' ');
  var oldDate = dateArray[0].split('-');
  var newDate = oldDate[2]+'/'+oldDate[1]+'/'+oldDate[0];
  return newDate;

}

$('#tmp').click(function(){
  changeTypeOfTemp(myPosition,typeOfTmp);
});

$('#refresh').click(function(){
  getLocalisation();
});

$(document).ready(function(){
  getLocalisation();
})
