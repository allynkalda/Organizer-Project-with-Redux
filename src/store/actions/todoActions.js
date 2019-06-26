export const createTodo = (todo) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('todo').add({
            ...todo,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_TODO_SUCCESS', todo })
        }).catch(err => {
            dispatch({ type: 'CREATE_TODO_ERROR' })
        })
    }
}