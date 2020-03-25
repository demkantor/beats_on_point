import React, {useState} from 'react';
import '../App/App.css'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'



const InfoPage = (props) => {
  const [value, setValue] = useState('');
  
return(
  <div>
      {(props.user.band === false && props.user.venue === false) &&
       <div>
         <h4><strong>Beats on Point𝅘𝅥𝅯</strong>.  is a music first community</h4>
         <p>Registering as a band or venue allows you to add to the public calendar</p>
         <p>want to register as a band or venue?</p>
         <form onSubmit={()=>{props.history.push('/'); props.dispatch({type: `NEW_${value}`, payload: props.user.id}); props.dispatch({ type: 'LOGOUT' })}}>
            <input type="radio" name="choose" value="BAND" onChange={()=>setValue('BAND')}/>
            <label htmlFor="BAND">Band</label>
            <input type="radio" name="choose" value="VENUE" onChange={()=>setValue('VENUE')}/>
            <label htmlFor="VENUE">Venue</label>
            <input type="radio" name="choose" value="NOPE" onChange={()=>setValue('NOPE')}/>
            <label htmlFor="NOPE">No Thanks</label>
            <input type="submit" value="submit"/>
          </form>
          <p>If you choose to create yourself as a band or venue you will be logged out</p>
          <p>then just log back in with current name and password</p>
       </div>
      }
    {props.user.band === true &&
      <div>
        <p>already in a band!</p>
        <p>if you would like to register as a venue or another band please make another accout</p>
      </div>
    }
    {props.user.venue === true &&
      <div>
        <p>already registered as a venue</p>
        <p>if you want to register as a band or another venue please create another account</p>
      </div>
     }
  </div>
);
    }    

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(InfoPage));
