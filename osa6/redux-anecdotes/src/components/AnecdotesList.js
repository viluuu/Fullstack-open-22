import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification} from "../reducers/notificationReducer";
import { orderBy } from 'lodash'

const AnectodeList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const anecdotesSortedDescending = orderBy(anecdotes, ['votes'], ['desc'])
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(newNotification(`you voted "${anecdote.content}"`))
    }

    return (
        <div>
            {anecdotesSortedDescending.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnectodeList