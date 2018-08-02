import React, { Component } from 'react'

class PlacesList extends Component {
  state= {
    isOpen: false
  }

  toggleListOpen = (isOpen) => {
    console.log(this.state.isOpen)
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  setLocationAndCloseList = (location) => {
    this.props.setCurrentLocation(location)
    this.toggleListOpen()
  }

  render () {
    return (
      <div className='places'>
        <ul className='placeslist' tabIndex='1' role='tablist' aria-label='locations'>
          {this.props.locations.length > 0
            ? (
              this.props.locations.map(location =>
                <li key={location.name}
                  onClick={() => {
                    this.props.setCurrentLocation(location)
                  }}
                  tabIndex='1'
                  role='tab'
                  aria-setsize='6'
                  aria-posinset={location.number}>
                  {location.name}

                </li>
              )
            ) : (
              <li>
                <em>No results...</em>
              </li>
            )
          }

        </ul>

        <div className='filter-options'>
          <div
            className='options'
            aria-label='select a location'
            tabIndex='1'
            onClick={this.toggleListOpen}
          >
        Choose a location...
          </div>

          {this.state.isOpen &&
          (
            <div className='options-container'>
              {this.props.locations.map(location =>
                <div key={location.name}
                  className='option'
                  onClick={() => {
                    this.setLocationAndCloseList(location)
                  }}
                  aria-setsize='6'
                  aria-posinset={location.number}
                  tabIndex='1'>
                  {location.name}
                </div>
              )
              }
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

export default PlacesList
