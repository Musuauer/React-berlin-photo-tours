import React from 'react'

function PlacesList (props) {
  return (
    <div className='places'>
      <ul className='placeslist' tabIndex='1' role='tablist' aria-label='locations'>
        {props.locations.length > 0
          ? (
            props.locations.map(location =>
              <li key={location.name}
                onClick={() => {
                  props.setCurrentLocation(location)
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
        <select className='options' onChange={(event) => props.setCurrentLocation(event.target.value)} aria-label='select a location' tabIndex='1'>
          <option value=''>Select a location...</option>
          {props.locations.map(location =>
            <option key={location.name}
              value={location}
              aria-setsize='6'
              aria-posinset={location.number}>
              {location.name}
            </option>
          )}
        </select>
      </div>
    </div>

  )
}

export default PlacesList
