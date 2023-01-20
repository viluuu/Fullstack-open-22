const notificationReducer = (state = null, action) =>  {
    switch (action.type) {
        case 'SHOW':
            return action.notification
        case 'HIDE':
            return action.notification
        default:
            return state
    }
}

export const newNotification = (notification) => {
    return dispatch => {
        dispatch({
            type: 'SHOW',
            notification
        })

        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                notification: null
            })
        }, 5000)
    }
}

export default notificationReducer