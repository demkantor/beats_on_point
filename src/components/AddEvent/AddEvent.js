import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class AddEvent extends Component {

  state={
    date: new Date(),
    cost: 'Free',
    band: null,
    venue: null,

}


  componentDidMount=()=>{
      const user = this.props.reduxState.user;
      if(this.props.reduxState.user.band === true){
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'bands'}})
        this.props.dispatch({type: 'GET_ALL_VENUES'})
    }else{
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'venues'}})
        this.props.dispatch({type: 'GET_ALL_BANDS'})
      }
  }

    console=()=>{
        let stateDate = this.state.date;
        let formatted_date = stateDate.getFullYear() + "-" + (stateDate.getMonth() + 1) + "-" + stateDate.getDate() + " " + stateDate.getHours() + ":" + stateDate.getMinutes() + ":" + stateDate.getSeconds() 
        this.setState({formattedDate: formatted_date})
        console.log(this.state)
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

    select=(event)=>{
      this.setState({band: event.target.value});
    }

    removeEvent=(event)=>{
      const user = this.props.reduxState.user;
      console.log('remove event', event);
      this.props.dispatch({type: 'REMOVE_EVENT', payload: {id: user.id, who: 'bands', eventId: event}})
    }

    addition=()=>{
      console.log('adding your friends')
    }


  render() {
    return (
      <>
      <button className="log-in" onClick={this.editProfile}>edit profile</button>
      {this.props.reduxState &&
        <h1>Welcome {this.props.reduxState.user.username}</h1>
        }
        <>
        <h3>Your current events</h3>
        {this.props.reduxState.event.personalCalendar
        ?
        this.props.reduxState.event.personalCalendar.map(event => (
          <div className="poster" key={event.id}>
            <div>{event.date}</div>
            <div>{event.time}</div>
            <div>Tickets {event.cost}</div>
            <button className="deleteButton" onClick={()=>this.removeEvent(event.id)}>X</button>
          </div>
        ))
        :
        <h6>nothing on your calendat yet</h6>
        }
        </>
        <h3>Add new event</h3>
        <label>Date</label>
        <DatePicker
            selected={this.state.date}
            onChange={(date)=>this.setState({ date })}
            showTimeSelect
            dateFormat="Pp"
        />
        <br/>
        <div>
          <label>Cost</label>
          <select className="filter" onChange={this.filter} value={this.state.value}>
              <option value="free">Free</option>
              <option value="5.00">$5</option>
              <option value="10.00">$10</option>
              <option value="15.00">$15</option>
              <option value="20.00">$20</option>
              <option value="25.00">$25</option>
          </select>
        </div>
        {this.props.reduxState.user.band === true &&
        <>
          <label>Venue</label>
            <select className="genreList" >
              {this.props.reduxState.currentEvent.allVenues.map(dropdown => { 
                return <option dropdown={dropdown} key={dropdown.id} value={dropdown.id} onClick={(event) => this.handleChangeSelect(dropdown.id, event)}>
                {dropdown.name} </option>;
                })
              }
          </select>
        </>
        }
        {this.props.reduxState.user.venue === true &&
        <>
          <label>Band</label>
          <select className="filter" value={this.state.value} onChange={this.select}>
           {this.props.reduxState.currentEvent.allBands.map(dropdown => { 
             return <option key={dropdown.id} value={dropdown.name} >
             {dropdown.name} </option>;
             })
           }
          </select>
        </>
        }
        <br/>
        <button className="log-in" onClick={this.console}>submit</button>
        <br/>
        {this.props.reduxState.user.band === true &&
          <h6>dont see the venue you want? add here: <button className="log-in" onClick={this.addition}>create</button></h6>
        }
        {this.props.reduxState.user.venue === true &&
          <h6>dont see the band you want? add here: <button className="log-in" onClick={this.addition}>create</button></h6>
        }
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default withRouter(connect(putReduxStateOnProps)(AddEvent));