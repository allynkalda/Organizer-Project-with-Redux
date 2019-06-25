import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createTodo } from '../../store/actions/todoActions'

class TodoInput extends Component {
    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.newTodo(this.state)
        this.props.history.push('/todo')
    }
    render() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to="/todo" />
        return (
            <div className="container">
              <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">New To-Do</h5>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id='title' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="content">Content</label>
                  <input type="text" id='content' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newTodo: (todo) => dispatch(createTodo(todo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);