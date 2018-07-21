import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import * as places from './places.json'

class App extends Component {
  render () {
    return (
      <div className='App'>

        <Header />

        <div className='container'>

          <Map
            places={places}
          />

          <div className='sidebar'>
            <Searchbox
              updateQuery={this.updateQuery}
            />
            <PlacesList
              places={places}
            />
          </div>

        </div>
      </div>
    )
  }
}

export default App
