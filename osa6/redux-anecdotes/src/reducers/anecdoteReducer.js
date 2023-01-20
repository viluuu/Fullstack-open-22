const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'VOTE': {
            const votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
            const switchAnecdote = {
                ...votedAnecdote, votes: votedAnecdote.votes + 1
            }
            const tempState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : switchAnecdote)
            return tempState.sort((a, b) => b.votes - a.votes)
        }
        case 'ADD': {
            const newAnecdote = {
                content: action.data.content,
                id: getId(),
                votes: 0
            }
            return state.concat(newAnecdote)
        }
        default:
            return state
    }

}

export const voteAnecdote = anecdote => {
    return {
        type: 'VOTE',
        data: anecdote
    }
}

export const addAnecdote = (content) => {
    return {
        type: 'ADD',
        data: {content}
    }
}

export default anecdoteReducer