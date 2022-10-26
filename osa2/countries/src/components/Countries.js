import Weather from "./Weather";

const Countries = ( {countriesToShow, setCountriesToShow, weatherData} ) => {

  // Kun listassa on yli kymmenen maata
  if (countriesToShow.length > 10) {
    return 'Too many matches, specify another filter'
  } 
  
  // Kun listassa väliltä 10 ja 1 maata 
  if (countriesToShow.length < 10 && countriesToShow.length > 1) {
    return countriesToShow.map((country) => (
      <div key={country.name.common}>
        {country.name.common} <button onClick= {() => setCountriesToShow([country])}>show</button>
      </div>
      ))
  }

  // Kun listassa on vain yksi maa jäljellä.
  if (countriesToShow.length === 1) {
    return countriesToShow.map((country) => (
      <div key={country.name.common}>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} width={250} alt={country.name.common}/>
        <h3>Weather in {country.capital}</h3>
        <div>
          <Weather weatherData={weatherData}/>
        </div>
      </div>
    ))
  }

  // Listassa vain yksi maa
  
}

export default Countries;