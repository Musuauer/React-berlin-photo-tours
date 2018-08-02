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

const defaultMapOptions = {
  disableDefaultUI: true,
  navigationControl: false,
  mapTypeControl: false,
  scaleControl: false,
  draggable: true
}
class Map extends Component {
  render () {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
        containerProps={{tabIndex: 0}}
        defaultOptions={defaultMapOptions}
        onClick={this.props.emptyCurrentLocation}
      >

        {this.props.isMarkerShown &&
    this.props.locations.map(location =>
      <Marker
        key={location.name}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        defaultAnimation={google.maps.Animation.DROP}
        icon={(location.name === this.props.currentLocation) ? ({ url: './Camera.png', scaledSize: new google.maps.Size(34, 34) }) : ({ url: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png' })
        }
        onClick={() => {
          this.props.setCurrentLocation(location)
        }}
      >
        {location.name === this.props.currentLocation && (
          <InfoWindow
            onCloseClick={this.props.emptyCurrentLocation}>
            <div className='infoWindow'>
              <div className='infoWindow-text'>
                <div className='name' tabIndex='0'>
                  {location.name}
                </div>
                <div className='wiki-text' dangerouslySetInnerHTML={{ __html: this.props.text }} tabIndex='0' />
                <a href={'https://en.wikipedia.org/wiki/' + location.id} target={'_blank'} tabIndex='0'>Read more...</a>
              </div>
              <div className='infoWindow-pictures'>
                {this.props.pictures}
                <a href={'https://www.flickr.com/search/?text=' + location.name} target={'_blank'}>See more Images...</a>
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
