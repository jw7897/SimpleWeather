//Variables needed
let info;
let kTemp;
let fTemp;
let cTemp;
let lat;
let long;

const successCallback = (position) => {
  //Saves the latitude and longitude
  lat = position.coords.latitude;
  long = position.coords.longitude;

  //Declares variables for weather API
  const apiKey = "8f05d1a283612eb01ca8554f843272b5";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //Saves temperature and description and outputs
      info = res.list[0].weather[0].description;
      kTemp = res.list[0].main.temp;
      cTemp = kTemp - 273.15;
      fTemp = (cTemp * 1.8) + 32;

      let splitStr = info.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      info = splitStr.join(' ');


      document.getElementById("info").innerHTML = info;
      document.getElementById("temp").innerHTML = Math.floor(fTemp) + "&#176;F";

      document.getElementById("celcius").onclick = toC;
      document.getElementById("fahrenheit").onclick = toF;
      document.getElementById("kelvin").onclick = toK;


      //Sets icon
      if (info == "Scattered Clouds" || info == "Few Clouds" || info == "Broken Clouds"|| info == "Overcast Clouds") {
        document.getElementById("icon").innerHTML = "<img src='icons/cloudy.png' alt='clouds'>"
        document.getElementById("background").classList.add("clear")
      } else if (info == "Clear Sky") {
        document.getElementById("icon").innerHTML = "<img src='icons/sunny.png' alt='sun'>"
        document.getElementById("background").classList.add("clear")
      } else if (info == "Shower rain" || info == "Rain" || info == "Light Rain") {
        document.getElementById("icon").innerHTML = "<img src='icons/rain.png' alt='rain'>"
        document.getElementById("background").classList.add("notClear")
      } else if (info == "Thunderstorm") {
        document.getElementById("icon").innerHTML = "<img src='icons/lightning.png' alt='lightning'>"
        document.getElementById("background").classList.add("notClear")
      } else if (info == "Snow") {
        document.getElementById("icon").innerHTML = "<img src='icons/snow.png' alt='snow'>"
        document.getElementById("background").classList.add("notClear")
      } else if (info == "Mist") {
        document.getElementById("icon").innerHTML = "<img src='icons/mist.png' alt='mist'>"
        document.getElementById("background").classList.add("notClear")
      }


    })
    .catch((err) => {
      console.log(err);
    })
}

//Logs error if application can not get location
const errorCallback = (err) => {
  console.log(err);
}

//Boiler plate
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


function toC() {
  document.getElementById("temp").innerHTML = Math.floor(cTemp) + "&#176;C";
}

function toF() {
  document.getElementById("temp").innerHTML = Math.floor(fTemp) + "&#176;F";
}

function toK() {
  document.getElementById("temp").innerHTML = Math.floor(kTemp) + "K";
}
