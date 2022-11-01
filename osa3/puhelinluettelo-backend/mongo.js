const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


const url =
  `mongodb+srv://fullstack:${password}@cluster0.ofeny7n.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

// Jos parametrit sisältää vain salasanan tulostetaan tiedot
if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            console.log("phonebook:")
            persons.forEach(person => {
                console.log(person.name, person.number)  
            })
        
        mongoose.connection.close();
        })
}


// Mikäli kaikki tiedot annettu lisätään databaseen
if (process.argv.length === 5) {
    const person = new Person(
        {
        name: name,
        number: number,
        id: generateId(),
    }
)

person.save().then(result => {
  console.log('Henkilö lisätty')
  mongoose.connection.close()
})
}

