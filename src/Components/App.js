import React, { Component } from 'react'
import '../App.css'
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
    pictures: [],
    googleHasError: false,
    wikiHasError: false,
    flickrHasError: false
  }

  /**
   *Get the locations from the JSON file, then pass them to state.
   *When done, equal the filtered locations array to the locations array, so that they have the same information,
   *this is to display all the locations at the beginning, before any user input in the search box.
   * @memberof App
   */
  componentDidMount = () => {
    window.gm_authFailure = this.gm_authFailure
    // let googleError = document.getElementById('googleError')
    // googleError.setAttribute('style', 'display: block;')
    const placesArray = places
    this.setState(
      { locations: placesArray },
      () => this.setState((prevState) => {
        return {filteredLocations: prevState.locations}
      }))
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({
        isMarkerShown: true
      })
    }, 2000)
  }

  getAPIs = () => {
    this.getFlickr()
    this.getWikipedia()
  }

  // generic function to handle API errors, taken from https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }
  // get Flickr photos, code adapted from: https://www.youtube.com/watch?v=RkXotG7YUek
  getFlickr = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2c26b3886ab51247626d4745d7ae21c8&tags='${this.state.currentLocation.keywords}'&per_page=20&page=1&sort=relevance&orientation=landscape&format=json&nojsoncallback=1`)
      .then(this.handleErrors)
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
      .catch(error => {
        console.log(error)
        this.setState({ flickrHasError: true })
      })
  }

  // get Wikipedia text, code adapted from: https://www.youtube.com/watch?v=RPz75gcHj18
  getWikipedia = () => {
    let that = this
    let term = this.state.currentLocation.id
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&exintro=1&prop=extracts&formatversion=2&titles=${term.replace(/\s+/g, '_')}`)
      .then(this.handleErrors)
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
      .catch(error => {
        console.log(error)
        this.setState({ wikiHasError: true })
      })
  }

  /**
   * To be triggered when user clicks on a location name or marker.
   *
   * @memberof App
   */
  setCurrentLocation = (location) => {
    if (this.state.currentLocation.name === location.name) {
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

  /**
   * Filter the locations array based on user input in the search box.
   *
   * @memberof App
   */
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

  // from https://developers.google.com/maps/documentation/javascript/events#auth-errors
  gm_authFailure = () => {
    this.setState({ googleHasError: true })
  }

  render () {
    return (
      <div className='App'>

        <Header />

        <div className='container'>

          <Errorboundary
            googleError={this.state.googleHasError}>
            <Map
              isMarkerShown={this.state.isMarkerShown}
              locations={this.state.filteredLocations}
              currentLocation={this.state.currentLocation.name}
              setCurrentLocation={this.setCurrentLocation}
              pictures={this.state.pictures}
              text={this.state.wikiText}
              center={this.state.center}
              emptyCurrentLocation={this.emptyCurrentLocation}
              wikiHasError={this.state.wikiHasError}
              flickrHasError={this.state.flickrHasError}
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
            <div className='contact'>
              <p><a href='mailto:info@guillermogudino.com' tabIndex='1'>
                Contact us
              </a>
              </p>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default App
