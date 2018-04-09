var apiKey = '7528a9b5ce72454ebb0111506180904';
var typeOfTmp = 'C';
var myPosition ='';


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
    getWeather(position,typeOfTmp);
  }
  else if (tmpUnity == 'F'){
    typeOfTmp = 'C';
    getWeather(position,typeOfTmp);
  }
}

function getData(position){
  getWeather(position,typeOfTmp);
  myPosition = position;
};

function getWeather(position,tmpUnity){
  $.getJSON( "http://api.apixu.com/v1/current.json?key="+apiKey+"&q="+position.coords.latitude+","+position.coords.longitude,
    function( json ) {
      if (tmpUnity === 'C'){
        $('#tmp').html(json['current']['temp_c']+"°C");
      } else if (tmpUnity === 'F'){
        $('#tmp').html(json['current']['temp_f']+"°F");
      }
      $('#condition').html(json['current']['condition']['text']);
      $('#illustration').attr('src',"http:"+json['current']['condition']['icon']);
      $('#where').html(json['location']['name']+' - '+json['location']['country']);
      $('#when').html(json['location']['localtime'])
    });
}

getLocalisation();

$('#tmp').click(function(){
  changeTypeOfTemp(myPosition,typeOfTmp);
});
