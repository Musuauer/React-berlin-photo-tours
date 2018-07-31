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
    this.props.emptyPictures()
  }

  render () {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
      >

        {this.props.isMarkerShown &&
    this.props.locations.map(location =>
      <Marker
        key={location.name}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        defaultAnimation={google.maps.Animation.DROP}
        icon={(location.name === this.props.currentLocation) ? ({ url: './Camera.png', scaledSize: new google.maps.Size(34, 34) }) : ({ url: 'http://maps.google.com/mapfiles/ms/icons/red.png' })
        }
        onClick={() => {
          this.props.toggleLocationsActive(location)
        }}
      >
        {location.name === this.props.currentLocation && (
          <InfoWindow
            onCloseClick={this.onToggleOpen}>
            <div className='infoWindow'>
              <div className='infoWindow-text'>
                <div className='name'>
                  {location.name}
                </div>
                <div className='wiki-text'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi tempore quia esse hic, quos odio cum quas dignissimos inventore magnam impedit nam accusamus harum. Corporis ad voluptates, voluptas esse est repudiandae quo quibusdam temporibus quasi labore, officiis minima tempore. Quae dicta inventore minima sed quibusdam quisquam, corrupti repellat reiciendis numquam!
                </div>

              </div>
              <div className='infoWindow-pictures'>
                {this.props.pictures}
                <a href={'https://www.flickr.com/search/?text=' + location.name}>See more Images...</a>
              </div>
              <div className='credits'>
                <em>Text powered by Wikipedia. Images powered by Flickr.</em>
              </div>
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
