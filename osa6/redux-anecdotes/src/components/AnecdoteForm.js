import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { newNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
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