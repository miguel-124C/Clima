const API_KEY = "758081342dee422aef49a98acf5d54cc";

const fetchData = (position) =>{
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=mtric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(Response => Response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = (data) =>{
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: (data.main.humidity)+"%",
        pressure: data.main.pressure,
        temperature: Math.trunc((data.main.temp) / 10) + "ºC",
        date: getDate()
    }
    Object.keys(weatherData).forEach(key =>{
        document.getElementById(key).textContent = weatherData[key];
    })
    cleanUp();
}

const cleanUp =()=>{
    let container = document.getElementById('container');
    let loader = document.querySelector('.ring');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

const getDate = ()=>{
    let date = new Date();
    return `${date.getDate()}-${('0'+ (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

addEventListener("load",()=>{
    navigator.geolocation.getCurrentPosition(fetchData)
})