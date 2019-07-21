import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import CommentInput from './CommentInput';
import CommentsList from './CommentsList'

const ProjectDetails = (props) => {
    const { auth, project, dispatchDeleteProject } = props;
    console.log(props)
    if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return (
        <div className="container section project-details">
            <div className="card z-depth-1">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p>{project.content}</p>
                    <button className="btn-floating halfway-fab waves-effect waves-light pink"
                        onClick={(e) => dispatchDeleteProject(e, props.id)}>
                    <i class="material-icons">delete</i>
                    </button>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    <div><p>{ project.createdAt ? 
                              moment(project.createdAt.toDate().toString()).calendar() :
                              null }</p></div>
                </div>
                </div>
                <CommentInput id={props.id} />
                <CommentsList id={props.id}/>
        </div>
        )
    } else {
        return (
        <div className="container center">
            <p>Loading...</p>
        </div>
            )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    console.log(state.firestore)
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    const comments = state.firestore.ordered.projects
    // const comment = comments ? projects[0].comments :
    return {
        project: project,
        comments: comments,
        id: id,
        auth: state.firebase.auth
    }
}
const matchDispatchToProps = (dispatch, props) => {
    return {
        dispatchDeleteProject: (e, id) => {
            e.preventDefault()
            dispatch(deleteProject(id))
            props.history.push('/')
        }
    }
}

export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect(props => {
        return [
            { collection: 'projects' }
        ]
    })
)(ProjectDetails)