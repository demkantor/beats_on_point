import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class BandView extends Component {

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_THE_BAND'});
    }

  render() {
    return (
      <>
        <div className='bandView'>
            {this.props.reduxState.currentEvent.bandReducer
            && (
            <>
                {this.props.reduxState.currentEvent.bandReducer.map(gig => (
                <div className="bandView" key={gig.id}>
                  <div>{gig.name}</div>
                  <img className="" src={`data:image/png;base64,${gig.photo}`} alt={gig.name} width="100vw"/>
                  <br />
                  <div className="center">
                    <div>{gig.twitter}</div>
                    <div>{gig.facebook}</div>
                    <div>{gig.www}</div>
                    <div>{gig.youtube}</div>
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