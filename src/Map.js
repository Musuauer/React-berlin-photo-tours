/* global google */
import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import InfoWindow from './InfoWindow'

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWSSc0yFXxZFgSE1XjqCwF6F9oA6hmujA&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='map-container' />,
    mapElement: <div style={{ height: `100%` }} className='map' />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 52.502941, lng: 13.403169 }}
  >
    {/* {props.isMarkerShown &&
    props.locations.map(location =>
      ((location.name === props.currentLocation)
        ? (
          <Marker
            key={location.name}
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            onClick={props.onMarkerClick}
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png', scaledSize: new google.maps.Size(64, 64) }}
          />
        ) : (
          <Marker
            key={location.name}
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            onClick={props.onMarkerClick}
          />
        )
      ))} */}

    {/* {props.isMarkerShown &&
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
      ))} */}

    {props.isMarkerShown &&
    props.locations.map(location =>
      <Marker
        key={location.name}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        onClick={props.onMarkerClick}
        defaultAnimation={google.maps.Animation.DROP}
        icon={(location.name === props.currentLocation) ? ({ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png', scaledSize: new google.maps.Size(64, 64) }) : ({ url: 'http://maps.google.com/mapfiles/ms/icons/red.png' })
        }
      >
        <InfoWindow onCloseClick={props.onToggleOpen} />>
      </Marker>
    )}

    {/* {(props.currentLocation.length > 0) &&
    props.locations.map(location =>
      (location.name === props.currentLocation) &&
      (<Marker
        key={location.name}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        onClick={props.onMarkerClick}
        icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue.png', scaledSize: new google.maps.Size(64, 64) }}

      />)
    )
    } */}
  </GoogleMap>
)

export default Map
