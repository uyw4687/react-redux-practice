import React, { Component } from 'react';
import Login from './containers/Login/Login'
import Service from './components/Service/Service'

import { connect } from 'react-redux'

import * as actionCreators from './store/actions/blog'

class AppClass extends Component {
  state = {
    isLoggedIn: false,
    currentUserId: 0,
    bogus: 0,
  }
  constructor(props) {
    super(props)
    this.onLogIn = this.onLogIn.bind(this)
  }
  createLogout = () =>
    <button id='logout-button' onClick={this.onLogOut}>Logout</button>
  componentDidMount() {
      this.props.onGetArticles()
      this.props.onGetComments()
      this.props.onGetUsers()
  }
  componentDidUpdate(prevProps) {
    if(prevProps.storedUsers !== this.props.storedUsers) { 
      var loggedInUser = this.props.storedUsers.filter(user => user.logged_in === true)
      if(loggedInUser.length !== 0)
        this.setState({ isLoggedIn: true, currentUserId: loggedInUser[0].id }, this.forceUpdate )
      else
        this.setState({ isLoggedIn: false, currentUserId: 0 })
    }
  }
  onLogIn(id) {
    this.setState({ isLoggedIn: true, currentUserId: id})
  }
  onLogOut = () => {
    var latestUserId = this.state.currentUserId
    this.setState({ isLoggedIn: false, currentUserId: 0 })
    this.props.onLogOut(latestUserId)
  }
  render() {
    console.log(this.props.storedUsers)
    return !this.state.isLoggedIn ? 
        <Login onSuccess={this.onLogIn} /> : <div className='wrapper'> 
            {this.createLogout()} <Service currentUserId={this.state.currentUserId} /> </div> 
  }
}
const mapStateToProps = state => ({
    storedUsers: state.at.users
})
  
const mapDispatchToProps = dispatch => {
  return {
      onGetArticles: () => dispatch(actionCreators.getArticles()),
      onGetComments: () => dispatch(actionCreators.getComments()),
      onGetUsers: () => dispatch(actionCreators.getUsers()),
      onLogOut: (id) => dispatch(actionCreators.logOut(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppClass)
