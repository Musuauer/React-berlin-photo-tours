import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import * as places from './places.json'
import escapeRegExp from 'escape-string-regexp'


class App extends Component {
  state = {
    isMarkerShown: false,
    locations: [],
    currentLocation: {},
    query: '',
    filteredLocations: []
  }

  componentDidMount = () => {
    places.forEach(place => {
      this.setState(prevState => ({
        locations: [...prevState.locations, place]
      }))
    })

    this.delayedShowMarker()
  }

  delayedShowMarker = () => {

    setTimeout(() => {
      this.setState({ 
        isMarkerShown: true, 
        filteredLocations: this.state.locations})
    }, 2000)

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

  handleChange () {
    this.setState({
      searchString: this.refs.search.value
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i') // 'i' means 'ignore case'
      this.setState({ filteredLocations: this.state.locations.filter((location) => match.test(location.name))})
    } else {
      this.setState({ filteredLocations: this.state.locations})
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render () {

    return (
      <div className='App'>

        <Header />

        <div className='container'>

          <Map
            isMarkerShown={this.state.isMarkerShown}
            locations={this.state.filteredLocations}
            currentLocation={this.state.currentLocation}
            toggleLocationsActive={this.toggleLocationsActive}
          />
          <div className='sidebar'>
            <Searchbox
              updateQuery={this.updateQuery}
              filteredLocations={this.state.filteredLocations}
              query={this.state.query}
            />
            <PlacesList
              locations={this.state.filteredLocations}
              setCurrentLocation={this.setCurrentLocation}
            />
          </div>

        </div>
      </div>

    )
  }
}

export default App
