import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';




class Admin extends Component {

  
  addMe=(type)=>{
    console.log('add this:', type);
  }

  editMe=(type)=>{
    console.log('edit this', type);
  }

  listMe=(type)=>{
    console.log('list all:', type);
    this.props.dispatch({type: 'GET_ALL_ADMIN', payload: type})
  }

  removeMe=(type)=>{
    console.log('remove this', type);
  }

  render() {
    return (
      <>
        <h1 className="center">Hi {this.props.reduxState.user.username}</h1>
        <p className="center">What would you like to do today?</p>
        <table>
            <thead>
                <tr><th>Add</th><th>Remove</th><th>Edit</th></tr>
            </thead>
            <tbody>
                <tr refs="bands">
                  <td><button onClick={()=>this.addMe('bands')}>Band</button></td>
                  <td><button onClick={()=>this.removeMe('bands')}>Band</button></td>
                  <td><button onClick={()=>this.edieMe('bands')}>Band</button></td>
                </tr>
                <tr refs="venue">
                  <td><button onClick={()=>this.addMe('venues')}>Venue</button></td>
                  <td><button onClick={()=>this.removeMe('venues')}>Venue</button></td>
                  <td><button onClick={()=>this.editMe('venues')}>Venue</button></td>
                </tr>
                <tr><td><button>User</button></td><td><button>User</button></td><td><button>User</button></td></tr>
                <tr><td><button>Genre</button></td><td><button>Genre</button></td><td><button>Genre</button></td></tr>
                <tr><td><button>Comment</button></td><td><button>Comment</button></td><td><button>Comment</button></td></tr>
                <tr><td><button>Ratting</button></td><td><button>Rating</button></td><td><button>Rating</button></td></tr>
                <tr><td><button>Event</button></td><td><button>Event</button></td><td><button>Event</button></td></tr>
            </tbody>
        </table>
        <br/>
        <br/>
        <table>
            <thead>
                <tr>
                  <th>List All Bands</th>
                  <th>List All Venues</th>
                  <th>List All Users</th>
                  <th>List All Genres</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td><button onClick={()=>this.listMe('bands')}>List</button></td>
                <td><button onClick={()=>this.listMe('venues')}>List</button></td>
                <td><button onClick={()=>this.listMe(`"user"`)}>List</button></td>
                <td><button onClick={()=>this.listMe('genres')}>List</button></td>
              </tr>
            </tbody>
        </table>
        {this.props.reduxState.admin.listAllReducer &&
          <ul>
            {this.props.reduxState.admin.listAllReducer.map(list=>
              <li>id: {list.id}, {list.bandname} {list.venuename} {list.genre} {list.username}</li>
              )}
          </ul>
        }
      </>
    )
  }
}



const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Admin);