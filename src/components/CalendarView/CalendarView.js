import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom'



class CalendarView extends Component {

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_EVENT_LIST'});
    }
   
    bandInfo=(id)=>{
      console.log('you clickd on band info to event', id);
      this.props.history.push({
        pathname: '/band-view',
        payload: id
      })
      this.props.dispatch({type: 'GET_THE_BAND', payload: id})
    }

    venueInfo=(id)=>{
      console.log('you clicked on venue info', id);
      this.props.history.push({
        pathname: '/venue-view',
        payload: id
      })
      this.props.dispatch({type: 'GET_THE_VENUE', payload: id})
    }

  render() {
    return (
      <>
        <div className=''>
            <h1 className="center" >Upcoming Events</h1>
            {this.props.reduxState.calendarReducer && (
              <div className="calendarView">
                {this.props.reduxState.calendarReducer.map(event => (
                  <div className="poster" key={event.id}>
                    <img className="inlinePhoto" src={`data:image/png;base64,${event.band_photo}`}  
                    alt='' height="95vh" width="95vmin"
                    onClick={()=>this.bandInfo(event.bands_id)}/>
                    <br />
                    <div className="eventInfo">
                      <div>{event.date}</div>
                      <div>{event.time}</div>
                      <div>Tickets {event.cost}</div> 
                    </div>
                    <img className="inlinePhoto" src={`data:image/png;base64,${event.venue_photo}`}  
                    alt='' height="95vh" width="95vmin"
                    onClick={()=>this.venueInfo(event.venues_id)}/>
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
  
  export default withRouter(connect(putReduxStateOnProps)(CalendarView));