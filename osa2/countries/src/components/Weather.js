
const Weather = ({weatherData}) => {
    if (weatherData === undefined) {
        return <h4>Ladataan säätietoja...</h4>
    }
    else {
        const iconURL = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        return (
            <div>
                <div>temperature {weatherData.main.temp} Celcius</div>
                <img src={iconURL} alt={weatherData.weather.description} />
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>

        )
    }
}

export default Weather;