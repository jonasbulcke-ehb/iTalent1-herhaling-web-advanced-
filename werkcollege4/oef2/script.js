'use strict'

window.onload = () => {
    document.getElementById("weather-form").addEventListener("submit", event => {
        event.preventDefault();
        let city = document.getElementById("city").value;
        fetchCityData(city)
     })
}

let fetchCityData = async (city) => {
    let baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d7b955c4c268fe54649d6f0d702b39d1&units=metric`;
    let respone = await fetch(baseUrl);
    if(!respone.ok) {
        alert("invalid city!");
    } else {
        let data = await respone.json();
        document.getElementById("temperature").innerText = `Average temperature: ${data.main.temp}`
        document.getElementById("min").innerText = `Min temperature: ${data.main.temp_min}`
        document.getElementById("max").innerText = `Max temperature: ${data.main.temp_max}` 
        let country = data.sys.country;
        fetchCountyData(country);
    }
}

let fetchCountyData = async (country) => {
    let baseUrl = `https://restcountries.eu/rest/v2/alpha/${country}`;
    let response = await fetch(baseUrl);
    if(response.ok) {
        let data = await response.json();
        let img = document.createElement("img");
        img.setAttribute("src", data.flag);
        console.log(data.flag);
        document.getElementById("flag").appendChild(img);
    } 
    
}