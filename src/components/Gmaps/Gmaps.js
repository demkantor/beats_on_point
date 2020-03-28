import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';





export class Gmaps extends Component {

  

  static defaultProps = {
    center: {
      lat: 44.9781162,
      lng: -93.2634743
    },
    zoom: 14
  };
  
  

  render() {
    return (
        <>
         <div className="mapContainer">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              {/* <Marker
                lat={44.9781162}
                lng={-93.2634743}
                text="venue"
               /> */}
           </GoogleMapReact>
      </div>
        </>
    );
  }
}



export default Gmaps;