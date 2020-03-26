import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';



//page for bands and venues to add new events, landing page when band/venue logs in
class AddEvent extends Component {

  state={
    date: new Date(),
    cost: 0,
    bands: null,
    bandsId: null,
    venues: null,
    venuesId: null,
    id: null,
    who: null
  }

  //need to write this section, make a new component or pop up
  addition=()=>{
    console.log('adding your friends')
  }

  componentDidMount=()=>{
      const user = this.props.reduxState.user;
      this.setState({id: user.id})
      if(this.props.reduxState.user.band === true){
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'bands'}})
        this.props.dispatch({type: 'GET_ALL_VENUES'})
        this.props.dispatch({type: 'GET_THIS_BAND', payload: this.props.reduxState.user.id})
        this.setState({bands: this.props.reduxState.editProfile.editBandReducer.name})
        this.setState({bandsId: this.props.reduxState.editProfile.editBandReducer.id})
        this.setState({who: 'bands'})
    }else{
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'venues'}})
        this.props.dispatch({type: 'GET_ALL_BANDS'});
        this.props.dispatch({type: 'GET_THIS_VENUE', payload: this.props.reduxState.user.id})
        this.setState({venues: this.props.reduxState.editProfile.editVenueReducer.name})
        this.setState({venuesId: this.props.reduxState.editProfile.editVenueReducer.id})
        this.setState({who: 'venues'})
      }
  }

  editProfile=()=>{
      if(this.props.reduxState.user.band === true){
          this.props.history.push('/band-edit')
      }else{
          this.props.history.push('/venue-edit')
      }
  }

  filter=(event)=>{
    this.setState({cost: event.target.value});
  }

  newEvent=()=>{
    let objectToSend = this.state;
    swal({
      title: "Create New Event?",
      text: `${this.state.bands} playing at ${this.state.venues} on ${this.state.date} for ${this.state.cost}`,
      icon: "info",
      buttons: true,
      dangerMode: false,
    })
    .then((keep) => {
      if (keep) {
        swal("Your new event has been added to the calendar!", {
          icon: "success",
        })
        this.props.dispatch({type: 'CREATE_NEW_EVENT', payload: objectToSend})
      } else {
        swal("cool, not adding event");
      }
    });
  }

  removeEvent=(event)=>{
    const user = this.props.reduxState.user;
    // console.log('remove event', event);
    this.props.dispatch({type: 'REMOVE_EVENT', payload: {id: user.id, who: 'bands', eventId: event}})
  }

  selectBand=(event)=>{
    this.setState({bandsId: event.target.value});
  }

  selectDate=(date)=>{
    this.setState({date})
        // console.log('packing state:', this.state);
  }

  selectVenue=(event)=>{
    this.setState({venuesId: event.target.value});
  }

    
  render() {
    return (
      <>
        <button className="log-in" onClick={this.editProfile}>edit profile</button>
        <h1>Welcome {this.props.reduxState.user.username}</h1>
        {this.props.reduxState.user.band === true &&
          <>
            <h3>Your current events</h3>
            {this.props.reduxState.event.personalCalendar
            ?
            this.props.reduxState.event.personalCalendar.map(event => (
              <div className="poster" key={event.id}>
                <div>{event.venue_name}</div>
                <div>{event.date}</div>
                <div>Tickets {event.cost}</div>
                <button className="deleteButton" onClick={()=>this.removeEvent(event.id)}>X</button>
              </div>
            ))
            :
            <h6>Nothing on your calendat yet</h6>
            }
          </>
        }
        {this.props.reduxState.user.venue === true &&
          <>
            <h3>Your current events</h3>
            {this.props.reduxState.event.personalCalendar
            ?
            this.props.reduxState.event.personalCalendar.map(event => (
              <div className="poster" key={event.id}>
                <div>{event.band_name}</div>
                <div>{event.date}</div>
                <div>Tickets {event.cost}</div>
                <button className="deleteButton" onClick={()=>this.removeEvent(event.id)}>X</button>
              </div>
            ))
            :
            <h6>Nothing on your calendat yet</h6>
            }
          </>
          }
          <h3>Add new event</h3>
          <label htmlFor="pick-date" >Date</label>
          <DatePicker
              name="pick-date"
              selected={this.state.date}
              onChange={(date)=>this.selectDate(date)}
              showTimeSelect
              dateFormat="Pp"
          />
          <br/>
          <div>
            <label htmlFor="cost" >Cost</label>
            <select name="cost" className="filter" onChange={this.filter} value={this.state.value}>
                <option value="0">Free</option>
                <option value="5.00">$5</option>
                <option value="10.00">$10</option>
                <option value="15.00">$15</option>
                <option value="20.00">$20</option>
                <option value="25.00">$25</option>
            </select>
          </div>
          {this.props.reduxState.user.band === true &&
          <>
            <label htmlFor="venue">Venue</label>
            <select name="venue" className="filter" ref={this.state.value} value={this.state.value} onChange={this.selectVenue}>
                {this.props.reduxState.currentEvent.allVenues.map(dropdown => { 
                  return (
                    <option onClick={()=>this.setState({venues: dropdown.name})} key={dropdown.id} value={dropdown.id} ref={dropdown.name}>
                    {dropdown.name}</option>
                  )})
                }
            </select>
          </>
          }
          {this.props.reduxState.user.venue === true &&
          <>
            <label htmlFor="band" >Band</label>
            <select name="band" className="filter" ref={this.state.value} value={this.state.value} onChange={this.selectBand}>
            {this.props.reduxState.currentEvent.allBands.map(dropdown => { 
              return (
              <option onClick={()=>this.setState({bands: dropdown.name})} key={dropdown.id} value={dropdown.id} ref={dropdown.name}>
              {dropdown.name}</option>
            )})
            }
            </select>
          </>
          }
          <br/>
          <button className="log-in" onClick={this.newEvent}>submit</button>
          <br/>
          {this.props.reduxState.user.band === true &&
            <h5>Don't see the venue you want? <button className="log-in" onClick={this.addition}>create</button></h5>
          }
          {this.props.reduxState.user.venue === true &&
            <h5>Don't see the band you want? <button className="log-in" onClick={this.addition}>create</button></h5>
          }
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default withRouter(connect(putReduxStateOnProps)(AddEvent));