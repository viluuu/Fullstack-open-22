import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [selection, setSelection] = useState('');
  const [weatherData, setWeatherData] = useState();
  
  // Maiden tiedot
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      });
  }, []);

  // Säätiedot mikäli vain yksi maa jäljellä listassa
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    if (countriesToShow.length === 1) {
      const city = countriesToShow.map(country => country.capital);
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeatherData(response.data)
        })
    }
  })

  const handleSelectionChange = (event) => {
    console.log(event.target.value);
    const find = event.target.value;
    setSelection(find);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toString().toLowerCase().includes(find.toString().toLowerCase())
      )
    )
  }

  return (
    <div>
      <h1>Etsi haluamasi kaupunki</h1>
      <div>
        find countries <input value={selection} onChange={handleSelectionChange}/>
      </div>
      <Countries 
        countriesToShow={countriesToShow}
        setCountriesToShow={setCountriesToShow}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App;
