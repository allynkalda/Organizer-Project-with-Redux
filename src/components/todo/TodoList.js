import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

class TodoList extends Component {
    render() {
        const { todo, auth } = this.props;
        console.log(todo)

        if (!auth.uid) return <Redirect to='/signin' />

        if (!todo) return <p>You have no items in your to-do list.</p>

        return (
            <div>
                {console.log(todo)}
                <h5 className="grey-text text-darken-3">My To-Do List</h5>
                <div className="container">
                    {
                        !todo ? "Loading" : todo.map( todo => { return (
                            <div>
                            <p>{todo.title}</p>
                            <p>{todo.content}</p>
                            </div>
                            )
                        }) 
                    }
                </div>
                <div className="container">
                    <Link to="/newtodo"><button className="btn pink lighten-1 z-depth-0">Create a To-Do</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const todos = state.firestore.ordered.todo;
    return {
        todo: todos,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
        { collection: 'todo',
        where: [
           ['authorId', '==', props.auth.uid]
        ] }
    ]})
)(TodoList);
