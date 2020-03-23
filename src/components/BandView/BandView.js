import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class BandView extends Component {

    componentDidMount=()=>{
      let id = this.props.history.location.payload;
        this.props.dispatch({type: 'GET_THE_BAND', payload: id});
    }

  render() {
    return (
      <>
        <div className='bandView'>
          <button className="log-in" onClick={()=>this.props.history.push('/calendar-view')}>Return To Calendar</button>
            {this.props.reduxState.currentEvent.bandReducer
            && (
            <>
                {this.props.reduxState.currentEvent.bandReducer.map(gig => (
                <div className="bandView" key={gig.id}>
                  <div className="bioBanner">{gig.name}</div>
                  <img className="bioPhoto" src={`data:image/png;base64,${gig.photo}`} alt={gig.name}/>
                  <br />
                  <div className="bioDescription">
                    {gig.description}
                  </div>
                  <div className="socialMedia">
                    <img className="linkIcons" src="/images/twitter.png" alt={gig.twitter}/>
                    <img className="linkIcons" src="/images/facebook.png" alt={gig.facebook}/>
                    <img className="linkIcons" src="/images/www.png" alt={gig.www}/>
                    <img className="linkIcons" src="/images/youtube.png" alt={gig.youtube}/>
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
  
  export default connect(putReduxStateOnProps)(BandView);