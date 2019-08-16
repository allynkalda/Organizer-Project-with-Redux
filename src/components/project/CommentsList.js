import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

const CommentsList = ({ comments }) => {
    return (

        <div>
            { !comments ? "Loading..." : comments.map(elem => {
                return (
                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card light-grey darken-1">
                                <div class="card-content dark-grey-text">
                                    <div key={elem.id}>
                                    <h5>{elem.comment}</h5>
                                    </div>
                                    </div>
                                <div className="card-action grey lighten-4 grey-text">
                                <p>Posted by {elem.authorFirstName}</p>
                                <p>{ elem.createdAt ? 
                                    moment(elem.createdAt.toDate().toString()).calendar() :
                                    null }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    const comments = state.firestore.ordered.projects
   // const newComments = state.projects.comments[0]
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
