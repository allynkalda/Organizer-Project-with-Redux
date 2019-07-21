import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { storage } from '../../config/fbconfig.js'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: null,
        photoURL: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    handleChangeImage = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            this.setState({ image })
            }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { image } = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            storage.ref('images').child(image.name).getDownloadURL().then(photo => {
                console.log(photo)
                this.setState({ photoURL: photo })
                this.props.signUp(this.state)  
            })
        })
         
    }
    
    render() {

        const { auth, authError } = this.props;

        console.log(auth)
        // if (auth.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id='firstName' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id='lastName' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="image">Profile Photo</label>
                        <input type="file" id="image" onChange={this.handleChangeImage} />
                    </div>
                    <div className="input-field">
                        <button className="btn green lighten-1 z-depth-0">Sign Up</button>
                        <div className="red-text center">
                            { authError ? <p>{ authError }</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      signUp: (newUser) => dispatch(signUp(newUser))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)