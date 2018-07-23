import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import * as places from './places.json'

class App extends Component {
  state={
    locations: [],
    markers: []
  }
  componentDidMount () {
    places.map(place => {
      this.setState(prevState => ({
        locations: [...prevState.locations, place]
      }))
      this.setState(prevState => ({
        markers: [...prevState.locations, place]
      }))
    }
    )
  }

  render () {
    return (
      <div className='App'>

        <Header />

        <div className='container'>

          <Map
            markers={this.state.markers}
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

export default App
