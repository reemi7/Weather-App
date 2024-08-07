const apikey = "2780adc2d0a398366a8ad3a9ee8e6727";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await axios.get(`${apiurl}${city}&appid=${apikey}`);
    const data = response.data;

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clear") {
      weathericon.src = "images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      weathericon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weathericon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".weather").style.display = "block";
    weathericon.src = "images/404.png";
    document.querySelector(".info").style.display = "none"
    document.querySelector(".temp").style.display = "none"

    document.querySelector(".city").innerHTML = `<h1>Place Not Found</h1>`;
  }
}

searchbtn.addEventListener("click", () => {
  if (searchbox.value !== "") {
    checkWeather(searchbox.value);
  } else {
    alert("Enter Valid Location");
  }
});
