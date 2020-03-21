import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom'


class VenueView extends Component {

    componentDidMount=()=>{
      let id = this.props.history.location.payload;
      this.props.dispatch({type: 'GET_THE_VENUE', payload: id});
    }

  render() {
    return (
      <>
        <div className='venueView'>
        <button className="log-in" onClick={()=>this.props.history.push('/calendar-view')}>Return To Calendar</button>
            {this.props.reduxState.currentEvent.venueReducer
            && (
            <>
                {this.props.reduxState.currentEvent.venueReducer.map(gig => (
                <div className="venueView" key={gig.id}>
                  <div className="bioBanner">{gig.name}</div>
                  <img className="bioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.name}/>
                  <br />
                  <div className="bioAddress">
                    {gig.address}
                  </div>
                  <div className="bioDescription">
                    {gig.description}
                  </div>
                  <div className="socialMedia">
                    <img className="linkIcons" src="/images/twitter.png" alt="https://twitter.com/{gig.twitter}"/>
                    <img className="linkIcons" src="/images/facebook.png" alt="https://www.facebook.com/{gig.facebook}"/>
                    <img className="linkIcons" src="/images/www.png" alt="https://www.{gig.www}"/>
                    <img className="linkIcons" src="/images/youtube.png" alt="https://www.youtube.com/{gig.youtube}"/>
                  </div>
                </div>
              ))}
            </>
            )}
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default withRouter(connect(putReduxStateOnProps)(VenueView));