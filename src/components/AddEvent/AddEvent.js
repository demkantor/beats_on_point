import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class AddEvent extends Component {

    state={
        date: new Date()
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

  render() {
    return (
      <>
      <button onClick={this.editProfile}>edit profile</button>
      {this.props.reduxState &&
        <h1>Welcome {this.props.reduxState.user.username}</h1>
        }
        <h1>your current events</h1>
        <p>display list here <button>X</button></p>
        <h2>add new event</h2>
        <p>Date and Time:</p>
        <DatePicker
            selected={this.state.date}
            onChange={(date)=>this.setState({ date })}
            showTimeSelect
            dateFormat="Pp"
        />
        <p>cost</p>
        <p>----conditional render----</p>
        <p>band</p>
        <p>venue</p>
        <button>submit</button>
        <br/>
        <h6>dont see the band or venue you want? add here: <button>create</button></h6>
        <button onClick={this.console}>console</button>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default withRouter(connect(putReduxStateOnProps)(AddEvent));