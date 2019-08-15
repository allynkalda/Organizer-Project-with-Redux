import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteToDo } from '../../store/actions/todoActions'

class TodoList extends Component {
    render() {
        const { todo, auth, dispatchDeleteToDo } = this.props;
        console.log(todo)

        if (!auth.uid) return <Redirect to='/signin' />

        if (!todo) return <p>You have no items in your to-do list.</p>

        return (
            <div className="container center-align">
                <h5 className="grey-text text-darken-3">My To-Do List</h5>
                <div className="container">
                    <Link to="/newtodo"><button className="btn pink lighten-1 z-depth-0">Create a To-Do</button></Link>
                </div>
                <div className="row">
                    {
                        !todo ? "Loading" : todo.map( todo => { return (
                            <div key={todo.id} className="col s12">
                            <div className="card grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title"><p>{todo.title}</p></span>
                                <em><p>{ todo.createdAt ? 
                                     moment(todo.createdAt.toDate().toString()).calendar(): 
                                     null }</p></em>
                                <p>{todo.content}</p>
                                <button onClick={(e) => dispatchDeleteToDo(e, todo.id)}
                                    className="btn-floating halfway-fab waves-effect waves-light pink">
                                    <i className="material-icons">delete</i>
                                    </button>
                            </div>
                            </div>
                            </div>
                            )
                        }) 
                    }
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

const matchDispatchToProps = (dispatch, props) => {
    return {
        dispatchDeleteToDo: (e, id) => {
            e.preventDefault()
            dispatch(deleteToDo(id))
            props.history.push('/todo')
        }
    }
}

export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect((props) => {
        return [
        { collection: 'todo',
        where: [
           ['authorId', '==', props.auth.uid]
        ] }
    ]})
)(TodoList);
