import React, { Component } from 'react'

import Marker from './Marker'

class Map extends Component {
  state= {
    map: new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.502941, lng: 13.403169},
      zoom: 13,
      mapTypeId: 'roadmap'
    })
  }
  componentDidMount () {
    this.state.map.addListener('zoom_changed', () => {
      this.setState({
        zoom: this.state.map.getZoom()
      })
    })

    this.state.map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: this.state.map.getMapTypeId()
      })
    })
  }

  render () {
    return (
      <div id='map'>
        {/* {this.props.locations.map(place =>
          (
            <Marker
              map={this.state.map}
              key={place.name}
              lat={place.coordinates.lat}
              lng={place.coordinates.lng}
              name={place.name}
            />
          )

        )} */}
        {console.log('map', this.state)}
      </div>
    )
  }
}

export default Map
