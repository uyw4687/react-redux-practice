import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'

import "./Login.css"

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    onLogIn = () => {
        var filtered = this.props.storedUsers.filter(user => user.email === this.state.email)
        if(filtered.length === 1) {
            if(filtered[0].password === this.state.password) {
                this.props.onLogIn(filtered[0].id)
                this.props.onSuccess(filtered[0].id)
                return
            }
        }
        alert("Email or password is wrong");
    }
    onKeyPressed = (event) => {
        var code = event.keyCode || event.which
        if(code === 13) {
            this.onLogIn()
        }
    }
    render() {
        return (
            <div className = "Login">
                <label id="email-label">Email</label>
                <input type="email" id="email-input" onChange={(event) => this.setState({ email: event.target.value })} />
                <label>Password</label>
                <input type="password" id="pw-input" onChange={(event) => this.setState({ password: event.target.value })} 
                    onKeyPress={this.onKeyPressed} />
                <button id="login-button" onClick={this.onLogIn}>Login</button>
                <Redirect exact from='/' to='/login' />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        storedCurrentUserId: state.at.currentUserId,
        storedUsers: state.at.users
    }
}
const mapDispatchToProps = dispatch => {
  return {
      onLogIn: (id) => dispatch(actionCreators.logIn(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)