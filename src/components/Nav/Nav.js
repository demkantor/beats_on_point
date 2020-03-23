import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../App/App.css';


const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title bop">Beats on Point𝅘𝅥𝅯 </h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/info">
            Info Page
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* if logged in user is a band show */}
      {props.user.band === true && (
        <>
          {/* <Link className="nav-link" to="/band-edit">
            Edit Profile
          </Link> */}
          <img className="profileCircle" 
          src={`data:image/png;base64,${props.user.photo}`} 
          alt="edit profile"
          onClick={()=>props.history.push('/calendar-edit')}
          />
        </>
      )}
      {/* if logged in user is a venue show */}
       {props.user.venue === true && (
        <>
          {/* <Link className="nav-link" to="/venue-edit">
            Edit Profile
          </Link> */}
           <img className="profileCircle" 
            src={`data:image/png;base64,${props.user.photo}`} 
            alt="edit profile"
            onClick={()=>props.history.push('/calendar-edit')}
          />
        </>
        
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/calendar-view">
        Calendar
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Nav));
