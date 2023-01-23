import AnecdoteForm from './components/AnecdoteForm';
import AnectodeList from './components/AnecdotesList';
import Notification from "./components/Notification";
import anecdoteService from './services/anecdotes'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeAnecdotes, setAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

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