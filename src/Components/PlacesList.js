import React from 'react'

function PlacesList (props) {
  return (
    <div className='placeslist'>
      <ul tabIndex='1' role='tablist' aria-label='locations'>
        {props.locations.length > 0
          ? (
            props.locations.map(location =>
              <li key={location.name}
                onClick={() => {
                  props.setCurrentLocation(location)
                }}
                tabIndex='1'
                role='tab'
                aria-setsize='3'
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
    </div>

  )
}

export default PlacesList
