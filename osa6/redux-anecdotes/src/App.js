import AnecdoteForm from './components/AnecdoteForm';
import AnectodeList from './components/AnecdotesList';

const App = () => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <AnectodeList />
            <AnecdoteForm />
        </div>
    )
}

export default App