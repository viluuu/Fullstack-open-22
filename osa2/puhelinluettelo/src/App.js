import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0505252522'}, 
    { name: 'Matti Mättänen', number: '123123123'},
    { name: 'Ville Räsänen', number: '000-000-0000'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons');

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Jos nimi on jo listassa niin ilmoitus ja nollataan newName
    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    }
    // Mikäli ei ole listassa lisätään nimi listaan
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  // Tapahtumankäsittelijät
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const Person = ({person}) => {
    return (
      <p> {person.name} {person.number} </p> 
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <h2>Add a new</h2>
        <form onSubmit= {addName}>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key={person.name} person={person} /> 
          )}
      </div>
    </div>
  )

}

export default App
