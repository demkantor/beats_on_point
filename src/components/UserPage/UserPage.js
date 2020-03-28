import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import SignInSuccess from '../SignInSuccess/SignInSuccess';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const UserPage = (props) => {
  
  //preloads band / venue info
  if(props.user.band === true){
    props.dispatch({type: 'GET_THIS_BAND', payload: props.user.id})
  }else if(props.user.venue === true){
    props.dispatch({type: 'GET_THIS_VENUE', payload: props.user.id})
  }
  
  return (
      <>
        <div className="welcomeFriend">
          <h1 id="welcome">
            Welcome, { props.user.username }!
          </h1>
          <img className="bioPhoto" src={`data:image/png;base64,${props.user.photo}`} alt="profile" />
          {/* <p className="welcomeId" >Your ID is: {props.user.id}</p> */}
          <LogOutButton className="log-in btnFix" />
          {props.user.id !== ''
          ?
          <SignInSuccess /> 
          : null}
        </div>
      </>
    );
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);