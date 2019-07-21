import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const ShowProfile = ({ profile, auth }) => {
        console.log(profile)
        if (!auth.uid) return <Redirect to='/' />

        return (
            <div className="container center-align">
                <h3>My Profile</h3>
                <img alt="profile" className="photo-size circle responsive-img" src={profile.photoURL} />
                <p>First Name: {profile.firstName}</p>
                <p>Last Name: {profile.lastName}</p>
                <p>Email: {auth.email}</p>
            </div>
        )
    }


const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
  }

export default connect(mapStateToProps)(ShowProfile)