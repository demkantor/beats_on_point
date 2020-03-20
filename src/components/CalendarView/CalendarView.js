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
        <div className='calendarView'>
            <h1>enjoy the calendar sucka</h1>
            {this.props.reduxState.calendarReducer
            ?
                JSON.stringify(this.props.reduxState.calendarReducer)
            :null
            }
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(CalendarView);