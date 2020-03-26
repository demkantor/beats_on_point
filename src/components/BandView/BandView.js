import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


//shows the selectedd band's bio page
class BandView extends Component {

  componentDidMount=()=>{
    let id = this.props.history.location.payload;
      this.props.dispatch({type: 'GET_THE_BAND', payload: id});
  }

  render() {
    const gig = this.props.reduxState.currentEvent.bandReducer;
    return (
      <>
        <div className="fullView">
          <button className="log-in" onClick={()=>this.props.history.push('/calendar-view')}>Return To Calendar</button>
            <div className="bandView" key={gig.id}>
              <div className="bioBanner">{gig.name}</div>
              <img className="bioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.name}/>
              <br />
              <div className="bioDescription">
                {gig.description}
              </div>
                <div className="socialMedia">
                  <a href={gig.twitter} target="_blank" rel="noreferrer noopener">
                    <img className="linkIcons" src="/images/twitter.png" alt={gig.twitter}/>
                  </a>
                  <a href={gig.facebook} target="_blank" rel="noreferrer noopener">
                    <img className="linkIcons" src="/images/facebook.png" alt={gig.facebook}/>
                  </a>
                  <a href={gig.www} target="_blank" rel="noreferrer noopener">
                    <img className="linkIcons" src="/images/www.png" alt={gig.www}/>
                  </a>  
                  <a href={gig.youtube} target="_blank" rel="noreferrer noopener">
                    <img className="linkIcons" src="/images/youtube.png" alt={gig.youtube}/>
                  </a>
                </div>
            </div>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(BandView);