import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import CommentInput from './CommentInput';

const ProjectDetails = (props) => {
    const { auth, project, dispatchDeleteProject } = props;
    console.log(props)
    if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p>{project.content}</p>
                    <button className="btn pink lighten-1 z-depth-0" 
                        onClick={(e) => dispatchDeleteProject(e, props.id)}>Delete</button>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    {/* <div><p>{moment(project.createdAt.toDate().toString()).calendar()}</p></div> */}
                </div>
                <CommentInput id={props.id} />
            </div>
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
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
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
            { collection: 'projects',
              doc: props.id,
              subcollections: [{ collection: "comments" }] }
        ]
    })
)(ProjectDetails)