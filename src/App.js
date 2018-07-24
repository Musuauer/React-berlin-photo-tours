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
    currentLocation: {}
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

  onMarkerClick: () => () => ({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
  })

  // withStateHandlers(() => ({
  //   isOpen: false,
  // }), {
  //   onToggleOpen: ({ isOpen }) => () => ({
  //     isOpen: !isOpen,
  //   })
  // })

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
