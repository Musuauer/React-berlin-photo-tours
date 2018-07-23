import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import InfoWindow from './InfoWindow'
import { render } from 'react-dom'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 52.502941,
      lng: 13.403169
    },
    zoom: 12,
    markerImg: '/berlin-photo-tours/public/Camera.svg'
  }
  createInfoWindow (e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.lat(), lng: e.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  render () {
    return (
      <div className='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDWSSc0yFXxZFgSE1XjqCwF6F9oA6hmujA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.markers.map(marker =>
            (
              <Marker
                key={marker.name}
                lat={marker.coordinates.lat}
                lng={marker.coordinates.lng}
                name={marker.name}
                onClick={(e) => {
                  console.log('map', GoogleMapReact, 'e', e)
                }}
              />
            )

          )}

        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
