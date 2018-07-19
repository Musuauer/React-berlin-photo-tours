import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ text }) => <div>{text}</div>

const myKey = 'AIzaSyDWSSc0yFXxZFgSE1XjqCwF6F9oA6hmujA'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 52.502941,
      lng: 13.403169
    },
    zoom: 12,
    markerImg: '/berlin-photo-tours/public/Camera.svg'
  }

  render () {
    return (
      <div className='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: myKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
         {this.props.places.map(place =>
         (
          <Marker
            key={place.name}
            lat={place.coordinates.lat}
            lng={place.coordinates.lng}
            img={this.markerImg}
            text={place.name}
          />
         )

         )}
          
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
