import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return (
        <div>
        <ul id="nav-mobile" class="right">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/todo">To-Dos</NavLink></li>
            <li><NavLink to="/project">Projects</NavLink></li>
            <li><Link onClick={props.signOut}>Log Out</Link></li>
            <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
        </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);