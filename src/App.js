import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import Searchbox from './Searchbox'
import PlacesList from './PlacesList'
import Header from './Header'
import places from './places.json'

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

  // get Flickr photos, code adapted from: https://www.youtube.com/watch?v=RkXotG7YUek
  getFlickr = () => {
    const flickrKey = '2c26b3886ab51247626d4745d7ae21c8'
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${this.state.currentLocation}&per_page=10&page=1&sort=relevance&format=json&nojsoncallback=1`)
      .then(function (response) {
        return response.json()
      })
      .then(function (jsonResponse) {
        let picArray = jsonResponse.photos.photo.map((pic) => {
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg'
          return (
            <img alt={this.state.currentLocation} src={srcPath} className='picture' key={srcPath} />
          )
        })
        this.setState({ pictures: picArray })
      }.bind(this))
      .catch(error => {
        alert(`Flickr images could not load, sorry`)
        console.log(error)
        return error
      })
  }

  getWikipedia = () => {
    let term = this.state.currentLocation
    let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
    let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='
    let url = searchUrl + term

    fetch(url)
      .then(function (response) {
        console.log(response)
        return response.json()
      })
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({
        isMarkerShown: true
      })
    }, 2000)
  }

  setCurrentLocation = (location) => {
    console.log('e', location)
    if (this.state.currentLocation === location.name) {

    } else {
      this.emptyPictures()
      this.setState({ currentLocation: location.name },
        this.getFlickr
      )
    }
  }

  emptyPictures = () => {
    console.log('empty pictures')
    this.setState({ pictures: [] })
  }

  handleChange () {
    this.setState({
      searchString: this.refs.search.value
    })
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
            setCurrentLocation={this.setCurrentLocation}
            pictures={this.state.pictures}
            center={this.state.center}
            emptyPictures={this.emptyPictures}
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
