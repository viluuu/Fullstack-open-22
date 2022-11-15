import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
import Person from './components/Person'



const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);



  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className='notificationMessage'>
        {message}
      </div>
    )
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Jos nimi on jo listassa niin ilmoitus ja nollataan newName
    if (persons.some(e => e.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      const id = person.id;
      if(window.confirm('Nimi on jo listassa, haluatko päivittää numeron?')) 
        personService
        .update(person.id, personObject)
        .then(returnedPerson => {
          persons.map((person) =>
          person.id === id ? person : returnedPerson)
          setPersons(persons);

          setNotificationMessage(`Numero ${personObject.number} päivitettiin onnistuneesti`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      setNewName('');
      setNewNumber('');
    }
    
    // Mikäli ei ole listassa lisätään nimi listaan
    else {
      personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        setNotificationMessage(error.response.data)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      setNotificationMessage(`Nimi ${personObject.name} lisättiin onnistuneesti`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  // Nimen poisto
  const removeName = (id, name) => {
    if(window.confirm("Poistetaanko " + id.name))
    personService
      .remove(id)
      .then((response) => {
        const deletepersonList = persons.filter((person) => person.id !== id);
        setPersons(deletepersonList);

        setNotificationMessage(`Nimi ${name} poistettu onnistuneesti`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  // Tapahtumankäsittelijät
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <Person persons = {persons} removeName = {removeName} />
    </div>
  )

}

export default App
