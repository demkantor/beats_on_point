import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class AddEvent extends Component {

  state={
    date: new Date(),
    value: 'Free'
}


  componentDidMount=()=>{
      const user = this.props.reduxState.user;
      if(this.props.reduxState.user.band === true){
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'bands'}})
    }else{
        this.props.dispatch({type: 'GET_MY_CALENDAR', payload: {id: user.id, who: 'venues'}})
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
      this.setState({value: event.target.value});
    }

    removeEvent=(event)=>{
      const user = this.props.reduxState.user;
      console.log('remove event', event);
      this.props.dispatch({type: 'REMOVE_EVENT', payload: {id: user.id, who: 'bands', eventId: event}})
    }


  render() {
    return (
      <>
      <button onClick={this.editProfile}>edit profile</button>
      {this.props.reduxState &&
        <h1>Welcome {this.props.reduxState.user.username}</h1>
        }
        <>
        <h2>your current events</h2>
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
        <h2>add new event</h2>
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
        <p>----conditional render----</p>
        <p>band</p>
        <p>venue</p>
        <button onClick={this.console}>submit</button>
        <br/>
        <h6>dont see the band or venue you want? add here: <button>create</button></h6>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default withRouter(connect(putReduxStateOnProps)(AddEvent));