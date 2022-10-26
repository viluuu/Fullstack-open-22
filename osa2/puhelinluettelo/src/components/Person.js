
const Person = ({persons, removeName}) => {

    return persons.map((person) => (
        <div key={person.id}>
            <p> {person.name} {person.number} <button onClick={() => 
                removeName(person.id, person.name)}>delete</button></p>
        </div>
    ))
}

export default Person;