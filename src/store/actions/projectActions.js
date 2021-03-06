
export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};

export const deleteProject = (id) => {
  console.log("dispatch", id)
  return(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('projects').doc(id).delete()
      .then(() => {
        console.log('deleted')
        dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'DELETE_PROJECT_ERROR' });
      })
  }
}

export const addComment = ({comment}, id) => {
  console.log("dispatch", comment, id)
  return(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').doc(id).collection('comments').add({
      comment: comment,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
      }).then(() => {
        console.log('comment added')
        dispatch({ type: 'COMMENT_SUCCESS', comment}) 
      }).catch(err => {
        dispatch({ type: 'COMMENT_DELETE', err })
      })
  }
}