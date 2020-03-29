import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


//currently unused component, leftover from orginal draft
class Shows extends Component {

    state={
      show: false,
      query: '',
      type: "genre"
    }

    filter=(event)=>{
        this.setState({type: event.target.value});
    }

    handleInputChange = () => {
      this.setState({
        query: this.search.value
      })
    }

    refresh=()=>{
      this.props.dispatch({type: 'GET_EVENT_LIST'});
      this.setState({show: false})
    }

    submit=(event)=>{
      event.preventDefault();
      this.props.dispatch({type: 'GET_NEW_LIST', payload: this.state})
    }

    toggle=()=>{
      if(this.state.show === false){
        this.setState({show: true})
      }else{
        this.setState({show: false})
      }
    }

  render() {
    return (
      <>
      {this.state.show === false &&
      <button className="log-in" onClick={this.toggle}>Search</button>
      }
      {this.state.show === true &&
        <>
          <button className="log-in" onClick={this.toggle}>hide</button>
          <div className='filter'>
              <select className='filterList' onChange={this.filter} value={this.state.value}>
                  <option value="genre">filter by genre</option>
                  <option value="bandname">filter by band</option>
                  <option value="venuename" >filter by venue</option>
              </select>
            <form className="search" onSubmit={(event)=>this.submit(event)}>
              <input
                size="15"
                className="serachInputt"
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
              <p>{this.state.query}</p>
              <input type='submit' className='log-in reverse'/>
              <button className="log-in reverse" onClick={this.refresh}>refresh</button>
            </form>
          </div>
        </>
      }
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Shows);