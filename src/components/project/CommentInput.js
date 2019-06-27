import React, { Component } from 'react';
import { addComment } from '../../store/actions/projectActions'
import { connect } from 'react-redux'

class CommentInput extends Component {
    state = {
        comment: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.id
        this.props.addCommentDispatch(this.state, id)
    }
    render() {
        
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Comment:</h5>
                    <div className="input-field">
                    <label htmlFor="comment">Comment:</label>
                    <textarea name="comment" id="comment" className="materialize-textarea" cols="30" rows="10" 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Send</button>
                    </div>
                    </form>
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCommentDispatch: (comment, id) => dispatch(addComment(comment, id))
    }
}

export default connect(null, mapDispatchToProps)(CommentInput)
