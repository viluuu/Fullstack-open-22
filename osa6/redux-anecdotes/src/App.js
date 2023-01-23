import AnecdoteForm from './components/AnecdoteForm';
import AnectodeList from './components/AnecdotesList';
import Notification from "./components/Notification";
import anecdoteService from './services/anecdotes'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService
            .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    })

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnectodeList />
            <AnecdoteForm />
        </div>
    )
}

export default App