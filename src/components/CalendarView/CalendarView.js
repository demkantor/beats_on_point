import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class CalendarView extends Component {

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_EVENT_LIST'});
    }
   
  render() {
    return (
      <>
        <div className=''>
            <h1>Upcoming Events</h1>
            {this.props.reduxState.calendarReducer && (
              <div className="calendarView">
                {this.props.reduxState.calendarReducer.map(event => (
                  <div className="poster" key={event.id}>
                    <img className="inlinePhoto" src={`data:image/png;base64,${event.band_photo}`}  alt='' height="95vh" width="95vmin"/>
                    <br />
                    <div className="eventInfo">
                    {event.date} at {event.time} {event.cost} 
                    </div>
                    <img className="inlinePhoto" src={`data:image/png;base64,${event.venue_photo}`}  alt='' height="95vh" width="95vmin"/>
                  </div>
                ))}
              </div>
            )}
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(CalendarView);