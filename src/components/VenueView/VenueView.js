import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class VenueView extends Component {

    componentDidMount=()=>{
        // this.props.dispatch({type: 'GET_EVENT_LIST'});
    }

  render() {
    return (
      <>
        <div className='bandView'>
            <h1 className="center" >BandView</h1>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(VenueView);