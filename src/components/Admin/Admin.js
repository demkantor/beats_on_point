import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';




class Admin extends Component {



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
                <tr><td><button>Band</button></td><td><button>Band</button></td><td><button>Band</button></td></tr>
                <tr><td><button>Venue</button></td><td><button>Venue</button></td><td><button>Venue</button></td></tr>
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
                <tr><th>List All Bands</th><th>List All Venues</th><th>List All Users</th></tr>
            </thead>
            <tr><td>...</td><td>...</td><td>...</td></tr>
        </table>
      </>
    )
  }
}



const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Admin);