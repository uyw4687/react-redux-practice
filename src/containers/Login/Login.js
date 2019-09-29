import React, { Component } from 'react'
import "./Login.css"

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'

import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    onLogIn = () => {
        //var data = { email: this.state.email, password: this.state.password };
        // if (data.email === "swpp@snu.ac.kr" && data.password === "iluvswpp") {
        var filtered = this.props.storedUsers.filter(user => user.email === this.state.email)
        if(filtered.length === 1) {
            if(filtered[0].password === this.state.password) {
                this.props.onLogIn(filtered[0].id)
                this.props.onSuccess()
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
        onLogIn: (id) =>
            dispatch({ type: actionTypes.LOG_IN, id: id }),
        onLogOut: () =>
            dispatch({ type: actionTypes.LOG_OUT })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)