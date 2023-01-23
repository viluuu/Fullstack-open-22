import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { newNotification} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(newAnecdote))
        dispatch(newNotification(`new anecdote added: "${content}"`))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
       
    )
}

export default AnecdoteForm