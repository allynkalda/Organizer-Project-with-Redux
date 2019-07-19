const initState = {
  projects: {},
  comments: []
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
    case 'DELETE_PROJECT_SUCCESS':
      console.log('delete project success');
      return state;
    case 'DELETE_PROJECT_ERROR':
      console.log('delete project error');
      return state;
    case 'COMMENT_SUCCESS':
        console.log('add comment success');
      return {
        comments: [ ...state.comments, action.comment]
      }
    default:
      return state;
  }
};

export default projectReducer;