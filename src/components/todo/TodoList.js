import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class TodoList extends Component {
    
    render() {

        console.log(this.props)
        return (
            <div>
                <h5 className="grey-text text-darken-3">My To-Do List</h5>
                <div className="container">
                <Link to="/newtodo"><button className="btn pink lighten-1 z-depth-0">Create a To-Do</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
        console.log(state)
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList);
