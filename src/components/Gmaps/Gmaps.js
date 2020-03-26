import React, { Component } from 'react';
import { Map, GoogleApiWrapper} from 'google-maps-react';
require('dotenv').config();



const mapStyles = {
  width: '90vw',
  height: '40vh',
  margin: '5vw'
};



export class Gmaps extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
        <>
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
            lat: 44.9781162,
            lng: -93.2634743
            }}
          />
        </>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(Gmaps);