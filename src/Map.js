/* global google */
import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWSSc0yFXxZFgSE1XjqCwF6F9oA6hmujA&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='map-container' />,
    mapElement: <div style={{ height: `100%` }} className='map' />
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 52.502941, lng: 13.403169 }}
  >
    {props.isMarkerShown &&
    props.locations.map(location =>
      (props.currentLocation.length > 0
        ? ((location.name === props.currentLocation) && (
          <Marker
            key={location.name}
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            onClick={props.onMarkerClick} />
        )) : (
          <Marker
            key={location.name}
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            onClick={props.onMarkerClick}
            defaultAnimation={google.maps.Animation.DROP}
          />
        )
      ))}
  </GoogleMap>
)

export default Map
