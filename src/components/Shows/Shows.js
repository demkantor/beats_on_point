import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


//currently unused component, leftover from orginal draft
class Shows extends Component {

    state={
        value: "date"
    }

    filter=(event)=>{
        this.setState({value: event.target.value});
    }

  render() {
    return (
      <>
        <div className='zip'>
            <select id="filter" onChange={this.filter} value={this.state.value}>
                <option value="date">filter by date</option>
                <option value="genre">filter by genre</option>
                <option value="location">filter by location</option>
            </select>
          </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Shows);