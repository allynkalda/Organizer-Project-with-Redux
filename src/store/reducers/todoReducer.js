const initState = {
    todo: []
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO_SUCCESS':
            console.log('create new todo success')
            return {
                ...state,
                todo: [action.todo, ...state.todo]
            }
        case 'CREATE_TODO_ERROR':
            console.log('create todo error');
            return state;
        case 'DELETE_TODO_SUCCESS':
            console.log('delete todo success');
            return state;  
        case 'DELETE_TODO_ERROR':
            console.log('delete todo error');
            return state;    
        default:
            return state;
    }
        
}

export default todoReducer;