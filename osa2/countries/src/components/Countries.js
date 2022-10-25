

const Countries = ( {countriesToShow, setCountriesToShow} ) => {

  const handleClick = ({country}) => {
    setCountriesToShow([country])
    console.log(countriesToShow);
  }

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

  // Listassa vain yksi maa
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
        <img src={country.flags.png} width={250}/>
      </div>
    ))
}

export default Countries;