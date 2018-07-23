import React, { Component } from 'react'
import './App.css'

import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import * as places from './places.json'

export default class App extends Component {
  state = {
    zoom: 14,
    maptype: '',
    place_formatted: '',
    place_id: '',
    place_location: '',
    locations: places
  }

  render () {
    return (
      <div id='app'>

        <Header />
        <div className='container'>

          <Map
            locations={this.state.locations}
            // markers={marker}
          />

          <div className='sidebar'>
            <Searchbox
              updateQuery={this.updateQuery}
            />
            <PlacesList
              locations={this.state.locations}
            />
          </div>

        </div>
      </div>
    )
  }
}
