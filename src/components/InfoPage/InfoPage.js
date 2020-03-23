import React from 'react';
import '../App/App.css'
import { connect } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = (props) => (
  <div>
      {(props.user.band === false && props.user.venue === false) &&
       <div>
         <p>want to register as a band or venue?</p>
         <form>
            <input type="radio" value="band"/>
            <label htmlFor="band">Band</label>
            <input type="radio" value="venue"/>
            <label htmlFor="venue">Venue</label>
            <input type="submit" value="submit"/>
          </form>
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


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(InfoPage);
