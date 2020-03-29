import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


//currently an unused component, may hold it for gmaps location approval
class Zip extends Component {

state={
  zip: ""
}

  zippy=(event)=>{
    event.preventDefault();
    console.log('your zip is:', this.state.zip);
  }

  handleChange=(zip, event)=>{
    this.setState({[zip]: event.target.value});
  }

  render() {
    return (
      <>
        <div className='zip'>
          <form className="zipForm" onSubmit={this.zippy}>
            <input className="zip" placeholder="Enter Zip" type="text" pattern="[0-9]*" 
            onChange={(event) => this.handleChange('value', event)}/>
            <input className="log-in" type="submit" value="Submit" />
          </form>
        </div>        
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Zip);