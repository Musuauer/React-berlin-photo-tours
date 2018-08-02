import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import places from '../places.json'
import Errorboundary from './Errorboundary'

class App extends Component {
  state = {
    isMarkerShown: false,
    locations: [],
    currentLocation: {},
    query: '',
    filteredLocations: [],
    center: { lat: 52.502941, lng: 13.403169 },
    pictures: []
  }

  componentDidMount = () => {
    const placesArray = places

    this.setState(
      { locations: placesArray },
      () => this.setState((prevState) => {
        return {filteredLocations: prevState.locations}
      }))
    this.delayedShowMarker()
  }

  getAPIs = () => {
    this.getFlickr()
    this.getWikipedia()
  }
  // get Flickr photos, code adapted from: https://www.youtube.com/watch?v=RkXotG7YUek
  getFlickr = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2c26b3886ab51247626d4745d7ae21c8&tags='${this.state.currentLocation.keywords}'&per_page=20&page=1&sort=relevance&orientation=landscape&format=json&nojsoncallback=1`)
      .then(function (response) {
        return response.json()
      })
      .then(function (jsonResponse) {
        let picArray = jsonResponse.photos.photo.map((pic) => {
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg'
          return (
            <img alt={this.state.currentLocation.name} src={srcPath} className='picture' key={srcPath} />
          )
        })
        this.setState({ pictures: picArray })
      }.bind(this))
      .catch((error) => { console.warn(error) })
  }

  // get Wikipedia text, code adapted from: https://www.youtube.com/watch?v=RPz75gcHj18
  getWikipedia = () => {
    let that = this
    let term = this.state.currentLocation.id
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&exintro=1&prop=extracts&formatversion=2&titles=${term.replace(/\s+/g, '_')}`)
      .then(function (response) {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Wikipedia response was not ok: ' + response.statusText)
      })
      .then(function (jsonResponse) {
        let page = jsonResponse.query.pages
        let pageId = Object.keys(jsonResponse.query.pages)[0]
        let content = page[pageId].extract

        that.setState({ wikiText: content })
      })
      .catch((error) => { console.warn(error) })
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({
        isMarkerShown: true
      })
    }, 2000)
  }

  setCurrentLocation = (location) => {
    if (this.state.currentLocation.name === location.name) {
      console.log('currentlocation', this.state.currentLocation)
      console.log('location', location)
    } else {
      this.emptyPictures()
      this.setState({ currentLocation: location },
        this.getAPIs
      )
    }
  }

  emptyCurrentLocation = () => {
    this.emptyPictures()
    this.setState({ currentLocation: {} })
  }

  emptyPictures = () => {
    this.setState({ pictures: [] })
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      this.setState({
        filteredLocations: this.state.locations
          .filter((location) => location.name
            .toLowerCase()
            .indexOf(query.toLowerCase()) === 0)
      })
    } else {
      this.setState({
        filteredLocations: this.state.locations,
        currentLocation: {}
      })
    }
  }

  render () {
    return (
      <div className='App'>

        <Header />

        <div className='container'>
          <Errorboundary>
            <Map
              isMarkerShown={this.state.isMarkerShown}
              locations={this.state.filteredLocations}
              currentLocation={this.state.currentLocation.name}
              setCurrentLocation={this.setCurrentLocation}
              pictures={this.state.pictures}
              text={this.state.wikiText}
              center={this.state.center}
              emptyPictures={this.emptyPictures}
              emptyCurrentLocation={this.emptyCurrentLocation}
            />
          </Errorboundary>
          <div className='sidebar'>
            <Searchbox
              updateQuery={this.updateQuery}
              query={this.state.query}
            />
            <PlacesList
              locations={this.state.filteredLocations}
              setCurrentLocation={this.setCurrentLocation}
              updateQuery={this.updateQuery}
            />
          </div>

        </div>
      </div>

    )
  }
}

export default App
