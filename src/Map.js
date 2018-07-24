/* global google */
import React, { Component } from 'react'
import { withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const props = {
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWSSc0yFXxZFgSE1XjqCwF6F9oA6hmujA&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div className='map-container' />,
  mapElement: <div style={{ height: `100%` }} className='map' />
}
class Map extends Component {
  state= {
    isOpen: false
  }

  onToggleOpen = (isOpen) => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
    console.log('isopencalled', this.state.isOpen)
  }
  handleToggleOpen = (markerId) => {
    this.setState({
      isOpen: true
    })
  }

  handleToggleClose = (markerId) => {
    this.setState({
      isOpen: false
    })
  }

  render () {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 52.502941, lng: 13.403169 }}
      >

        {this.props.isMarkerShown &&
    this.props.locations.map(location =>
      <Marker
        key={location.name}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        defaultAnimation={google.maps.Animation.DROP}
        icon={(location.name === this.props.currentLocation) ? ({ url: './Camera.png', scaledSize: new google.maps.Size(54, 54) }) : ({ url: 'http://maps.google.com/mapfiles/ms/icons/red.png' })
        }
        onClick={() => {
          this.props.toggleLocationsActive(location.name)
        }}
      >
        {location.name === this.props.currentLocation && (
          <InfoWindow
            onCloseClick={this.onToggleOpen}>
            <div>
              {location.name}
            </div>
          </InfoWindow>
        )}
      </Marker>
    )}
      </GoogleMap>
    )
  }
}

export default withProps(props)(withScriptjs(withGoogleMap(Map)))
