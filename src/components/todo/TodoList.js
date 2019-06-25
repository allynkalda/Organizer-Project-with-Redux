import React from 'react'
import { Link } from 'react-router-dom'

export default function TodoList() {
    return (
        <div>
            <h5 className="grey-text text-darken-3">My To-Do List</h5>
            <div className="container">
            <Link to="/newtodo"><button className="btn pink lighten-1 z-depth-0">Create a To-Do</button></Link>
            </div>
        </div>
    )
}
