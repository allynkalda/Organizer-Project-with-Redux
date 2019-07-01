import React from 'react'
import { firestoreConnect } from "react-redux-firebase"
import { connect } from 'react-redux'
import { compose } from 'redux'

const CommentsList = ({ comments }) => {
    return (
        <div>
            {console.log(comments)}
            { !comments ? "Loading..." : comments.map(elem => {
                return (
                    <div key={elem.id}>
                        <p>{elem.comment}</p>
                        <p>Posted by {elem.authorFirstName}</p>

                    </div>
                )
            }) }
        </div>
    )
}

const mapStateToProps = (state) => {
    const comments = state.firestore.ordered.projects
    return {
        comments: comments,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [
            { collection: 'projects',
              doc: props.id,
              subcollections: [{ collection: "comments" }] }
        ]
    })
)(CommentsList)
