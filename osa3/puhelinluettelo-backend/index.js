const http = require('http');
const express = require('express');
const { response } = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4, 
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Helta Arros",
        number: "050-123321"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }    
})

app.get('/info', (request, response) => {
    const date = new Date().toString();
    response.send(`
    <div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    </div>
    `)  
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    persons = persons.filter(person => person.id !== id)

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    
    

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (persons.some(e => e.name === body.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person);

    response.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});