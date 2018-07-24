import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import * as places from './places.json'

class App extends Component {
  state = {
    isMarkerShown: false,
    locations: [],
    currentLocation: {},
    isOpen: false
  }

  componentDidMount () {
    places.forEach(place => {
      this.setState(prevState => ({
        locations: [...prevState.locations, place]
      }))
    })
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 2000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  setCurrentLocation = (e) => {
    this.setState({ currentLocation: e.currentTarget.innerText },
      () => console.log(this.state.currentLocation)
    )
  }

  toggleLocationsActive = locationName => {
    this.setState({ currentLocation: locationName },
      () => console.log(this.state.currentLocation)
    )
  }

  render () {
    return (
      <div className='App'>

        <Header />

        <div className='container'>

          <Map
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            locations={this.state.locations}
            currentLocation={this.state.currentLocation}
            toggleLocationsActive={this.toggleLocationsActive}
          />
          <div className='sidebar'>
            <Searchbox
              updateQuery={this.updateQuery}
            />
            <PlacesList
              locations={this.state.locations}
              setCurrentLocation={this.setCurrentLocation}
            />
          </div>

        </div>
      </div>

    )
  }
}

export default App
