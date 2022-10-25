import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [selection, setSelection] = useState('');
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      });
  }, []);

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
      <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
    </div>
  )
}

export default App;
